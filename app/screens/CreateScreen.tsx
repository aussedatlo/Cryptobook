import React, { useMemo, useState } from "react";
import { View, StyleSheet, Vibration, Image, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicon from "react-native-vector-icons/Ionicons";
import {
  RouteProp,
  Theme,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { addAddress } from "../utils/Storage";
import { WalletAddress } from "../types/WalletAddress";
import { RootStackParamList } from "../navigation/RootNavigator";
import { ListItem } from "react-native-elements/dist/list/ListItem";

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
      <ListItem />
      <View style={styles.title}>
        <Image source={{ uri: route.params.coin.image }} style={styles.logo} />
        <Text style={styles.coinName}>{route.params.coin.name}</Text>
        <Text style={styles.coinSymbol}>
          {route.params.coin.symbol.toUpperCase()}
        </Text>
      </View>
      <Input
        placeholder={t("label")}
        // placeholder="Edit Label"
        leftIcon={
          <Icon name="tag-text-outline" size={20} style={styles.iconLeft} />
        }
        value={label}
        onChangeText={setLabel}
      />

      <Input
        placeholder={t("walletAddress")}
        // placeholder="Edit Address"
        leftIcon={
          <Ionicon name="qr-code-sharp" size={20} style={styles.iconLeft} />
        }
        rightIcon={<Ionicon name="camera-outline" size={20} />}
        value={address}
        onChangeText={setAddress}
      />

      <Input
        placeholder={t("notes")}
        // placeholder="Edit Notes"
        leftIcon={
          <Icon name="note-text-outline" size={20} style={styles.iconLeft} />
        }
        value={notes}
        onChangeText={setNotes}
      />

      <Button
        title="Create"
        buttonStyle={styles.button}
        onPress={handlePress}
      />
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
      width: "80%",
      marginTop: 30,
      alignSelf: "center",
      marginBottom: 15,
    },
    iconLeft: {
      marginRight: 10,
    },
    logo: {
      width: 50,
      height: 50,
    },
    title: {
      alignSelf: "center",
      alignItems: "center",
      marginBottom: 10,
    },
    coinName: {
      fontSize: 30,
    },
    coinSymbol: {
      fontSize: 20,
    },
  });
};

export default CreateScreen;
