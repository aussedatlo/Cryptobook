import { Instance, types, SnapshotOut } from "mobx-state-tree";

export const Coin = types.model({
  id: types.string,
  name: types.string,
  symbol: types.string,
  image: types.string,
});

export const MarketModel = types
  .model({
    coins: types.optional(types.array(Coin), []),
  })
  .actions((self) => ({
    setCoins: (value: Array<ICoin>) => {
      self.coins.replace(value);
    },
  }));

// according to the official mobx-state-tree doc, using the following
// interface is much more optimized for the typescript compiler
// https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time
export interface ICoin extends Instance<typeof Coin> {}
export interface ICoinSnapshot extends SnapshotOut<typeof Coin> {}
