import { IBlockchainAddress } from "../models/blockchain/blockchain-btc-model";
import { getBtcAddrInfo } from "../services/BlockCypher.service";

export const getAddressInfo = async (coin: string, addr: string) => {
  switch (coin.toUpperCase()) {
    case "BTC":
      const res: IBlockchainAddress = await getBtcAddrInfo(addr);
      return res;
    default:
      return undefined;
  }
};
