import AuthereumLogo from "assets/logos/authereum.svg";
import BinanceChainWalletLogo from "assets/logos/binancechainwallet.svg";
import BitpieLogo from "assets/logos/bitpie.svg";
import BitskiLogo from "assets/logos/bitski.svg";
import BurnerWalletLogo from "assets/logos/burnerwallet.svg";
import CeloExtensionWalletLogo from "assets/logos/celoExtensionWallet.svg";
import CipherLogo from "assets/logos/cipher.svg";
import CoinbaseLogo from "assets/logos/coinbase.svg";
import DapperLogo from "assets/logos/dapper.svg";
import DcentWalletLogo from "assets/logos/dcentwallet.svg";
import FortmaticLogo from "assets/logos/fortmatic.svg";
import FrameLogo from "assets/logos/frame.svg";
import imTokenLogo from "assets/logos/imtoken.svg";
import LiqualityLogo from "assets/logos/liquality.svg";
import MathWalletLogo from "assets/logos/mathwallet.svg";
import MetaMaskLogo from "assets/logos/metamask.svg";
import MEWwallet from "assets/logos/mewwallet.svg";
import NiftyWalletLogo from "assets/logos/niftyWallet.svg";
import OperaLogo from "assets/logos/opera.svg";
import PortisLogo from "assets/logos/portis.svg";
import RWalletLogo from "assets/logos/rwallet.svg";
import SafeLogo from "assets/logos/safe.svg";
import StatusLogo from "assets/logos/status.svg";
import TokenaryLogo from "assets/logos/tokenary.svg";
import TorusLogo from "assets/logos/torus.svg";
import TrustLogo from "assets/logos/trust.svg";
import VenlyLogo from "assets/logos/venly.svg";
import WalletConnectLogo from "assets/logos/walletconnect-circle.svg";
import WalletLinkLogo from "assets/logos/walletlink.svg";
import Web3DefaultLogo from "assets/logos/web3-default.svg";
import XDEFILogo from "assets/logos/xdefi.svg";

export interface IProviderInfo {
  id: string;
  name: string;
  logo: string;
  description?: string;
  type: string;
  check: string;
  package?: IProviderPackageOptions;
}

export type RequiredOption = string | string[];

export interface IProviderPackageOptions {
  required?: RequiredOption[];
}

export const WALLETCONNECT: IProviderInfo = {
  id: "walletconnect",
  name: "WalletConnect",
  logo: WalletConnectLogo,
  type: "qrcode",
  check: "isWalletConnect",
  package: {
    required: [["infuraId", "rpc"]],
  },
};

export const PORTIS: IProviderInfo = {
  id: "portis",
  name: "Portis",
  logo: PortisLogo,
  type: "web",
  check: "isPortis",
  package: {
    required: ["id"],
  },
};

export const FORTMATIC: IProviderInfo = {
  id: "fortmatic",
  name: "Fortmatic",
  logo: FortmaticLogo,
  type: "web",
  check: "isFortmatic",
  package: {
    required: ["key"],
  },
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
  package: {
    required: ["clientId"],
  },
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
  package: {
    required: [["infuraId", "rpc"]],
  },
};

export const DCENT: IProviderInfo = {
  id: "dcentwallet",
  name: "D'CENT",
  logo: DcentWalletLogo,
  type: "hardware",
  check: "isDcentWallet",
  package: {
    required: ["rpcUrl"],
  },
};

export const BITSKI: IProviderInfo = {
  id: "bitski",
  name: "Bitski",
  logo: BitskiLogo,
  type: "web",
  check: "isBitski",
  package: {
    required: ["clientId", "callbackUrl"],
  },
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
  package: {
    required: [["appName", "infuraId", "rpc"]],
  },
};

export const METAMASK: IProviderInfo = {
  id: "injected",
  name: "MetaMask",
  logo: MetaMaskLogo,
  type: "injected",
  check: "isMetaMask",
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
  check: "isToshi",
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
