import { ExternalProvider, Provider, Web3Provider } from "@ethersproject/providers";
import { Actions } from "@web3-react/types";
import { Connector } from "@web3-react/types";
import AuthereumLogo from "assets/wallets/authereum.svg";
import BinanceChainWalletLogo from "assets/wallets/binancechainwallet.svg";
import BitpieLogo from "assets/wallets/bitpie.svg";
import BitskiLogo from "assets/wallets/bitski.svg";
import BurnerWalletLogo from "assets/wallets/burnerwallet.svg";
import CeloExtensionWalletLogo from "assets/wallets/celoExtensionWallet.svg";
import CipherLogo from "assets/wallets/cipher.svg";
import CoinbaseLogo from "assets/wallets/coinbase.svg";
import DapperLogo from "assets/wallets/dapper.svg";
import DcentWalletLogo from "assets/wallets/dcentwallet.svg";
import FortmaticLogo from "assets/wallets/fortmatic.svg";
import FrameLogo from "assets/wallets/frame.svg";
import imTokenLogo from "assets/wallets/imtoken.svg";
import LiqualityLogo from "assets/wallets/liquality.svg";
import MathWalletLogo from "assets/wallets/mathwallet.svg";
import MetaMaskLogo from "assets/wallets/metamask.svg";
import MEWwallet from "assets/wallets/mewwallet.svg";
import NiftyWalletLogo from "assets/wallets/niftyWallet.svg";
import OperaLogo from "assets/wallets/opera.svg";
import PortisLogo from "assets/wallets/portis.svg";
import RWalletLogo from "assets/wallets/rwallet.svg";
import SafeLogo from "assets/wallets/safe.svg";
import StatusLogo from "assets/wallets/status.svg";
import TokenaryLogo from "assets/wallets/tokenary.svg";
import TorusLogo from "assets/wallets/torus.svg";
import TrustLogo from "assets/wallets/trust.svg";
import VenlyLogo from "assets/wallets/venly.svg";
import WalletConnectLogo from "assets/wallets/walletconnect-circle.svg";
import WalletLinkLogo from "assets/wallets/walletlink.svg";
import Web3DefaultLogo from "assets/wallets/web3-default.svg";
import XDEFILogo from "assets/wallets/xdefi.svg";
import env from "lib/env";

export type ConnectorFactory = (a: Actions) => Promise<[Connector, Provider]>;

export interface IProviderInfo {
  id: string;
  name: string;
  logo: string;
  description?: string;
  type: string;
  check: string;
  connector?: ConnectorFactory;
}

export const METAMASK: IProviderInfo = {
  id: "injected",
  name: "MetaMask",
  logo: MetaMaskLogo,
  type: "injected",
  check: "isMetaMask",

  async connector(actions: Actions) {
    const { MetaMask } = await import("@web3-react/metamask");
    const instance = new MetaMask(actions);
    await instance.activate(env.NETWORK);
    const web3 = new Web3Provider(instance.provider as ExternalProvider);
    return [instance, web3];
  },
};

export const TRUST: IProviderInfo = {
  id: "injected",
  name: "Trust",
  logo: TrustLogo,
  type: "injected",
  check: "isTrust",
};

export const COINBASE: IProviderInfo = {
  id: "injected",
  name: "Coinbase",
  logo: CoinbaseLogo,
  type: "injected",
  check: "isCoinbaseWallet",
};

export const WALLETCONNECT: IProviderInfo = {
  id: "walletconnect",
  name: "WalletConnect",
  logo: WalletConnectLogo,
  type: "qrcode",
  check: "isWalletConnect",
};

export const PORTIS: IProviderInfo = {
  id: "portis",
  name: "Portis",
  logo: PortisLogo,
  type: "web",
  check: "isPortis",
};

export const FORTMATIC: IProviderInfo = {
  id: "fortmatic",
  name: "Fortmatic",
  logo: FortmaticLogo,
  type: "web",
  check: "isFortmatic",
};

export const TORUS: IProviderInfo = {
  id: "torus",
  name: "Torus",
  logo: TorusLogo,
  type: "web",
  check: "isTorus",
};

export const VENLY: IProviderInfo = {
  id: "venly",
  name: "Venly",
  logo: VenlyLogo,
  type: "web",
  check: "isVenly",
};

export const AUTHEREUM: IProviderInfo = {
  id: "authereum",
  name: "Authereum",
  logo: AuthereumLogo,
  type: "web",
  check: "isAuthereum",
};

export const BURNERCONNECT: IProviderInfo = {
  id: "burnerconnect",
  name: "Burner Connect",
  logo: BurnerWalletLogo,
  type: "web",
  check: "isBurnerProvider",
};

export const MEWCONNECT: IProviderInfo = {
  id: "mewconnect",
  name: "MEW wallet",
  logo: MEWwallet,
  type: "qrcode",
  check: "isMEWconnect",
};

export const DCENT: IProviderInfo = {
  id: "dcentwallet",
  name: "D'CENT",
  logo: DcentWalletLogo,
  type: "hardware",
  check: "isDcentWallet",
};

export const BITSKI: IProviderInfo = {
  id: "bitski",
  name: "Bitski",
  logo: BitskiLogo,
  type: "web",
  check: "isBitski",
};

export const FRAME: IProviderInfo = {
  id: "frame",
  name: "Frame",
  logo: FrameLogo,
  type: "web",
  check: "isFrameNative",
};

export const BINANCECHAINWALLET: IProviderInfo = {
  id: "binancechainwallet",
  name: "Binance Chain",
  logo: BinanceChainWalletLogo,
  type: "injected",
  check: "isBinanceChainWallet",
};

export const WALLETLINK: IProviderInfo = {
  id: "walletlink",
  name: "Coinbase Wallet",
  logo: WalletLinkLogo,
  type: "qrcode",
  check: "isWalletLink",
};

export const SAFE: IProviderInfo = {
  id: "injected",
  name: "Safe",
  logo: SafeLogo,
  type: "injected",
  check: "isSafe",
};

export const NIFTY: IProviderInfo = {
  id: "injected",
  name: "Nifty",
  logo: NiftyWalletLogo,
  type: "injected",
  check: "isNiftyWallet",
};

export const DAPPER: IProviderInfo = {
  id: "injected",
  name: "Dapper",
  logo: DapperLogo,
  type: "injected",
  check: "isDapper",
};

export const OPERA: IProviderInfo = {
  id: "injected",
  name: "Opera",
  logo: OperaLogo,
  type: "injected",
  check: "isOpera",
};

export const CIPHER: IProviderInfo = {
  id: "injected",
  name: "Cipher",
  logo: CipherLogo,
  type: "injected",
  check: "isCipher",
};

export const IMTOKEN: IProviderInfo = {
  id: "injected",
  name: "imToken",
  logo: imTokenLogo,
  type: "injected",
  check: "isImToken",
};

export const STATUS: IProviderInfo = {
  id: "injected",
  name: "Status",
  logo: StatusLogo,
  type: "injected",
  check: "isStatus",
};

export const TOKENARY: IProviderInfo = {
  id: "injected",
  name: "Tokenary",
  logo: TokenaryLogo,
  type: "injected",
  check: "isTokenary",
};

export const FRAMEINJECTED: IProviderInfo = {
  id: "injected",
  name: "Frame",
  logo: FrameLogo,
  type: "injected",
  check: "isFrame",
};

export const LIQUALITY: IProviderInfo = {
  id: "injected",
  name: "Liquality",
  logo: LiqualityLogo,
  type: "injected",
  check: "isLiquality",
};

export const MATHWALLET: IProviderInfo = {
  id: "injected",
  name: "Math Wallet",
  logo: MathWalletLogo,
  type: "injected",
  check: "isMathWallet",
};

export const RWALLET: IProviderInfo = {
  id: "injected",
  name: "rWallet",
  logo: RWalletLogo,
  type: "injected",
  check: "isRWallet",
};

export const XDEFI: IProviderInfo = {
  id: "injected",
  name: "XDEFI",
  logo: XDEFILogo,
  type: "injected",
  check: "__XDEFI",
};

export const BITPIE: IProviderInfo = {
  id: "injected",
  name: "Bitpie",
  logo: BitpieLogo,
  type: "injected",
  check: "isBitpie",
};

export const CELOINJECTED: IProviderInfo = {
  id: "injected",
  name: "Celo extension wallet",
  logo: CeloExtensionWalletLogo,
  type: "injected",
  check: "isCelo",
};

export const FALLBACK: IProviderInfo = {
  id: "injected",
  name: "Web3",
  logo: Web3DefaultLogo,
  type: "injected",
  check: "isWeb3",
};
