import React, { useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Theme,
  useFocusEffect,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { FAB, Icon } from "react-native-elements";

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
      <FAB
        icon={<Icon name="add" size={25} color={theme.colors.background} />}
        placement="right"
        onPress={() => {
          navigate("select");
        }}
        color={theme.colors.primary}
        buttonStyle={styles.button}
        size="large"
      />
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
  });
};

export default MainScreen;
