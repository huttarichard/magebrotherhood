import dynamic from "next/dynamic";
import { useReducer } from "react";
import { getThemeColors } from "./helpers";
import { CONNECT_EVENT, ERROR_EVENT, CLOSE_EVENT } from "./constants";
import { themesList } from "./themes";
import { EventController, ProviderController } from "./controllers";

const INITIAL_STATE = { show: false };

const defaultOptions = {
  lightboxOpacity: 0.4,
  theme: themesList.default.name,
  cacheProvider: false,
  disableInjectedProvider: false,
  providerOptions: {},
  network: "",
};

const Modal = dynamic(() => import("./Modal"), { ssr: false });

export default class Core {
  constructor(opts) {
    this.show = INITIAL_STATE.show;
    this.eventController = new EventController();

    // eslint-disable-next-line
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    this.connect = () =>
      new Promise(async (resolve, reject) => {
        this.on(CONNECT_EVENT, (provider) => resolve(provider));
        this.on(ERROR_EVENT, (error) => reject(error));
        this.on(CLOSE_EVENT, () => reject("Modal closed by user"));
        await this.toggleModal();
      });

    this.connectTo = (id) =>
      new Promise(async (resolve, reject) => {
        this.on(CONNECT_EVENT, (provider) => resolve(provider));
        this.on(ERROR_EVENT, (error) => reject(error));
        this.on(CLOSE_EVENT, () => reject("Modal closed by user"));
        const provider = this.providerController.getProvider(id);
        if (!provider) {
          return reject(new Error(`Cannot connect to provider (${id}), check provider options`));
        }
        await this.providerController.connectTo(provider.id, provider.connector);
      });

    this._toggleModal = async () => {
      const d = typeof window !== "undefined" ? document : "";
      const body = d ? d.body || d.getElementsByTagName("body")[0] : "";
      if (body) {
        if (this.show) {
          body.style.overflow = "";
        } else {
          body.style.overflow = "hidden";
        }
      }
      await this.updateState({ show: !this.show });
    };

    this.onError = async (error) => {
      if (this.show) {
        await this._toggleModal();
      }
      this.eventController.trigger(ERROR_EVENT, error);
    };

    this.onConnect = async (provider) => {
      if (this.show) {
        await this._toggleModal();
      }
      this.eventController.trigger(CONNECT_EVENT, provider);
    };

    this.onClose = async () => {
      if (this.show) {
        await this._toggleModal();
      }
      this.eventController.trigger(CLOSE_EVENT);
    };

    this.updateState = async (state) => {
      Object.keys(state).forEach((key) => {
        this[key] = state[key];
      });
      forceUpdate();
    };

    this.resetState = () => this.updateState({ ...INITIAL_STATE });

    const options = {
      ...defaultOptions,
      ...opts,
    };
    this.lightboxOpacity = options.lightboxOpacity;
    this.themeColors = getThemeColors(options.theme);
    this.providerController = new ProviderController({
      disableInjectedProvider: options.disableInjectedProvider,
      cacheProvider: options.cacheProvider,
      providerOptions: options.providerOptions,
      network: options.network,
    });
    this.providerController.on(CONNECT_EVENT, (provider) => this.onConnect(provider));
    this.providerController.on(ERROR_EVENT, (error) => this.onError(error));
    console.log(this.providerController.getUserOptions());
    this.userOptions = this.providerController.getUserOptions();
  }

  get cachedProvider() {
    return this.providerController.cachedProvider;
  }

  async toggleModal() {
    if (this.cachedProvider) {
      await this.providerController.connectToCachedProvider();
      return;
    }
    if (this.userOptions && this.userOptions.length === 1 && this.userOptions[0].name) {
      await this.userOptions[0].onClick();
      return;
    }
    await this._toggleModal();
  }

  on(event, callback) {
    this.eventController.on({
      event,
      callback,
    });
    return () =>
      this.eventController.off({
        event,
        callback,
      });
  }

  off(event, callback) {
    this.eventController.off({
      event,
      callback,
    });
  }

  clearCachedProvider() {
    this.providerController.clearCachedProvider();
  }

  setCachedProvider(id) {
    this.providerController.setCachedProvider(id);
  }

  async updateTheme(theme) {
    this.themeColors = getThemeColors(theme);
    await this.updateState({ themeColors: this.themeColors });
  }

  render() {
    return (
      <Modal
        themeColors={this.themeColors}
        userOptions={this.userOptions}
        onClose={this.onClose}
        resetState={this.resetState}
        lightboxOpacity={this.lightboxOpacity}
        show={this.show}
      />
    );
  }
}
