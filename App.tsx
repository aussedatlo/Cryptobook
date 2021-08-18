import React from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import {
  DefaultTheme,
  DarkTheme as DefaultDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";

import "./app/i18n/i18n";
import RootNavigator from "./app/navigation/RootNavigator";

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const DarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
  },
};

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer theme={false ? DarkTheme : LightTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
