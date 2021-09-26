import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "react-native-paper/lib/typescript/types";

import { IWallet } from "../models/wallets/wallets-model";

type Props = {
  buttonText: string;
  wallet: IWallet;
  onSubmit: (label: string, address: string, notes: string) => void;
};

const WalletInputForm = (props: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [label, setLabel] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const navigation = useNavigation();
  const { t } = useTranslation("common");

  useEffect(() => {
    setLabel(props.wallet.label);
    setNotes(props.wallet.notes);
    setAddress(props.wallet.address);
  }, [props.wallet]);

  const checkValues = () => {
    if (label === "") {
      ToastAndroid.show(t("errorLabelEmpty"), ToastAndroid.SHORT);
      return false;
    }

    if (address === "") {
      ToastAndroid.show(t("errorAddressEmpty"), ToastAndroid.SHORT);
      return false;
    }

    return true;
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder={t("label")}
        left={<TextInput.Icon name="label-outline" size={20} />}
        value={label}
        onChangeText={setLabel}
      />

      <TextInput
        style={styles.textInput}
        placeholder={t("walletAddress")}
        left={<TextInput.Icon name="qrcode" size={20} />}
        right={
          <TextInput.Icon
            name="barcode-scan"
            size={20}
            onPress={() => {
              navigation.setParams({ label: label, notes: notes });
              navigation.navigate("scanner");
            }}
          />
        }
        value={address}
        onChangeText={setAddress}
      />

      <TextInput
        style={styles.textInput}
        placeholder={t("notes")}
        left={<TextInput.Icon name="note-outline" size={20} />}
        value={notes}
        onChangeText={setNotes}
      />
      <Button
        style={styles.button}
        labelStyle={styles.labelButton}
        onPress={() => {
          const ret: boolean = checkValues();
          if (ret) {
            props.onSubmit(label, address, notes);
          }
        }}
        mode="contained"
      >
        {props.buttonText}
      </Button>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    textInput: {
      marginBottom: 5,
    },
    button: {
      marginTop: 30,
      marginBottom: 30,
      width: "70%",
      backgroundColor: theme.colors.accent,
      alignSelf: "center",
    },
    labelButton: {
      color: theme.dark ? theme.colors.text : theme.colors.background,
    },
  });
};

export default WalletInputForm;
