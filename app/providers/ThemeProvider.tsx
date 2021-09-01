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
    primary: "#f29e02",
    background: "#f0f0f0",
    accent: "#0463B5",
    error: "#ff4040",
    text: "#343434",
    placeholder: "#505050",
    surface: "#f5f5f5",
  },
};

const CombinedDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "#f29e02",
    background: "#252525",
    accent: "#0463B5",
    error: "#ff4040",
    text: "#eeeeee",
    placeholder: "#cccccc",
    surface: "#343434",
  },
};

interface ThemeProviderProps {
  dark: boolean;
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <PaperProvider theme={CombinedDarkTheme}>
      <NavigationContainer theme={CombinedDarkTheme}>
        {children}
      </NavigationContainer>
    </PaperProvider>
  );
};

export default ThemeProvider;
