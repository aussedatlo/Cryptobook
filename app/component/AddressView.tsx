import React, { useMemo } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Divider, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";

type Props = {
  title: string;
  address: string;
};

const AddressView = (props: Props) => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.root}>
      <Card style={styles.card}>
        <Card.Title
          title={props.title}
          subtitle={props.address}
          right={() => (
            <Ionicons
              style={styles.chevron}
              name={"chevron-forward"}
              size={16}
            />
          )}
        />
        <Divider />
      </Card>
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    title: {
      alignSelf: "center",
      alignItems: "center",
      margin: 10,
    },
    card: {
      margin: 5,
    },
    chevron: {
      textAlignVertical: "center",
      marginRight: 10,
      color: theme.dark ? theme.colors.primary : theme.colors.accent,
    },
  });
};

export default AddressView;
