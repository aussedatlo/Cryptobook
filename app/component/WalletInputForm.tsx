import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, ToastAndroid } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, IconButton, TextInput, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "react-native-paper/lib/typescript/types";

import { IWallet } from "../models/wallets/wallets-model";

type Props = {
  buttonText: string;
  wallet: IWallet;
  onSubmit: (label: string, address: Array<string>, notes: string) => void;
};

const WalletInputForm = (props: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [nbAddress, setNbAddress] = useState<number>(1);
  const [label, setLabel] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [address, setAddress] = useState<Array<string>>([]);
  const navigation = useNavigation();
  const { t } = useTranslation("common");

  useEffect(() => {
    setLabel(props.wallet.label);
    setNotes(props.wallet.notes);

    let newArray: Array<string> = [];
    for (let a of props.wallet.address) {
      newArray.push(a);
    }
    setAddress(newArray);
    setNbAddress(props.wallet.address.length);
  }, [props.wallet]);

  const checkValues = () => {
    if (label === "") {
      ToastAndroid.show(t("errorLabelEmpty"), ToastAndroid.SHORT);
      return false;
    }

    for (let a of address) {
      if (a === "") {
        ToastAndroid.show(t("errorAddressEmpty"), ToastAndroid.SHORT);
        return false;
      }
    }

    return true;
  };

  const handleAddressChange = (index: number, value: string) => {
    console.log("handleAddressChange: " + value + " " + index);
    let newArray: Array<string> = address;
    newArray[index] = value;
    setAddress(newArray);
    navigation.setParams({ address: newArray });
  };

  const handleDeleteAddress = (index: number) => {
    setNbAddress(nbAddress - 1);
    setAddress(address.filter((item, itemIndex) => itemIndex !== index));
  };

  const handleAddAddress = () => {
    setNbAddress(nbAddress + 1);
    let newArray: Array<string> = address;
    newArray.push("");
    setAddress(newArray);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder={t("label")}
        left={<TextInput.Icon name="label-outline" size={20} />}
        value={label}
        onChangeText={setLabel}
      />

      {[...Array(nbAddress)].map((x, index) => (
        <View style={styles.viewInput} key={index}>
          <TextInput
            mode={"outlined"}
            style={styles.inputAddress}
            label={"address " + (index + 1)}
            placeholder={t("walletAddress")}
            left={
              <TextInput.Icon
                name="barcode-scan"
                style={styles.icon}
                size={20}
                onPress={() => {
                  navigation.setParams({ label: label, notes: notes });
                  navigation.navigate("scanner", { index: index });
                }}
              />
            }
            right={
              <TextInput.Icon
                name="delete"
                style={styles.icon}
                size={20}
                onPress={() => {
                  handleDeleteAddress(index);
                }}
              />
            }
            value={address[index]}
            onChangeText={(value) => handleAddressChange(index, value)}
          />
        </View>
      ))}

      <Button
        style={styles.button}
        labelStyle={styles.labelButton}
        onPress={handleAddAddress}
        mode="contained"
      >
        {t("addAddress")}
      </Button>

      <TextInput
        style={styles.input}
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
    input: {
      marginBottom: 5,
    },
    inputAddress: {
      flex: 1,
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
    viewInput: {
      alignItems: "center",
      flexDirection: "row",
    },
    icon: {
      margin: 0,
    },
  });
};

export default WalletInputForm;
