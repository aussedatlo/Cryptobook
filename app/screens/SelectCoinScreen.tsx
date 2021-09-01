import React, { useEffect, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View, Image } from "react-native";
import { Searchbar, Divider, List, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Theme } from "react-native-paper/lib/typescript/types";

const SelectCoinScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { navigate } = useNavigation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/markets`, {
        params: {
          vs_currency: "usd",
          per_page: 200,
          price_change_percentage: "1h,24h,7d",
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const renderItem = ({ item }: any) => {
    return (
      <>
        <List.Item
          title={item.name}
          description={item.symbol.toUpperCase()}
          onPress={() => {
            navigate("create", { coin: item });
          }}
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
        data={data.filter((item: any) => {
          return (
            item.name.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
            item.symbol.toLocaleLowerCase().includes(searchQuery.toLowerCase())
          );
        })}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
};

const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    root: {
      flex: 1,
    },
    chevron: { textAlignVertical: "center" },
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
