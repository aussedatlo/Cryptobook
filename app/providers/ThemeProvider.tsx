import React, { ReactNode } from "react";
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  NavigationContainer,
} from "@react-navigation/native";

declare global {
  namespace ReactNativePaper {
    export interface ThemeColors {}
  }
}

const CombinedLightTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: "#1d2025",
    background: "#eeeeee",
    accent: "#f0b80b",
    error: "#ff4040",
    text: "#202020",
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "#1d2025",
    background: "#eeeeee",
    accent: "#f0b80b",
    error: "#ff4040",
    text: "#202020",
  },
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <PaperProvider theme={CombinedLightTheme}>
      <NavigationContainer theme={CombinedLightTheme}>
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ThemeProvider;
