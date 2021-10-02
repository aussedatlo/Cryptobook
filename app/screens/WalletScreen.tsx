import React, { useLayoutEffect, useMemo } from "react";
import { StyleSheet, ScrollView, ToastAndroid, Alert } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";
import { Divider, useTheme, Menu } from "react-native-paper";

import { RootStackParamList } from "../navigation/RootNavigator";
import { useStore } from "../models/root-store/root-store-context";
import AddressView from "../component/AddressView";
import TransactionView from "../component/TransactionView";
import { IBlockchainTsx } from "../models/blockchain/blockchain-btc-model";

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "wallet"
>;
type AddressScreenRouteProp = RouteProp<RootStackParamList, "wallet">;
type Props = {
  route: AddressScreenRouteProp;
  navigation: AddressScreenNavigationProp;
};

const WalletScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t } = useTranslation("common");
  const { wallets, blockchainInfo } = useStore();

  const handleEdit = () => {
    navigation.navigate("edit", route.params);
  };

  const handleDelete = () => {
    Alert.alert(
      t("alertDeleteTitle"),
      t("alertDeleteMessage"),
      [
        {
          text: t("cancel"),
          onPress: () => {},
          style: "cancel",
        },
        {
          text: t("delete"),
          onPress: () => {
            wallets.removeWallet(route.params);
            ToastAndroid.show(t("removed"), ToastAndroid.SHORT);
            navigation.goBack();
          },
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const HeaderRightComponent = () => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Ionicons
            name="menu"
            size={30}
            style={styles.headerRightIcon}
            onPress={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={() => {
            closeMenu();
            handleEdit();
          }}
          title={t("edit")}
        />
        <Divider />
        <Menu.Item
          onPress={() => {
            closeMenu();
            handleDelete();
          }}
          title={t("delete")}
        />
        <Divider />
        <Menu.Item onPress={closeMenu} title={t("close")} />
      </Menu>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRightComponent />,
      headerRightContainerStyle: styles.headerRightContainer,
    });
  }, [navigation, route]);

  let transactions: Array<IBlockchainTsx> = [];
  route.params.address.map((x) =>
    blockchainInfo
      .getBlockchainTxs(x)
      .map((item: IBlockchainTsx) => transactions.push(item))
  );
  transactions = transactions.sort(function (a, b) {
    return new Date(b.received).getTime() - new Date(a.received).getTime();
  });

  console.log(transactions);

  return (
    <ScrollView style={styles.root}>
      {route.params.address.map((x, index) => (
        <AddressView
          key={index}
          title={t("address") + " " + (index + 1)}
          address={x}
        />
      ))}
      {transactions.map((x) => (
        <TransactionView data={x} />
      ))}
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    headerRight: {
      display: "flex",
      flexDirection: "row",
    },
    headerRightIcon: {
      color: theme.dark ? theme.colors.background : theme.colors.text,
    },
    headerRightContainer: {
      marginRight: 10,
    },
    root: {
      flex: 1,
    },
    address: {
      marginTop: 10,
    },
  });
};

export default WalletScreen;
