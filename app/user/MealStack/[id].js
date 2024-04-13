import { Stack, router, useLocalSearchParams } from "expo-router";
import React, { useContext, useState } from "react";
import { useCart } from "@Providers/cartProvider";
import Button from "@components/Button.tsx";
import {
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";
import products from "@assets/food-ordering-asset-bundle/data/products";
import { useProduct } from "../../../api/products";
import { Skeleton } from "@rneui/base";

const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

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
        }}
      ></Stack.Screen>

      <View style={{}}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.img}
        ></Image>
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          Select size
        </Text>
        <ScrollView
          horizontal={true}
          contentContainerStyle={{
            justifyContent: "space-around",

            flex: 1,
          }}
        >
          {["S", "M", "L", "XL"].map((item) => {
            return (
              <Pressable
                onPress={() => {
                  setSize(item);
                }}
                key={item}
                style={{
                  padding: 10,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  width: 50,
                  aspectRatio: 1,
                  backgroundColor: size == item ? "gainsboro" : "transparent",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: size == item ? "grey" : "black",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <Text
          style={{
            fontSize: 19,
            marginVertical: 30,
            fontWeight: "bold",
          }}
        >
          Price : {product.price}
        </Text>
        <Button
          text="Add to cart"
          onPress={() => {
            onAddItem(product, size);
            router.navigate("/Cart");
          }}
        ></Button>
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
