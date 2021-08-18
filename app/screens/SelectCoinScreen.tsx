import React, { useEffect, useMemo, useState } from "react";
import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { FlatList, StyleSheet, View, Image } from "react-native";
import axios from "axios";
import { ListItem, SearchBar } from "react-native-elements";

const SelectCoinScreen = () => {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { navigate } = useNavigation();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query: string) => setSearchQuery(query);

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
      <ListItem
        bottomDivider
        onPress={() => {
          navigate("create", { coin: item });
        }}
      >
        <Image source={{ uri: item.image }} style={styles.logo} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.symbol}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View style={styles.root}>
      <SearchBar
        placeholder="Search"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
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
    logo: {
      width: 25,
      height: 25,
    },
  });
};

export default SelectCoinScreen;
