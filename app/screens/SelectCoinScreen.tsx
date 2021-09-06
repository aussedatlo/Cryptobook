import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Searchbar, Divider, List, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "react-native-paper/lib/typescript/types";

import { IWalletAddress } from "../models/addresses/addresses-model";
import { useStore } from "../models/root-store/root-store-context";
import { ICoin } from "../models/market/market-model";

const SelectCoinScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { navigate } = useNavigation();
  const { market } = useStore();
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleOnPress = (item: ICoin) => {
    const w: IWalletAddress = {
      label: "",
      address: "",
      notes: "",
      image: item.image,
      name: item.name,
      symbol: item.symbol,
    };
    navigate("create", w);
  };

  const renderItem = ({ item }: { item: ICoin }) => {
    return (
      <>
        <List.Item
          title={item.name}
          description={item.symbol.toUpperCase()}
          onPress={() => handleOnPress(item)}
          left={(props) => (
            <Image source={{ uri: item.image }} style={styles.logo} />
          )}
          right={(props) => (
            <Ionicons
              style={styles.chevron}
              name={"chevron-forward"}
              size={16}
            />
          )}
        />
        <Divider />
      </>
    );
  };

  return (
    <View style={styles.root}>
      <Searchbar
        placeholder="Search"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
        style={styles.searchBar}
      />
      <FlatList
        data={market.coins.filter((item: ICoin) => {
          return (
            item.name.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
            item.symbol.toLocaleLowerCase().includes(searchQuery.toLowerCase())
          );
        })}
        renderItem={renderItem}
        keyExtractor={(item: ICoin) => item.id}
      />
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    chevron: {
      textAlignVertical: "center",
      marginRight: 10,
      color: theme.dark ? theme.colors.primary : theme.colors.accent,
    },
    logo: {
      width: 30,
      height: 30,
      alignSelf: "center",
      margin: 5,
    },
    searchBar: {
      alignSelf: "center",
      borderRadius: 0,
    },
  });
};

export default SelectCoinScreen;
