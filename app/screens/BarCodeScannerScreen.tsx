import React, { useState, useEffect, useMemo } from "react";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Theme } from "react-native-paper/lib/typescript/types";
import { useTheme, Button } from "react-native-paper";
import { CommonActions, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { cast } from "mobx-state-tree";

import { RootStackParamList } from "../navigation/RootNavigator";
import { IWallet } from "../models/wallets/wallets-model";

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "scanner"
>;
type AddressScreenRouteProp = RouteProp<RootStackParamList, "scanner">;
type Props = {
  route: AddressScreenRouteProp;
  navigation: AddressScreenNavigationProp;
};

const BarCodeScannerScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState<boolean>(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    const routes: any = navigation.getState().routes;
    const back: any = routes[routes.length - 2];

    let newAddress: Array<string> = [];
    for (let a of back.params.address) {
      newAddress.push(a);
    }
    newAddress[route.params.index] = data;

    const w: IWallet = {
      id: back.params.id,
      label: back.params.label,
      image: back.params.image,
      name: back.params.name,
      notes: back.params.notes,
      symbol: back.params.symbol,
      address: cast(newAddress),
    };

    navigation.dispatch(
      CommonActions.navigate({
        name: back.name,
        params: w,
      })
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.root}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.scanner}
      />
      {scanned && (
        <Button style={styles.button} onPress={() => setScanned(false)}>
          {t("scan")}
        </Button>
      )}
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
    },
    scanner: {
      height: "100%",
      width: "100%",
    },
  });
};

export default BarCodeScannerScreen;
