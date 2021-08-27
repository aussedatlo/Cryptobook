import AsyncStorage from "@react-native-async-storage/async-storage";

import { WalletAddress } from "../types/WalletAddress";

const STORAGE_KEY = "cryptobook-storage";

export const storeData = async (data: Array<WalletAddress>) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.log("unable to store address");
  }
};

export const retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);

    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    } else {
      // No data, return empty array
      return [];
    }
  } catch (error) {
    console.log("unable to get data");
    return [];
  }
};

export const addAddress = async (data: WalletAddress) => {
  try {
    let arr: Array<WalletAddress> = await retrieveData();

    if (arr.find((w) => w.label === data.label)) {
      throw new Error("label exist");
    }

    arr.push(data);
    storeData(arr);
  } catch (error) {
    throw new Error("unable to add address");
  }
};

export const removeAddress = async (data: WalletAddress) => {
  try {
    let arr: Array<WalletAddress> = await retrieveData();
    arr = arr.filter((w) => w.label !== data.label);
    storeData(arr);
  } catch (error) {
    throw new Error("unable to remove address");
  }
};
