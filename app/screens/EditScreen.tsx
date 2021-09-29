import React from "react";
import { Vibration, ToastAndroid, Keyboard } from "react-native";
import { RouteProp, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { cast } from "mobx-state-tree";

import { RootStackParamList } from "../navigation/RootNavigator";
import { IWallet } from "../models/wallets/wallets-model";
import { useStore } from "../models/root-store/root-store-context";
import WalletInputView from "../component/WalletInputView";

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "edit"
>;
type AddressScreenRouteProp = RouteProp<RootStackParamList, "edit">;
type Props = {
  route: AddressScreenRouteProp;
  navigation: AddressScreenNavigationProp;
};

const EditScreen = ({ route, navigation }: Props) => {
  const { t } = useTranslation("common");
  const { wallets } = useStore();

  const handleSubmit = (
    label: string,
    address: Array<string>,
    notes: string
  ) => {
    Vibration.vibrate(50);
    Keyboard.dismiss();
    const w: IWallet = {
      id: route.params.id,
      address: cast(address),
      notes: notes,
      label: label,
      name: route.params.name,
      symbol: route.params.symbol,
      image: route.params.image,
    };

    try {
      wallets.replaceWallet(route.params, w);
      ToastAndroid.show(t("edited"), ToastAndroid.SHORT);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "main" }, { name: "wallet", params: w }],
        })
      );
    } catch (error) {
      alert(error);
    }
  };

  return (
    <WalletInputView
      wallet={route.params}
      buttonText={t("edit")}
      onSubmit={handleSubmit}
    />
  );
};

export default EditScreen;
