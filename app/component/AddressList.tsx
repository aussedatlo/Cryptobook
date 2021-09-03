import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, TouchableNativeFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Menu, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";
import { observer } from "mobx-react-lite";

import { useStore } from "../models/root-store/root-store-context";
import { IWalletAddress } from "../models/addresses/addresses-model";

const AddressList = () => {
  const { navigate } = useNavigation();
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { addresses } = useStore();

  const RenderMenuItem = ({ item }: { item: IWalletAddress }) => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          navigate("address", item);
        }}
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
    );
  };

  return (
    <ScrollView>
      {addresses.addresses.map((item: any) => (
        <RenderMenuItem item={item} key={item.label} />
      ))}
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    chevron: {
      textAlignVertical: "center",
      marginRight: 10,
      color: theme.dark ? theme.colors.primary : theme.colors.accent,
    },
    logo: {
      width: 30,
      height: 30,
      alignSelf: "center",
    },
    card: { margin: 5 },
  });
};

export default observer(AddressList);
