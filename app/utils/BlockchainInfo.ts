import { getBtcBalance } from "../services/BlockCypher.service";

export const getBalance = async (coin: string, addr: string) => {
  switch (coin.toUpperCase()) {
    case "BTC":
      let b: number = await getBtcBalance(addr);
      b = b / 100000000;
      return b;
    default:
      return undefined;
  }
};
