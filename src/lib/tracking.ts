import { BigNumber } from "@ethersproject/bignumber";
import { fetchToken as fetchTokenFromAPI } from "lib/api/tokens";
import type { Metadata, Pricing, Token } from "lib/server/tokens";
import create from "zustand/vanilla";

import { formatBNToEtherFloatFixed } from "./bn";

// ttq.instance('pixel_id_1').track('CompletePayment')
type TikTokEventName =
  | "ClickButton"
  | "CompletePayment"
  | "InitiateCheckout"
  | "PlaceAnOrder"
  | "Subscribe"
  | "AddToCart"
  | "ViewContent";

interface TikTokEventData {
  // The content_type object property's value must be set to either product, or
  // product_group, depending on how you will configure your data feed when you set up your
  // product catalog. If you will be tracking events associated with individual products,
  // set the value to product. If you are tracking events associated with product
  // groups, set it to product_group instead.
  content_type: "product" | "product_group"; // Required

  // Product or content identifier
  content_id: string; // Required

  // Name of the page/product
  content_name?: string;

  // The number of product which is added to cart or bought by users
  quantity?: number;

  // The price of the item
  price?: number;

  // The total price of the order
  value?: number;

  // Refers to currency used as a means of circulation in social and economic activities such as USD
  currency?: "USD";
}

export interface TrackingWindow extends Window {
  TiktokAnalyticsObject: string;

  ttq: {
    instance: (instance: string) => {
      track: (event: TikTokEventName, args?: TikTokEventData) => void;
    };
  };
}

declare let window: TrackingWindow;

const PIXEL_ID = "webpage";

function track(name: TikTokEventName, data?: TikTokEventData) {
  if (typeof window === "undefined") {
    return;
  }
  window.ttq.instance(PIXEL_ID).track(name, data);
}

export interface ClickImportantButton {
  name: "ClickImportantButton";
}

export interface Subscribe {
  name: "Subscribe";
}

interface TokenData {
  tokenId: string;
  quantity: number;
}

export interface MintInitiate extends TokenData {
  name: "MintInitiate";
}

export interface MintWaitingToSignTransaction {
  name: "MintWaitingToSignTransaction";
}

export interface MintCompleted extends TokenData {
  name: "MintCompleted";
}

interface ExchangeData {
  amount: BigNumber;
}

export interface ExchangeInitiate extends ExchangeData {
  name: "ExchangeInitiate";
}

export interface ExchangeWaitingToSignTransaction {
  name: "ExchangeWaitingToSignTransaction";
}

export interface ExchangeTransactionCompleted extends ExchangeData {
  name: "ExchangeTransactionCompleted";
}

export type QueuedEvent =
  | ClickImportantButton
  | Subscribe
  | MintInitiate
  | MintWaitingToSignTransaction
  | MintCompleted
  | ExchangeInitiate
  | ExchangeWaitingToSignTransaction
  | ExchangeTransactionCompleted;

export function isClickImportantButton(event: QueuedEvent): event is ClickImportantButton {
  return (event as ClickImportantButton).name === "ClickImportantButton";
}

export function isSubscribe(event: QueuedEvent): event is Subscribe {
  return (event as Subscribe).name === "Subscribe";
}

export function isMintInitiate(event: QueuedEvent): event is MintInitiate {
  return (event as MintInitiate).name === "MintInitiate";
}

export function isMintWaitingToSignTransaction(event: QueuedEvent): event is MintWaitingToSignTransaction {
  return (event as MintWaitingToSignTransaction).name === "MintWaitingToSignTransaction";
}

export function isMintCompleted(event: QueuedEvent): event is MintCompleted {
  return (event as MintCompleted).name === "MintCompleted";
}

export function isExchangeInitiate(event: QueuedEvent): event is ExchangeInitiate {
  return (event as ExchangeInitiate).name === "ExchangeInitiate";
}

export function isExchangeWaitingToSignTransaction(event: QueuedEvent): event is ExchangeWaitingToSignTransaction {
  return (event as ExchangeWaitingToSignTransaction).name === "ExchangeWaitingToSignTransaction";
}

export function isExchangeTransactionCompleted(event: QueuedEvent): event is ExchangeTransactionCompleted {
  return (event as ExchangeTransactionCompleted).name === "ExchangeTransactionCompleted";
}

type TokenInterface = Token & Pricing & Metadata;

export interface Tracking {
  queue: QueuedEvent[];
  tokens: Record<string, TokenInterface>;
  enqueue: (event: QueuedEvent) => void;
  flush: () => Promise<void>;
}

interface BHCQuote {
  priceETH: number;
  priceUSD: number;
  bhcReserves: number;
  ethReserves: number;
}

const SELLING_TAX = 1.05;

export const queue = create<Tracking>((set, get) => {
  // Fetch will fetch token from api and update the state
  const fetchToken = async (id: string): Promise<TokenInterface> => {
    const existingItem = get().tokens[id];
    if (existingItem) return existingItem;
    const json = await fetchTokenFromAPI(id, { pricing: true });
    const tokens = get().tokens;
    set({ tokens: { ...tokens, [id]: json } });
    return json as TokenInterface;
  };

  // will fetch market prices from BHC
  const fetchBHCPrice = async (): Promise<BHCQuote> => {
    const data = await fetch("/api/market/bhc");
    const json = await data.json();
    return json;
  };

  const processEventQueue = async () => {
    const copy = [...get().queue];
    if (copy.length === 0) return;

    // Free the queue we have the copy in scope
    set({ queue: [] });

    const promises = copy.map(async (event) => {
      if (isClickImportantButton(event)) {
        track("ClickButton");
      }

      if (isSubscribe(event)) {
        track("Subscribe");
      }

      if (isMintWaitingToSignTransaction(event)) {
        track("InitiateCheckout");
      }

      if (isExchangeWaitingToSignTransaction(event)) {
        track("InitiateCheckout");
      }

      if (isMintInitiate(event)) {
        const item = await fetchToken(event.tokenId);

        track("AddToCart", {
          content_type: "product",
          content_id: "token_" + event.tokenId,
          content_name: item.name,
          quantity: event.quantity,
          price: item.priceUSD,
          value: item.priceUSD * event.quantity * SELLING_TAX,
          currency: "USD",
        });
      }

      if (isExchangeInitiate(event)) {
        const bhc = await fetchBHCPrice();
        const amount = formatBNToEtherFloatFixed(event.amount);

        track("AddToCart", {
          content_type: "product",
          content_id: "exchange_buy_bhc",
          content_name: "bhc",
          currency: "USD",
          quantity: Math.ceil(amount),
          price: bhc.priceUSD,
          value: bhc.priceUSD * amount * SELLING_TAX,
        });
      }

      if (isMintCompleted(event)) {
        const item = await fetchToken(event.tokenId);

        track("CompletePayment", {
          content_type: "product",
          content_id: event.tokenId,
          quantity: event.quantity,
          content_name: item.name,
          price: item.priceUSD,
          value: item.priceUSD * event.quantity * SELLING_TAX,
          currency: "USD",
        });
      }

      if (isExchangeTransactionCompleted(event)) {
        const bhc = await fetchBHCPrice();
        const amount = formatBNToEtherFloatFixed(event.amount);

        track("CompletePayment", {
          content_type: "product",
          content_id: "exchange_buy_bhc",
          content_name: "bhc",
          currency: "USD",
          quantity: Math.ceil(amount),
          price: bhc.priceUSD,
          value: bhc.priceUSD * amount * SELLING_TAX,
        });
      }
    });

    await Promise.all(promises);
  };

  return {
    queue: [],
    tokens: {},

    enqueue(event: QueuedEvent) {
      console.group("Tracking: ", event.name);
      console.info(event);
      console.groupEnd();

      const events = get().queue;
      set({ queue: [...events, event] });
    },

    flush: processEventQueue,
  };
});

queue.subscribe((state) => state.flush());

const tracking = {
  clickImportantButton() {
    const { enqueue } = queue.getState();
    enqueue({
      name: "ClickImportantButton",
    });
  },

  subscribe() {
    const { enqueue } = queue.getState();
    enqueue({
      name: "Subscribe",
    });
  },

  // same as add to cart
  mintInitiate(tokenId: string, quantity: number) {
    const { enqueue } = queue.getState();
    enqueue({
      name: "MintInitiate",
      quantity,
      tokenId,
    });
  },

  // same as checkout initiate
  mintWaitingToSignTransaction() {
    const { enqueue } = queue.getState();
    enqueue({
      name: "MintWaitingToSignTransaction",
    });
  },

  // same as pymant completed
  mintCompleted(tokenId: string, quantity: number) {
    const { enqueue } = queue.getState();
    enqueue({
      name: "MintCompleted",
      quantity,
      tokenId,
    });
  },

  // same as add to cart
  exchangeInitiate(bhcBuy: BigNumber) {
    const { enqueue } = queue.getState();
    enqueue({
      name: "ExchangeInitiate",
      amount: bhcBuy,
    });
  },

  // same as checkout initiate
  exchangeWaitingToSignTransaction() {
    const { enqueue } = queue.getState();
    enqueue({
      name: "ExchangeWaitingToSignTransaction",
    });
  },

  // same as pymant completed
  exchangeCompleted(bhcBuy: BigNumber) {
    const { enqueue } = queue.getState();
    enqueue({
      name: "ExchangeTransactionCompleted",
      amount: bhcBuy,
    });
  },
};

export default tracking;
