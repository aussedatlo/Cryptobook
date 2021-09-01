import React, { useMemo, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  ToastAndroid,
  TouchableNativeFeedback,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Menu, useTheme } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";

import { getAddress, removeAddress } from "../utils/Storage";
import { WalletAddress } from "../types/WalletAddress";

const AddressList = () => {
  const { navigate } = useNavigation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t } = useTranslation("common");
  const [arrayAddress, setArrayAddress] = useState<Array<WalletAddress>>([]);

  const initArrayAddress = async () => {
    console.log("initArrayAddress");
    setArrayAddress(await getAddress());
  };

  useFocusEffect(
    React.useCallback(() => {
      initArrayAddress();
    }, [])
  );

  const RenderMenuItem = ({ item }: any) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleDelete = async () => {
      await removeAddress(item);
      await initArrayAddress();
      ToastAndroid.show(t("removed"), ToastAndroid.SHORT);
      closeMenu();
    };

    return (
      <Menu
        key={item.id}
        visible={visible}
        onDismiss={closeMenu}
        style={styles.menu}
        anchor={
          <TouchableNativeFeedback
            onPress={() => {
              navigate("address", { address: item });
            }}
            onLongPress={openMenu}
          >
            <Card style={styles.card}>
              <Card.Title
                title={item.label}
                subtitle={item.address}
                left={(props) => (
                  <Image
                    source={{ uri: item.image }}
                    width={30}
                    height={30}
                    style={styles.logo}
                  />
                )}
                right={(props) => (
                  <Ionicons
                    style={styles.chevron}
                    name={"chevron-forward"}
                    size={16}
                  />
                )}
              />
            </Card>
          </TouchableNativeFeedback>
        }
      >
        <Menu.Item onPress={handleDelete} title={t("delete")} />
      </Menu>
    );
  };

  return (
    <ScrollView>
      {arrayAddress.map((item: any) => (
        <RenderMenuItem item={item} key={item.label} />
      ))}
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingLeft: 20,
      paddingRight: 20,
    },
    chevron: {
      textAlignVertical: "center",
      marginRight: 10,
      color: theme.colors.primary,
    },
    menu: { left: "auto", right: 10, marginTop: 60 },
    logo: {
      width: 30,
      height: 30,
      alignSelf: "center",
    },
    card: { margin: 5 },
  });
};

export default AddressList;
