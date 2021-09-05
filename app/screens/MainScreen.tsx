import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import { observer } from "mobx-react-lite";

import AddressList from "../component/AddressList";

const MainScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { navigate } = useNavigation();

  return (
    <View style={styles.root}>
      <AddressList />
      <FAB style={styles.fab} icon="plus" onPress={() => navigate("select")} />
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    button: {
      borderRadius: 50,
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });
};

export default observer(MainScreen);
