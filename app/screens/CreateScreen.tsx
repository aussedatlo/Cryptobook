import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { View, StyleSheet, Vibration, Image, ToastAndroid } from "react-native";
import {
  RouteProp,
  useNavigation,
  CommonActions,
} from "@react-navigation/native";
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
  const isModification = route.params.label !== "";

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isModification ? t("edit") : t("create"),
    });
  }, [isModification]);

  useEffect(() => {
    setLabel(route.params.label);
    setNotes(route.params.notes);
    setAddress(route.params.address);
  }, [route.params]);

  const handlePress = async () => {
    Vibration.vibrate(50);
    const w: IWalletAddress = {
      address: address,
      notes: notes,
      label: label,
      name: route.params.name,
      symbol: route.params.symbol,
      image: route.params.image,
    };

    if (w.label === "") {
      ToastAndroid.show(t("errorLabelEmpty"), ToastAndroid.SHORT);
      return;
    }

    if (w.address === "") {
      ToastAndroid.show(t("errorAddressEmpty"), ToastAndroid.SHORT);
      return;
    }

    // Check if other address exist with this label
    if (w.label !== route.params.label && addresses.exist(w.label)) {
      ToastAndroid.show(t("errorAlreadyExist"), ToastAndroid.SHORT);
      return;
    }

    try {
      if (isModification) {
        addresses.replace(route.params, w);
        ToastAndroid.show(t("edited"), ToastAndroid.SHORT);
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "main" }, { name: "address", params: w }],
          })
        );
      } else {
        addresses.addAddress(w);
        ToastAndroid.show(t("created"), ToastAndroid.SHORT);
        navigate("main");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Card.Title
          title={route.params.name}
          subtitle={route.params.symbol.toUpperCase()}
          left={(props) => (
            <Image source={{ uri: route.params.image }} style={styles.logo} />
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
            right={
              <TextInput.Icon
                name="barcode-scan"
                size={20}
                onPress={() => {
                  navigation.navigate("scanner", {
                    onGoBack: (address: string) => setAddress(address),
                  });
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
        </Card.Content>
        <Button
          style={styles.button}
          labelStyle={styles.labelButton}
          onPress={handlePress}
          mode="contained"
        >
          {isModification ? t("edit") : t("create")}
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
