import { CACHED_PROVIDER_KEY, CONNECT_EVENT, ERROR_EVENT, INJECTED_PROVIDER_ID } from "../constants";
import {
  filterMatches,
  findMatchingRequiredOptions,
  getInjectedProvider,
  getLocal,
  getProviderDescription,
  getProviderInfoById,
  IProviderControllerOptions,
  IProviderDisplayWithConnector,
  IProviderInfo,
  IProviderOptions,
  IProviderUserOptions,
  isMobile,
  removeLocal,
  setLocal,
} from "../helpers";
import { ConnectorKey, connectors, getConnector, providers } from "../providers";
import { EventController } from "./events";

export class ProviderController {
  public cachedProvider = "";
  public shouldCacheProvider = false;
  public disableInjectedProvider = false;

  private eventController: EventController = new EventController();
  private injectedProvider: IProviderInfo | null = null;
  private providers: IProviderDisplayWithConnector[] = [];
  private providerOptions: IProviderOptions;
  private network = "";

  constructor(opts: IProviderControllerOptions) {
    this.cachedProvider = getLocal(CACHED_PROVIDER_KEY) || "";

    this.disableInjectedProvider = opts.disableInjectedProvider;
    this.shouldCacheProvider = opts.cacheProvider;
    this.providerOptions = opts.providerOptions;
    this.network = opts.network;

    this.injectedProvider = getInjectedProvider();

    this.providers = Object.keys(connectors).map((id) => {
      let providerInfo: IProviderInfo;
      if (id === INJECTED_PROVIDER_ID) {
        providerInfo = this.injectedProvider || providers.FALLBACK;
      } else {
        providerInfo = getProviderInfoById(id);
      }
      return {
        ...providerInfo,
        connector: getConnector(id as ConnectorKey),
        package: providerInfo.package,
      };
    });
  }

  public shouldDisplayProvider(id: string) {
    const provider = this.getProvider(id);
    if (typeof provider !== "undefined") {
      const providerPackageOptions = this.providerOptions[id];
      if (providerPackageOptions) {
        const isProvided = !!providerPackageOptions.package;
        if (isProvided) {
          const requiredOptions = provider.package ? provider.package.required : undefined;
          if (requiredOptions && requiredOptions.length) {
            const providedOptions = providerPackageOptions.options;
            if (providedOptions && Object.keys(providedOptions).length) {
              const matches = findMatchingRequiredOptions(requiredOptions, providedOptions);
              if (requiredOptions.length === matches.length) {
                return true;
              }
            }
          } else {
            return true;
          }
        }
      }
    }
    return false;
  }

  public getUserOptions = () => {
    const mobile = isMobile();

    const defaultProviderList = this.providers.map(({ id }) => id);

    const displayInjected = !!this.injectedProvider && !this.disableInjectedProvider;
    const onlyInjected = displayInjected && mobile;

    const providerList = [];

    if (onlyInjected) {
      providerList.push(INJECTED_PROVIDER_ID);
    } else {
      if (displayInjected) {
        providerList.push(INJECTED_PROVIDER_ID);
      }

      defaultProviderList.forEach((id: string) => {
        if (id !== INJECTED_PROVIDER_ID) {
          const result = this.shouldDisplayProvider(id);
          if (result) {
            providerList.push(id);
          }
        }
      });
    }

    const userOptions: IProviderUserOptions[] = [];

    providerList.forEach((id: string) => {
      const provider = this.getProvider(id);
      if (typeof provider !== "undefined") {
        const { id, name, logo, connector } = provider;
        userOptions.push({
          name,
          logo,
          description: getProviderDescription(provider),
          onClick: () => this.connectTo(id, connector),
        });
      }
    });

    return userOptions;
  };

  public getProvider(id: string) {
    return filterMatches<IProviderDisplayWithConnector>(this.providers, (x) => x.id === id, undefined);
  }

  public clearCachedProvider() {
    this.cachedProvider = "";
    removeLocal(CACHED_PROVIDER_KEY);
  }

  public setCachedProvider(id: string) {
    this.cachedProvider = id;
    setLocal(CACHED_PROVIDER_KEY, id);
  }

  public connectTo = async (id: string, connector: (providerPackage: any, opts: any) => Promise<any>) => {
    try {
      const options = this.providerOptions[id];
      const opts = { network: this.network || undefined, ...(options?.options || {}) };
      const provider = await connector(options.package, opts);
      this.eventController.trigger(CONNECT_EVENT, provider);
      if (this.shouldCacheProvider && this.cachedProvider !== id) {
        this.setCachedProvider(id);
      }
    } catch (error) {
      this.eventController.trigger(ERROR_EVENT, error);
    }
  };

  public async connectToCachedProvider() {
    const provider = this.getProvider(this.cachedProvider);
    if (typeof provider !== "undefined") {
      await this.connectTo(provider.id, provider.connector);
    }
  }

  public on(event: string, callback: (result: any) => void): () => void {
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

  public off(event: string, callback?: (result: any) => void): void {
    this.eventController.off({
      event,
      callback,
    });
  }
}
