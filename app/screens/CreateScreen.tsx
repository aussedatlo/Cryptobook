import React, { useMemo, useState } from "react";
import { View, StyleSheet, Vibration, Image, ToastAndroid } from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Button, Card, Divider, TextInput, useTheme } from "react-native-paper";

import { RootStackParamList } from "../navigation/RootNavigator";
import { Theme } from "react-native-paper/lib/typescript/types";
import { IWalletAddress } from "../models/addresses/addresses-model";
import { useStore } from "../models/root-store/root-store-context";

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "create"
>;
type AddressScreenRouteProp = RouteProp<RootStackParamList, "create">;
type Props = {
  route: AddressScreenRouteProp;
  navigation: AddressScreenNavigationProp;
};

const CreateScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [label, setLabel] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const { navigate } = useNavigation();
  const { t } = useTranslation("common");
  const { addresses } = useStore();

  const handlePress = async () => {
    Vibration.vibrate(50);
    const w: IWalletAddress = {
      address: address,
      notes: notes,
      label: label,
      symbol: route.params.coin.symbol,
      image: route.params.coin.image,
    };

    try {
      addresses.addAddress(w);
      ToastAndroid.show(t("created"), ToastAndroid.SHORT);
      navigate("main");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Card.Title
          title={route.params.coin.name}
          subtitle={route.params.coin.symbol.toUpperCase()}
          left={(props) => (
            <Image
              source={{ uri: route.params.coin.image }}
              style={styles.logo}
            />
          )}
        />
        <Divider />
        <Card.Content style={styles.cardContent}>
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
            right={<TextInput.Icon name="barcode-scan" size={20} />}
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
        </Card.Content>
        <Button
          style={styles.button}
          labelStyle={styles.labelButton}
          onPress={handlePress}
          mode="contained"
        >
          {t("create")}
        </Button>
      </Card>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
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
    logo: {
      width: 50,
      height: 50,
    },
    title: {
      alignSelf: "center",
      alignItems: "center",
      margin: 10,
    },
    coinName: {
      fontSize: 30,
    },
    coinSymbol: {
      fontSize: 20,
    },
    textInput: {
      marginBottom: 5,
    },
    card: {
      margin: 5,
    },
    cardContent: {
      marginTop: 30,
    },
  });
};

export default CreateScreen;
