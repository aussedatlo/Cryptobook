import { types, Instance } from "mobx-state-tree";
import { AddressesModel } from "../addresses/addresses-model";
import { MarketModel } from "../market/market-model";
import { SettingsModel } from "../settings/settings-model";

/**
 * The RootStore model.
 */
export const RootStoreModel = types.model({
  settings: types.optional(SettingsModel, {} as any),
  addresses: types.optional(AddressesModel, {} as any),
  market: types.optional(MarketModel, {} as any),
});

/**
 * The RootStore instance. Corresponds to the recommended way of using
 * MST with React : https://mobx-state-tree.js.org/concepts/using-react
 */
export type RootStoreInstance = Instance<typeof RootStoreModel>;
