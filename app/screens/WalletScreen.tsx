import React, { useLayoutEffect, useMemo } from "react";
import {
  Image,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Alert,
  Share,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Clipboard } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";
import {
  Card,
  Button,
  Paragraph,
  Divider,
  Surface,
  useTheme,
  Menu,
  ActivityIndicator,
} from "react-native-paper";

import { RootStackParamList } from "../navigation/RootNavigator";
import { useStore } from "../models/root-store/root-store-context";
import { useEffect } from "react";
import { getBalance } from "../utils/BlockchainInfo";

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
  const [value, setValue] = React.useState<string>("");
  const [balance, setBalance] = React.useState<number | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(true);
  const { t } = useTranslation("common");
  const { wallets } = useStore();

  const handleEdit = () => {
    navigation.navigate("create", route.params);
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
          onPress={async () => {
            closeMenu();
            await Share.share({
              message: route.params.address,
            });
          }}
          title={t("share")}
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

  const initBalance = async () => {
    const balance: number | undefined = await getBalance(
      route.params.symbol,
      route.params.address
    );
    setBalance(balance);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    initBalance();
  }, []);

  return (
    <ScrollView style={styles.root}>
      <Card style={styles.card}>
        <Card.Title
          title={route.params.label}
          subtitle={route.params.symbol.toUpperCase()}
          left={(props) => (
            <Image source={{ uri: route.params.image }} style={styles.logo} />
          )}
        />
        <Divider />
        <Card.Content style={styles.cardContent}>
          <Surface style={styles.surface}>
            <QRCode
              value={
                value === ""
                  ? route.params.address
                  : route.params.address + "?amount=" + value
              }
              backgroundColor="transparent"
              size={300}
              logo={{ uri: route.params.image }}
              logoSize={30}
              logoBackgroundColor={theme.colors.background}
            />
          </Surface>
          <Paragraph style={styles.address}>{route.params.address}</Paragraph>
          {value === "" ? (
            <></>
          ) : (
            <Paragraph style={styles.address}>
              {t("amount") + ": " + value}
            </Paragraph>
          )}
          <Button
            style={styles.button}
            labelStyle={styles.labelButton}
            onPress={() => {
              Clipboard.setString(route.params.address);
              ToastAndroid.show(t("copied"), ToastAndroid.SHORT);
            }}
            mode="contained"
          >
            Copy
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title={t("notes")}></Card.Title>
        <Divider />
        <Card.Content style={styles.content}>
          <Paragraph>
            {route.params.notes === "" ? t("emptyNote") : route.params.notes}
          </Paragraph>
        </Card.Content>
      </Card>

      {loading ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          animating={true}
          color={theme.colors.accent}
          size={30}
        />
      ) : (
        <></>
      )}

      {balance !== undefined ? (
        <Card style={styles.card}>
          <Card.Title title={t("balance")}></Card.Title>
          <Divider />
          <Card.Content style={styles.content}>
            <Paragraph>{balance}</Paragraph>
          </Card.Content>
        </Card>
      ) : (
        <></>
      )}

      {/* <Card style={styles.card}>
        <Card.Title title={t("setAmount")}></Card.Title>
        <Divider />
        <Card.Content style={styles.content}>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={t("amount")}
          />
        </Card.Content>
      </Card> */}
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
    cardContent: {
      alignItems: "center",
      margin: 10,
    },
    card: {
      margin: 5,
    },
    logo: {
      width: 50,
      height: 50,
      marginRight: 30,
    },
    address: {
      marginTop: 10,
    },
    button: {
      marginTop: 30,
      width: "70%",
      backgroundColor: theme.colors.accent,
    },
    labelButton: {
      color: theme.dark ? theme.colors.text : theme.colors.background,
    },
    surface: {
      backgroundColor: theme.dark ? theme.colors.text : theme.colors.background,
      elevation: 4,
      padding: 8,
    },
    activityIndicator: {
      margin: 10,
    },
    content: {
      marginTop: 10,
    },
  });
};

export default WalletScreen;
