import { FortmaticConnector as FortmaticConnectorCore } from "web3-react-fortmatic-connector";

type FormaticSupportedChains = 1 | 3 | 4 | 42;

const CHAIN_ID_NETWORK_ARGUMENT: { readonly [chainId in FormaticSupportedChains]: string | undefined } = {
  1: undefined,
  3: "ropsten",
  4: "rinkeby",
  42: "kovan",
};

export class FortmaticConnector extends FortmaticConnectorCore {
  async activate() {
    if (!this.fortmatic) {
      const { default: Fortmatic } = await import("fortmatic");

      const { apiKey, chainId } = this as any;
      if (chainId in CHAIN_ID_NETWORK_ARGUMENT) {
        this.fortmatic = new Fortmatic(apiKey, CHAIN_ID_NETWORK_ARGUMENT[chainId as FormaticSupportedChains]);
      } else {
        throw new Error(`Unsupported network ID: ${chainId}`);
      }
    }

    const provider = this.fortmatic.getProvider();
    const account = await provider.enable().then((accounts: string[]) => accounts[0]);

    return { provider, chainId: (this as any).chainId, account };
  }
}
