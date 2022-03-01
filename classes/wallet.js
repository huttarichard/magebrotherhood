import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

export default class Wallet {
  async connectWithModal() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "cbb17e1c9af54ec1b90e007ed4854ffe",
        },
      },
    };

    const modal = new Web3Modal({
      network: "rinkeby",
      cacheProvider: true,
      providerOptions,
      theme: "dark",
    });

    try {
      const provider = await modal.connect();

      this.web3 = new Web3(provider);
    } catch (e) {
      console.log(e);
    }
  }

  async connectWithInjectedProvider(provider) {
    this.web3 = new Web3(provider);
  }

  get address() {
    return this.web3._provider.selectedAddress;
  }

  async getTransactionByHash(hash) {
    return this.web3.eth.getTransaction(hash);
  }

  async getEthBalance() {
    return this.web3.eth.getBalance(this.address);
  }

  async sendTransaction(transactionData) {
    const transactionObject = {
      ...transactionData,
      from: this.address,
    };

    return this.web3.eth.sendTransaction(transactionObject);
  }
}
