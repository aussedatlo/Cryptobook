import React from "react";
import { Vibration, ToastAndroid, Keyboard } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { cast } from "mobx-state-tree";

import { RootStackParamList } from "../navigation/RootNavigator";
import { IWallet } from "../models/wallets/wallets-model";
import { useStore } from "../models/root-store/root-store-context";
import WalletInputView from "../component/WalletInputView";

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "create"
>;
type AddressScreenRouteProp = RouteProp<RootStackParamList, "create">;
type Props = {
  route: AddressScreenRouteProp;
  navigation: AddressScreenNavigationProp;
};

const CreateScreen = ({ route, navigation }: Props) => {
  const { navigate } = useNavigation();
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
      wallets.addWallet(w);
      ToastAndroid.show(t("created"), ToastAndroid.SHORT);
      navigate("main");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <WalletInputView
      wallet={route.params}
      buttonText={t("create")}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateScreen;
