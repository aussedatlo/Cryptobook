import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import MainScreen from "../screens/MainScreen";
import WalletScreen from "../screens/WalletScreen";
import CreateScreen from "../screens/CreateScreen";
import EditScreen from "../screens/EditScreen";
import SelectCoinScreen from "../screens/SelectCoinScreen";
import OptionsScreen from "../screens/OptionsScreen";
import { IWallet } from "../models/wallets/wallets-model";
import BarCodeScannerScreen from "../screens/BarCodeScannerScreen";

export type RootStackParamList = {
  main: undefined;
  wallet: IWallet;
  create: IWallet;
  edit: IWallet;
  select: undefined;
  options: undefined;
  scanner: undefined;
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
          headerRightContainerStyle: {
            marginRight: 10,
          },
        }}
      />
      <RootStack.Screen
        name="wallet"
        component={WalletScreen}
        options={{
          title: t("wallet"),
        }}
      />
      <RootStack.Screen
        name="create"
        component={CreateScreen}
        options={{
          title: t("create"),
        }}
      />
      <RootStack.Screen
        name="edit"
        component={EditScreen}
        options={{
          title: t("edit"),
        }}
      />
      <RootStack.Screen
        name="select"
        component={SelectCoinScreen}
        options={{
          title: t("select"),
        }}
      />
      <RootStack.Screen
        name="options"
        component={OptionsScreen}
        options={{
          title: t("options"),
        }}
      />
      <RootStack.Screen
        name="scanner"
        component={BarCodeScannerScreen}
        options={{
          title: t("scanner"),
        }}
      />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
