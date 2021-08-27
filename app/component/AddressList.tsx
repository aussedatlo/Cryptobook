import React, { useMemo } from "react";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { Image, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { WalletAddress } from "../types/WalletAddress";
import { Divider, List, Menu } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  data: Array<WalletAddress>;
};

const AddressList = ({ data }: Props) => {
  const { navigate } = useNavigation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t } = useTranslation("common");

  const RenderMenuItem = ({ item }: any) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    return (
      <Menu
        key={item.id}
        visible={visible}
        onDismiss={closeMenu}
        style={styles.menu}
        anchor={
          <List.Item
            title={item.label}
            description={item.address}
            onPress={() => {
              navigate("address", { id: item.label });
            }}
            onLongPress={openMenu}
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
        }
      >
        <Menu.Item onPress={() => {}} title={t("delete")} />
      </Menu>
    );
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>{t("addresses")}</List.Subheader>
        <Divider />
        {data.map((item: any) => (
          <RenderMenuItem item={item} />
        ))}
      </List.Section>
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.card,
      paddingLeft: 20,
      paddingRight: 20,
    },
    chevron: { textAlignVertical: "center" },
    menu: { left: "auto", right: 10, marginTop: 60 },
    logo: {
      width: 30,
      height: 30,
      alignSelf: "center",
    },
  });
};

export default AddressList;
