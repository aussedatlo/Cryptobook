import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, Theme, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../navigation/RootNavigator";

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

  return (
    <View style={styles.root}>
      <Text>{route.params.id}</Text>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
  });
};

export default AddressScreen;
