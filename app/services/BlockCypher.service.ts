import axios from "axios";
import { cast } from "mobx-state-tree";
import { IBlockchainAddress } from "../models/blockchain/blockchain-btc-model";

export interface IAddrs {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  txs?: TxsEntity[] | null;
}
export interface TxsEntity {
  block_hash: string;
  block_height: number;
  block_index: number;
  hash: string;
  addresses?: string[] | null;
  total: number;
  fees: number;
  size: number;
  vsize: number;
  preference: string;
  relayed_by: string;
  confirmed: string;
  received: string;
  ver: number;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  opt_in_rbf?: boolean | null;
  confirmations: number;
  confidence: number;
  inputs: InputsEntity[];
  outputs: OutputsEntity[];
  lock_time?: number | null;
  next_outputs?: string | null;
}
export interface InputsEntity {
  prev_hash: string;
  output_index: number;
  script?: string | null;
  output_value: number;
  sequence: number;
  addresses: string[];
  script_type: string;
  age: number;
  witness?: string[] | null;
}
export interface OutputsEntity {
  value: number;
  script: string;
  spent_by?: string | null;
  addresses: string[];
  script_type: string;
}

// more info here : https://www.blockcypher.com/dev/
const API_HOSTNAME: string = "https://api.blockcypher.com";
const API_BASE_PATH: string = "v1";

const API_BTC_ADDRS_FULL: { path: string; params: object } = {
  path: "btc/main/addrs",
  params: { limit: 50, txlimit: 100 },
};

export const getBtcAddrInfo = async (addr: string) => {
  const res = await axios.get<IAddrs>(
    `${API_HOSTNAME}/${API_BASE_PATH}/${API_BTC_ADDRS_FULL.path}/${addr}/full`,
    {
      params: API_BTC_ADDRS_FULL.params,
    }
  );

  let baddr: IBlockchainAddress = {
    address: res.data.address,
    balance: res.data.balance,
    unconfirmed_balance: res.data.unconfirmed_balance,
    txs: cast([]),
  };

  res.data.txs?.map((t) => {
    t.inputs.map((i) => {
      if (i.addresses && i.addresses.includes(addr)) {
        baddr.txs.push({
          hash: t.hash,
          src: addr,
          dest: t.outputs[0].addresses[0],
          input: 0,
          output: i.output_value / 100000000,
          confirmed: t.confirmed,
          received: t.received,
        });
      }
    });
    t.outputs.map((o) => {
      if (o.addresses.includes(addr)) {
        baddr.txs.push({
          hash: t.hash,
          src: o.addresses[0],
          dest: addr,
          input: o.value / 100000000,
          output: 0,
          confirmed: t.confirmed,
          received: t.received,
        });
      }
    });
  });

  return baddr;
};
