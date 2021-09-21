import { Instance, types, SnapshotOut } from "mobx-state-tree";

export const Wallet = types.model({
  label: types.string,
  address: types.string,
  notes: types.string,
  image: types.string,
  name: types.string,
  symbol: types.string,
});

// according to the official mobx-state-tree doc, using the following
// interface is much more optimized for the typescript compiler
// https://mobx-state-tree.js.org/tips/typescript#using-a-mst-type-at-design-time
export interface IWallet extends Instance<typeof Wallet> {}
export interface IWallet extends SnapshotOut<typeof Wallet> {}

export const WalletsModel = types
  .model({
    wallets: types.optional(types.array(Wallet), []),
  })
  .actions((self) => ({
    addWallet: (value: IWallet) => {
      if (self.wallets.find((w) => w.label === value.label)) {
        return;
      }
      self.wallets.push(value);
    },
    replaceWallet: (old: IWallet, value: IWallet) => {
      const index = self.wallets.findIndex((w) => old === w);
      self.wallets[index] = value;
    },
    removeWallet: (value: IWallet) => {
      self.wallets.replace(self.wallets.filter((w) => w !== value));
    },
    exist: (value: string) => {
      return self.wallets.filter((w) => w.label === value).length > 0;
    },
  }));
