import { SupportedChainId } from "./chains";

type AddressMap = { [chainId: number]: string };

export const COIN_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  [SupportedChainId.ROPSTEN]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  [SupportedChainId.GOERLI]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  [SupportedChainId.RINKEBY]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
};

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  [SupportedChainId.ROPSTEN]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  [SupportedChainId.GOERLI]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
  [SupportedChainId.RINKEBY]: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
};
