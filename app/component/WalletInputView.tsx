import React, { useMemo } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Divider, useTheme } from "react-native-paper";

import { Theme } from "react-native-paper/lib/typescript/types";
import WalletInputForm from "../component/WalletInputForm";
import { IWallet } from "../models/wallets/wallets-model";

type Props = {
  wallet: IWallet;
  buttonText: string;
  onSubmit: (label: string, address: Array<string>, notes: string) => void;
};

const WalletInputView = (props: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Card.Title
          title={props.wallet.name}
          subtitle={props.wallet.symbol.toUpperCase()}
          left={() => (
            <Image source={{ uri: props.wallet.image }} style={styles.logo} />
          )}
        />
        <Divider />
        <Card.Content style={styles.cardContent}>
          <WalletInputForm
            wallet={props.wallet}
            buttonText={props.buttonText}
            onSubmit={props.onSubmit}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    logo: {
      width: 50,
      height: 50,
    },
    title: {
      alignSelf: "center",
      alignItems: "center",
      margin: 10,
    },
    card: {
      margin: 5,
    },
    cardContent: {
      marginTop: 30,
    },
  });
};

export default WalletInputView;
