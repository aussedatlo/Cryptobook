import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Theme,
  useFocusEffect,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { FAB } from "react-native-paper";

import AddressList from "../component/AddressList";
import { WalletAddress } from "../types/WalletAddress";
import { retrieveData } from "../utils/Storage";

const MainScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { navigate } = useNavigation();
  const [arrayAddress, setArrayAddress] = useState<Array<WalletAddress>>([]);

  const initArrayAddress = async () => {
    setArrayAddress(await retrieveData());
  };

  useFocusEffect(
    React.useCallback(() => {
      initArrayAddress();
    }, [])
  );

  return (
    <View style={styles.root}>
      <AddressList data={arrayAddress} />
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

export default MainScreen;
