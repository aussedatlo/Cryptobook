import axios from "axios";
import { ICoin } from "../models/market/market-model";

// more info here : https://www.coingecko.com/en/api#explore-api
const API_HOSTNAME: string = "https://api.coingecko.com";
const API_BASE_PATH: string = "api/v3";

const API_MARKET: { path: string; params: object } = {
  path: "coins/markets",
  params: {
    vs_currency: "usd",
    per_page: 200,
    price_change_percentage: "1h,24h,7d",
  },
};

export const getCoin = async () => {
  const res = await axios.get<ICoin[]>(
    `${API_HOSTNAME}/${API_BASE_PATH}/${API_MARKET.path}`,
    {
      params: API_MARKET.params,
    }
  );
  return res.data;
};
