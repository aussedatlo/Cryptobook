import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { List, Switch, useTheme } from "react-native-paper";
import { observer } from "mobx-react-lite";
import { Theme } from "react-native-paper/lib/typescript/types";
import { useTranslation } from "react-i18next";

import { useStore } from "../models/root-store/root-store-context";

const MainScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { settings } = useStore();
  const { dark } = settings;
  const { t } = useTranslation("common");

  return (
    <View style={styles.root}>
      <List.Item
        title={t("darkMode")}
        description={t("darkModeDescription")}
        right={() => (
          <Switch
            value={dark}
            onValueChange={(value) => {
              settings.setDark(value);
            }}
          />
        )}
      ></List.Item>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
  });
};

export default observer(MainScreen);
