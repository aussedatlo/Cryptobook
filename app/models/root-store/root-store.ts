import { types, Instance } from "mobx-state-tree";
import { WalletsModel } from "../wallets/wallets-model";
import { MarketModel } from "../market/market-model";
import { SettingsModel } from "../settings/settings-model";
import { BlockchainInfo } from "../blockchain/blockchain-btc-model";

/**
 * The RootStore model.
 */
export const RootStoreModel = types.model({
  settings: types.optional(SettingsModel, {} as any),
  wallets: types.optional(WalletsModel, {} as any),
  market: types.optional(MarketModel, {} as any),
  blockchainInfo: types.optional(BlockchainInfo, {} as any),
});

/**
 * The RootStore instance. Corresponds to the recommended way of using
 * MST with React : https://mobx-state-tree.js.org/concepts/using-react
 */
export type RootStoreInstance = Instance<typeof RootStoreModel>;
