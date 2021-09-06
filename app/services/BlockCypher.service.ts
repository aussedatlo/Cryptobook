import axios from "axios";

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
}

// more info here : hhttps://www.blockcypher.com/dev/
const API_HOSTNAME: string = "https://api.blockcypher.com";
const API_BASE_PATH: string = "v1";

const API_BTC_ADDRS: { path: string; params: object } = {
  path: "btc/main/addrs",
  params: {},
};

export const getBtcBalance = async (addr: string) => {
  const res = await axios.get<IAddrs>(
    `${API_HOSTNAME}/${API_BASE_PATH}/${API_BTC_ADDRS.path}/${addr}`,
    {
      params: API_BTC_ADDRS.params,
    }
  );
  return res.data.balance;
};
