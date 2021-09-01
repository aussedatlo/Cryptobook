import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";

import MainScreen from "../screens/MainScreen";
import AddressScreen from "../screens/AddressScreen";
import CreateScreen from "../screens/CreateScreen";
import SelectCoinScreen from "../screens/SelectCoinScreen";
import { IWalletAddress } from "../models/addresses/addresses-model";

export type RootStackParamList = {
  main: undefined;
  address: { address: IWalletAddress };
  create: { coin: any };
  select: undefined;
};

const RootNavigator = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  const { t } = useTranslation("common");
  const theme = useTheme();

  return (
    <RootStack.Navigator
      initialRouteName={"main"}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.dark
          ? theme.colors.background
          : theme.colors.text,
      }}
    >
      <RootStack.Screen
        name="main"
        component={MainScreen}
        options={{
          title: t("cryptobook"),
        }}
      />
      <RootStack.Screen name="address" component={AddressScreen} />
      <RootStack.Screen name="create" component={CreateScreen} />
      <RootStack.Screen name="select" component={SelectCoinScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
