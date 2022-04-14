import { BigNumber } from "@ethersproject/bignumber";
import { ContractReceipt, ContractTransaction } from "@ethersproject/contracts";
import { Provider, Web3Provider } from "@ethersproject/providers";
import { fetchToken } from "lib/api/tokens";
import { formatBNToEtherFloatFixed } from "lib/bn";
import tracking, { QueuedEvent } from "lib/tracking";
import { connectFromEnv, Contract, ContractFunctionArguments, ContractFunctions } from "lib/web3/contracts";
import create from "zustand";

export enum Step {
  None = "none",
  ConnectWallet = "connect",
  Confirmation = "confirm",
  Send = "send",
  Sucess = "success",
  Error = "error",
}

export interface Description {
  action: string;
  description: string;
  value: BigNumber;
}

export type UpdateType = "Open" | "WalletConnected" | "BeforeSign" | "AfterSign" | "Done" | "Close";

export interface TransactionParams<Z extends Contract, X extends ContractFunctions<Z>> {
  contract: Z;
  fn: X;
  description: Description;
  args: ContractFunctionArguments<Z, X>;
  tracking?: QueuedEvent;
  update?: (t: UpdateType) => void;
}

export interface State {
  open: boolean;
  step: Step;
  provider?: Provider;
  error?: Error;
  hash?: string;
  gasUsed?: BigNumber;
  params?: TransactionParams<any, any>;
  mint: (id: string, amount: number) => Promise<void>;
  ethToTokenSwap: (minBHC: BigNumber, eth: BigNumber, bhc: BigNumber) => Promise<void>;
  tokenToETHSwap: (minETH: BigNumber, eth: BigNumber, bhc: BigNumber) => Promise<void>;
  makeTransaction: <Z extends Contract, X extends ContractFunctions<Z>>(params: TransactionParams<Z, X>) => void;
  close: () => void;
  connectWallet: (provider: Provider) => void;
  confirmed: () => Promise<void>;
  simulate: () => void;
}

export const useWeb3TransactionPresenter = create<State>((set, get) => ({
  open: false,
  step: Step.None,

  makeTransaction(params) {
    set({
      open: true,
      params,
      step: Step.ConnectWallet,
    });
    params.update?.("Open");
  },

  async mint(id: string, amount: number) {
    const { makeTransaction } = get();
    const token = await fetchToken(id, {
      metadata: true,
    });

    await makeTransaction<Contract.Playables, "mint">({
      description: {
        action: "Mint",
        description: "Mint " + token.name,
        value: token.priceWei,
      },
      fn: "mint",
      args: [
        {
          tokenId: BigNumber.from(token.id),
          amount: BigNumber.from(amount),
          promoCode: "",
        },
        {
          value: token.priceWei,
        },
      ],
      contract: Contract.Playables,
      update: (event) => {
        if (event === "Open") {
          tracking.mintInitiate(token.id, amount);
        }
        if (event === "BeforeSign") {
          tracking.mintWaitingToSignTransaction();
        }
        if (event === "Done") {
          tracking.mintCompleted(token.id, amount);
        }
      },
    });
  },

  async ethToTokenSwap(minBHC: BigNumber, eth: BigNumber, bhc: BigNumber) {
    const { makeTransaction } = get();

    await makeTransaction<Contract.Exchange, "ethToTokenSwapInput">({
      args: [
        minBHC,
        Math.floor(Date.now() / 1000 + 60),
        {
          value: eth,
        },
      ],
      contract: Contract.Exchange,
      description: {
        action: "Swap",
        description: `Swap ${formatBNToEtherFloatFixed(eth)} ETH for ${formatBNToEtherFloatFixed(bhc)} BHC.`,
        value: eth,
      },
      fn: "ethToTokenSwapInput",
      update: (event) => {
        if (event === "Open") {
          tracking.exchangeInitiate(minBHC);
        }
        if (event === "BeforeSign") {
          tracking.exchangeWaitingToSignTransaction();
        }
        if (event === "Done") {
          tracking.exchangeCompleted(minBHC);
        }
      },
    });
  },

  async tokenToETHSwap(minETH: BigNumber, eth: BigNumber, bhc: BigNumber) {
    const { makeTransaction } = get();

    await makeTransaction<Contract.Exchange, "tokenToEthSwapInput">({
      args: [bhc, minETH, Math.floor(Date.now() / 1000 + 60)],
      contract: Contract.Exchange,
      description: {
        action: "Swap",
        description: `Swap ${formatBNToEtherFloatFixed(bhc)} BHC for ${formatBNToEtherFloatFixed(eth)} ETH .`,
        value: BigNumber.from(0),
      },
      fn: "tokenToEthSwapInput",
    });
  },

  connectWallet(provider: Provider) {
    const { params } = get();
    params?.update?.("WalletConnected");
    set({ step: Step.Confirmation, provider });
  },

  async simulate() {
    const params = get().params as TransactionParams<any, any>;
    const provider = get().provider as Web3Provider;

    const contract = await connectFromEnv(provider.getSigner(), params.contract);
    const fn = (contract as any).callStatic[params.fn];
    return await fn(...params.args);
  },

  async confirmed() {
    set({ step: Step.Send });

    const params = get().params as TransactionParams<any, any>;
    params.update?.("BeforeSign");
    const provider = get().provider as Web3Provider;

    const contract = await connectFromEnv(provider.getSigner(), params.contract);
    const fn = (contract as any)[params.fn];

    let result: ContractTransaction;
    let reci: ContractReceipt;
    try {
      result = await fn(...params.args);
      params.update?.("AfterSign");
      reci = await result.wait(1);
      params.update?.("Done");
    } catch (e) {
      return set({
        step: Step.Error,
        error: e,
      });
    }

    set({
      step: reci.status === 1 ? Step.Sucess : Step.Error,
      hash: reci.transactionHash,
      gasUsed: reci.gasUsed,
    });
  },

  close() {
    const { params, step } = get();
    if (step === Step.Send) {
      return;
    }
    params?.update?.("Close");
    set({
      open: false,
      step: Step.None,
      params: undefined,
      provider: undefined,
      error: undefined,
      hash: undefined,
    });
  },
}));
