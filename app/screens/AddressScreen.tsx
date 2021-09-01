import React, { useMemo } from "react";
import { Image, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Clipboard } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTranslation } from "react-i18next";
import {
  Card,
  Button,
  Paragraph,
  Divider,
  IconButton,
  TextInput,
  Surface,
  useTheme,
} from "react-native-paper";

import { RootStackParamList } from "../navigation/RootNavigator";
import { Theme } from "react-native-paper/lib/typescript/types";

type AddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "address"
>;
type AddressScreenRouteProp = RouteProp<RootStackParamList, "address">;
type Props = {
  route: AddressScreenRouteProp;
  navigation: AddressScreenNavigationProp;
};

const AddressScreen = ({ route, navigation }: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [value, setValue] = React.useState<string>("");
  const { t } = useTranslation("common");

  return (
    <ScrollView style={styles.root}>
      <Card style={styles.card}>
        <Card.Title
          title={route.params.address.label}
          subtitle={route.params.address.symbol.toUpperCase()}
          left={(props) => (
            <Image
              source={{ uri: route.params.address.image }}
              style={styles.logo}
            />
          )}
          right={(props) => (
            <IconButton {...props} icon="menu" onPress={() => {}} />
          )}
        />
        <Divider />
        <Card.Content style={styles.cardContent}>
          <Surface style={styles.surface}>
            <QRCode
              value={
                value === ""
                  ? route.params.address.address
                  : route.params.address.address + "?amount=" + value
              }
              backgroundColor="transparent"
              size={300}
              logo={{ uri: route.params.address.image }}
              logoSize={30}
              logoBackgroundColor={theme.colors.background}
            />
          </Surface>
          <Paragraph style={styles.address}>
            {route.params.address.address}
          </Paragraph>
          <Paragraph style={styles.address}>
            {value === "" ? <></> : +t("amount") + ": " + value}
          </Paragraph>
          <Button
            style={styles.button}
            labelStyle={styles.labelButton}
            onPress={() => {
              Clipboard.setString(route.params.address.address);
              ToastAndroid.show(t("copied"), ToastAndroid.SHORT);
            }}
            mode="contained"
          >
            Copy
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title={t("notes")}></Card.Title>
        <Divider />
        <Card.Content>
          <Paragraph>
            {route.params.address.notes === ""
              ? t("emptyNote")
              : route.params.address.notes}
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Title title={t("setAmount")}></Card.Title>
        <Divider />
        <Card.Content>
          <TextInput
            value={value}
            onChangeText={setValue}
            placeholder={t("amount")}
          />
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    cardContent: {
      alignItems: "center",
      margin: 10,
    },
    card: {
      margin: 5,
    },
    logo: {
      width: 50,
      height: 50,
      marginRight: 30,
    },
    address: {
      marginTop: 10,
    },
    button: {
      marginTop: 30,
      width: "70%",
      backgroundColor: theme.colors.accent,
    },
    labelButton: {
      color: theme.dark ? theme.colors.text : theme.colors.background,
    },
    surface: {
      backgroundColor: theme.dark ? theme.colors.text : theme.colors.background,
      elevation: 4,
      padding: 8,
    },
  });
};

export default AddressScreen;
