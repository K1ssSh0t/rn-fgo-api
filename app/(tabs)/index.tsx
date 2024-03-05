import { Pressable, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import { Input, SearchBar } from "@rneui/themed";
import { SetStateAction, useEffect, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function TabOneScreen() {
  const [search, setSearch] = useState("");

  const [data, setData] = useState<any>();

  const [filteredData, setFilteredData] = useState(data);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const URL =
    "https://api.atlasacademy.io/export/JP/basic_servant_lang_en.json";

  const updateSearch = (search: SetStateAction<string>) => {
    setSearch(search);
  };

  const filterList = (item: string) => {
    if (data) {
      const newList = data.filter(
        (val: { name: string }) =>
          val.name.toLocaleLowerCase().indexOf(item.toLocaleLowerCase()) >= 0
      );
      setFilteredData(newList);
    }
  };

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const json = response.json();
      setData(await json);
      setFilteredData(await json);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(URL);
  }, []);

  useEffect(() => {
    if (search !== null) {
      filterList(search);
    }
  }, [search]);

  return (
    <View style={styles.container}>
      <Input
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <View style={{ flex: 1 }}>
        <FlashList
          data={filteredData}
          renderItem={({ item }: any) => {
            return (
              <Pressable
                style={{
                  marginHorizontal: 10,
                  marginVertical: 5,
                  backgroundColor: "#F3F0F0",
                  padding: 10,
                  borderRadius: 5,
                  flex: 1,
                  flexDirection: "row",
                }}
                onPress={() => {
                  router.push({
                    pathname: "/servant/[collectionNo]",
                    params: { collectionNo: item.collectionNo },
                  });
                }}
              >
                <Image
                  style={{ width: 50, height: 50 }}
                  source={item.face}
                  contentFit="contain"
                  transition={1000}
                  placeholder={blurhash}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    Name: {item.name}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      textTransform: "capitalize",
                    }}
                  >
                    Class: {item.className}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          estimatedItemSize={200}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
