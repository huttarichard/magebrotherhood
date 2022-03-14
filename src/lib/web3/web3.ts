import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

import { chains } from "./chains";

const injected = injectedModule();

const initWeb3Onboard = init({
  wallets: [injected],
  chains,
  appMetadata: {
    name: "Mage Brotherhood",
    icon: "<svg><svg/>",
    description: "Mage Brotherhood",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
});

export default initWeb3Onboard;
