import { Instance, types, SnapshotOut } from "mobx-state-tree";

export const WalletAddress = types.model({
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
export interface IWalletAddress extends Instance<typeof WalletAddress> {}
export interface IWalletAddress extends SnapshotOut<typeof WalletAddress> {}

export interface ISettings extends Instance<typeof AddressesModel> {}
export interface ISettingsSnapshot extends SnapshotOut<typeof AddressesModel> {}

export const AddressesModel = types
  .model({
    addresses: types.optional(types.array(WalletAddress), []),
  })
  .actions((self) => ({
    setAddresses: (value: Array<IWalletAddress>) => {
      self.addresses.replace(value);
    },
    addAddress: (value: IWalletAddress) => {
      if (self.addresses.find((w) => w.label === value.label)) {
        return;
      }

      self.addresses.push(value);
    },
    removeAddress: (value: IWalletAddress) => {
      self.addresses.replace(
        self.addresses.filter((w) => w.label !== value.label)
      );
    },
  }));
