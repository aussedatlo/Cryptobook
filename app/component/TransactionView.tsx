import React, { useMemo } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Card, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";
import { IBlockchainTsx } from "../models/blockchain/blockchain-btc-model";
import { useTranslation } from "react-i18next";

type Props = {
  data: IBlockchainTsx;
};

const TransactionView = ({ data }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t } = useTranslation("common");
  const date = new Date(data.received);

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <View style={styles.cardView}>
          <Ionicons
            style={styles.icon}
            name={
              data.input == 0
                ? "arrow-up-circle-outline"
                : "arrow-down-circle-outline"
            }
            size={30}
          />
          <View style={styles.textView}>
            <Text style={styles.date}>
              {date.toLocaleDateString() + " " + date.toLocaleTimeString()}
            </Text>
            <Text style={styles.text}>
              {data.input == 0 ? t("send") : t("reicive")}
            </Text>
          </View>
          <View>
            <Text style={styles.value}>
              {data.input == 0 ? "-" + data.output : "+" + data.input}
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    icon: {
      margin: 10,
      color: theme.colors.backdrop,
    },
    date: {
      color: theme.colors.text,
    },
    card: {
      margin: 5,
    },
    cardView: {
      alignSelf: "center",
      alignItems: "center",
      display: "flex",
      flexDirection: "row",
    },
    textView: {
      flex: 1,
    },
    text: {
      color: theme.colors.backdrop,
    },
    value: { marginRight: 10, color: theme.colors.text },
  });
};

export default TransactionView;
