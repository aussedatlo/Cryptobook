import React from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import "./app/i18n/i18n";
import RootNavigator from "./app/navigation/RootNavigator";
import ThemeProvider from "./app/providers/ThemeProvider";

export default function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ThemeProvider>
        <RootNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
