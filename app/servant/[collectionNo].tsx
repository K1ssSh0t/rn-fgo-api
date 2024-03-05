import { View, Text } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { Image } from "expo-image";
import Carousel from "react-native-reanimated-carousel";
import { Dimensions } from "react-native";

export default function servant() {
  const { collectionNo } = useLocalSearchParams();
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const [data, setData] = useState<any>();
  const [servantAscension, setServantAscension] = useState<any>();
  const [servantCostumes, setServantCostumes] = useState<any>();
  const fetchData = async (url: string) => {
    try {
      await fetch(url)
        .then((response) => response.json())
        .then((fetchData) => {
          setData(fetchData);
          setServantAscension(fetchData.extraAssets.charaGraph.ascension);
          setServantCostumes(fetchData.extraAssets.charaGraph.costume);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(
      `https://api.atlasacademy.io/nice/JP/servant/${collectionNo}?lore=true&lang=en`
    );
  }, []);

  const setImages = () => {
    if (servantAscension != undefined) {
      const data = Object.values(servantAscension);
      if (servantCostumes != undefined) {
        return data.concat(Object.values(servantCostumes));
      }
      return data;
    } else {
      return [];
    }
  };

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{data?.name}</Text>
        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoText}>Class: </Text>
          <Text style={styles.cardInfoText}> {data?.className}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoText}>Rarity: </Text>
          <Text style={styles.cardInfoText}> {data?.rarity}</Text>
          {null}
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoText}>CV: </Text>
          <Text style={styles.cardInfoText}> {data?.profile?.cv}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoText}>Illustrator: </Text>
          <Text style={styles.cardInfoText}> {data?.profile?.illustrator}</Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {servantAscension != undefined && (
          <Carousel
            width={width}
            loop={false}
            mode="horizontal-stack"
            snapEnabled={true}
            modeConfig={{
              snapDirection: "left",
              stackInterval: 18,
              rotateZDeg: 180,
            }}
            style={{
              width: width,

              justifyContent: "center",
              alignItems: "center",
            }}
            data={setImages()}
            scrollAnimationDuration={1000}
            renderItem={({ index, item }) => (
              <View key={index} style={styles.page}>
                <Image
                  style={{ flex: 1, width: "100%" }}
                  source={item as string}
                  contentFit="contain"
                  transition={1000}
                ></Image>
              </View>
            )}
          ></Carousel>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  cardInfoText: {
    fontSize: 14,
    textTransform: "capitalize",
  },
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  separator: {
    marginVertical: 5,
    height: 1,
    width: "80%",
  },
});
