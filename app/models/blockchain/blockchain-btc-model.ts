import { Instance, types, SnapshotOut, flow, cast } from "mobx-state-tree";
import { getAddressInfo } from "../../utils/BlockchainInfo";

const BlockchainTsx = types.model({
  hash: types.string,
  dest: types.string,
  src: types.string,
  input: types.number,
  output: types.number,
  confirmed: types.string,
  received: types.string,
});

export interface IBlockchainTsx extends Instance<typeof BlockchainTsx> {}
export interface IBlockchainTsxSnapshot
  extends SnapshotOut<typeof BlockchainTsx> {}

export const BlockchainAddress = types.model({
  address: types.string,
  balance: types.number,
  unconfirmed_balance: types.number,
  txs: types.array(BlockchainTsx),
});

export interface IBlockchainAddress
  extends Instance<typeof BlockchainAddress> {}
export interface IBlockchainAddressSnapshot
  extends SnapshotOut<typeof BlockchainAddress> {}

export const BlockchainInfo = types
  .model({
    blockchainInfo: types.optional(types.array(BlockchainAddress), []),
  })
  .actions((self) => ({
    clear: () => {
      self.blockchainInfo = cast([]);
    },
  }))
  .actions((self) => ({
    getBlockchainTxs: (addr: string) => {
      let txs: Array<IBlockchainTsx> = [];
      const temp = self.blockchainInfo.filter((x) => x.address === addr);
      temp.map((x) => {
        x.txs.map((y) => {
          txs.push(y);
        });
      });
      return txs;
    },
  }))
  .actions((self) => ({
    addBlockchainAddress: (value: IBlockchainAddress) => {
      self.blockchainInfo.push(value);
    },
  }))
  .actions((self) => ({
    syncBlockchainInfo: flow(function* syncBlockchainInfo(address: string) {
      const res: IBlockchainAddress = yield getAddressInfo("BTC", address);
      self.blockchainInfo.push(res);
    }),
  }));

export interface IBlockchainInfo extends Instance<typeof BlockchainInfo> {}
export interface IBlockchainInfoSnapshot
  extends SnapshotOut<typeof BlockchainInfo> {}
