import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { useCart } from "@Providers/cartProvider";
import Button from "@components/Button.tsx";
import { Ionicons } from "@expo/vector-icons";

const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
} from "react-native";
import products from "@assets/food-ordering-asset-bundle/data/products";
import { useProduct } from "../../../api/products";
import { Skeleton } from "@rneui/base";

export default function Product() {
  const { id: idString } = useLocalSearchParams();
  const idNumber = Number(idString);
  console.log(idNumber);
  const [size, setSize] = useState("M");
  const { onAddItem } = useCart();
  const { error, isPending, data: product } = useProduct(idNumber);

  if (isPending) {
    return <Skeleton height={"100%"} animation="pulse"></Skeleton>;
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => {
            return (
              <Link href={`/tabs/MealStack/create?id=${idString}`} asChild push>
                <Pressable>
                  <Ionicons
                    name="pencil"
                    size={24}
                    color={"black"}
                    style={{
                      marginRight: 15,
                    }}
                  />
                </Pressable>
              </Link>
            );
          },
        }}
      ></Stack.Screen>

      <View style={{}}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.img}
        ></Image>

        <Text
          style={{
            fontSize: 19,
            marginVertical: 30,
            fontWeight: "bold",
          }}
        >
          Price : {product.price}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    // backgroundColor: "red",
  },
  img: {
    width: "100%",
    aspectRatio: 1,
  },
});
