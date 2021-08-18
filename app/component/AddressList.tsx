import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Image } from "react-native";
import { ListItem } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { WalletAddress } from "../types/WalletAddress";

type Props = {
  data: Array<WalletAddress>;
};

const AddressList = ({ data }: Props) => {
  const { navigate } = useNavigation();

  const renderItem = ({ item }: any) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => {
          navigate("address", { id: item.label });
        }}
      >
        <Image
          source={{ uri: item.image }}
          width={30}
          height={30}
          style={{ width: 30, height: 30 }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.label}</ListItem.Title>
          <ListItem.Subtitle>{item.address}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.label}
      />
    </View>
  );
};

export default AddressList;
