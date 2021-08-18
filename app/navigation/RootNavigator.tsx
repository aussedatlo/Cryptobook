import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import MainScreen from "../screens/MainScreen";
import AddressScreen from "../screens/AddressScreen";
import CreateScreen from "../screens/CreateScreen";
import SelectCoinScreen from "../screens/SelectCoinScreen";

export type RootStackParamList = {
  main: undefined;
  address: { id: number };
  create: { coin: any };
  select: undefined;
};

const RootNavigator = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  const { t } = useTranslation("common");

  return (
    <RootStack.Navigator initialRouteName={"main"}>
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
