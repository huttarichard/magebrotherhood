import { IAbstractConnectorOptions } from "../types";

export interface IAuthereumConnectorOptions extends IAbstractConnectorOptions {
  networkName: string;
  apiKey: string;
  rpcUri: string;
  webUri: string;
  xsUri: string;
  blockedPopupRedirect: boolean;
  forceRedirect: boolean;
  disableNotifications: boolean;
  disableGoogleAnalytics: boolean;
}

declare global {
  interface Window {
    Authereum: any;
  }
}

class AuthereumConnector {
  constructor(public opts: Partial<IAuthereumConnectorOptions> = {}) {}

  async connect() {
    return new Promise(async (resolve, reject) => {
      try {
        const authereum = new Authereum({
          ...opts,
          networkName: opts.networkName || opts.network,
        });
        const provider = authereum.getProvider();
        provider.authereum = authereum;
        await provider.enable();
        resolve(provider);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

const ConnectToAuthereum = (Authereum: any, opts: Partial<IAuthereumConnectorOptions> = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authereum = new Authereum({
        ...opts,
        networkName: opts.networkName || opts.network,
      });
      const provider = authereum.getProvider();
      provider.authereum = authereum;
      await provider.enable();
      resolve(provider);
    } catch (error) {
      return reject(error);
    }
  });
};

export default ConnectToAuthereum;
