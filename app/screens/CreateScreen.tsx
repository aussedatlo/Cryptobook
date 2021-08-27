import React, { useMemo, useState } from "react";
import { View, StyleSheet, Vibration, Image, Text } from "react-native";
import {
  RouteProp,
  Theme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Button, TextInput } from "react-native-paper";

import { addAddress } from "../utils/Storage";
import { WalletAddress } from "../types/WalletAddress";
import { RootStackParamList } from "../navigation/RootNavigator";

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

  const handlePress = async () => {
    Vibration.vibrate(50);
    const w: WalletAddress = {
      address: address,
      notes: notes,
      label: label,
      symbol: route.params.coin.symbol,
      image: route.params.coin.image,
    };

    try {
      await addAddress(w);
      navigate("main");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.title}>
        <Image source={{ uri: route.params.coin.image }} style={styles.logo} />
        <Text style={styles.coinName}>{route.params.coin.name}</Text>
        <Text style={styles.coinSymbol}>
          {route.params.coin.symbol.toUpperCase()}
        </Text>
      </View>
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

      <Button style={styles.button} onPress={handlePress} mode="contained">
        {t("create")}
      </Button>
    </View>
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
    button: {
      marginTop: 30,
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
  });
};

export default CreateScreen;
