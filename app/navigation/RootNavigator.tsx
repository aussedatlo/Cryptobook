import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import MainScreen from "../screens/MainScreen";
import AddressScreen from "../screens/AddressScreen";
import CreateScreen from "../screens/CreateScreen";
import SelectCoinScreen from "../screens/SelectCoinScreen";
import OptionsScreen from "../screens/OptionsScreen";
import { IWalletAddress } from "../models/addresses/addresses-model";

export type RootStackParamList = {
  main: undefined;
  address: { address: IWalletAddress };
  create: { coin: any };
  select: undefined;
  options: undefined;
};

const RootNavigator = () => {
  const RootStack = createStackNavigator<RootStackParamList>();
  const { t } = useTranslation("common");
  const { navigate } = useNavigation();
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
          headerRight: (props) => (
            <Ionicons
              name="options"
              size={30}
              style={{ margin: 5 }}
              onPress={() => {
                navigate("options");
              }}
            />
          ),
        }}
      />
      <RootStack.Screen name="address" component={AddressScreen} />
      <RootStack.Screen name="create" component={CreateScreen} />
      <RootStack.Screen name="select" component={SelectCoinScreen} />
      <RootStack.Screen name="options" component={OptionsScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
