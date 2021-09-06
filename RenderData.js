import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function RenderData(props) {
  const item = props.item.item;
  return (
    <View style={styles.itemlist} key={item.id}>
      <Text style={styles.itemlist_text}>{item.name}</Text>
      <TouchableHighlight onPress={props.onItemPressed}>
        <AntDesign name="delete" size={24} color="red" />
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  itemlist: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    padding: 10,
    paddingBottom: 5,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  itemlist_text: {
    fontSize: 20,
  },
});
