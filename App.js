import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import uuid from "react-native-uuid";
import filter from "lodash.filter";
import { AntDesign } from "@expo/vector-icons";
import RenderData from "./RenderData";

export default function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([
    {
      id: "1",
      name: "Milk",
    },
    {
      id: "2",
      name: "Coffee",
    },
    {
      id: "3",
      name: "Oranges",
    },
    {
      id: "4",
      name: "Bread",
    },
  ]);
  const [fullData, setFullData] = useState([
    {
      id: "1",
      name: "Milk",
    },
    {
      id: "2",
      name: "Coffee",
    },
    {
      id: "3",
      name: "Oranges",
    },
    {
      id: "4",
      name: "Bread",
    },
  ]);

  const AddData = () => {
    if (text !== "") {
      let data_ = [...fullData, { id: uuid.v4(), name: text }];
      setData(() => data_);
      setFullData(data_);
      setText("");
    }
  };
  const RemoveData = (props) => {
    console.log(props);
    setData((prevData) => {
      return prevData.filter((data) => data.id != props);
    });
    setFullData((prevFullData) => {
      return prevFullData.filter((fullData) => fullData.id != props);
    });
  };
  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, (item) => {
      return contains(item.name, formattedQuery);
    });
    setData(filteredData);
  };

  const contains = (name, query) => {
    const lowername = name.toLowerCase();
    if (lowername.includes(query)) {
      return true;
    }
    return false;
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.input}>
        <TextInput
          style={styles.textinput}
          clearButtonMode="always"
          onChangeText={(e) => {
            setText(e);
            handleSearch(e);
          }}
          value={text}
          placeholder="Add or Search"
          autoFocus={true}
        />
        <TouchableHighlight onPress={AddData}>
          <AntDesign name="pluscircleo" size={29} color="green" />
        </TouchableHighlight>
      </View>
      <View style={styles.flatlist}>
        {data !== [] && (
          <FlatList
            data={data}
            renderItem={(info) => (
              <RenderData
                item={info}
                onItemPressed={() => RemoveData(info.item.id)}
              />
            )}
            keyExtractor={(data) => data.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textinput: {
    margin: 5,
    padding: 8,
    paddingLeft: 20,
    width: Dimensions.get("screen").width - 70,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 2,
    borderStyle: "solid",
  },
  flatlist: {
    margin: 15,
  },
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
