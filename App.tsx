import AppLoading from "expo-app-loading";
import React, { useEffect, useState } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import "./app/i18n/i18n";
import { RootStoreInstance } from "./app/models/root-store/root-store";
import { RootStoreProvider } from "./app/models/root-store/root-store-context";
import { setupRootStore } from "./app/models/root-store/setup-root-store";
import RootNavigator from "./app/navigation/RootNavigator";
import ThemeProvider from "./app/providers/ThemeProvider";

export default function App() {
  const [rootStore, setRootStore] = useState<RootStoreInstance | undefined>(
    undefined
  );

  useEffect(() => {
    setupRootStore().then(setRootStore);
  }, []);

  if (!rootStore) {
    return <AppLoading />;
  }

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ThemeProvider>
          <RootNavigator />
        </ThemeProvider>
      </SafeAreaProvider>
    </RootStoreProvider>
  );
}
