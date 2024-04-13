import products from "@assets/food-ordering-asset-bundle/data/products";

import { Stack } from "expo-router";

import React from "react";
import { Text, View, FlatList } from "react-native";
import { useProductList } from "../../../api/products";
import ProductItem from "@components/ProductItem.js";
import { Skeleton } from "@rneui/base";
console.log(products);
export default function Menu() {
  const { data: products, error, loading } = useProductList();
  console.log(products, "tor", error);
  if (loading) {
    return <Skeleton height={"100%"}></Skeleton>;
  }
  if (error) {
    <Text>[error]</Text>;
  }
  return (
    <View
      style={{
        flex: 1,
        marginTop: 5,
      }}
    >
      <FlatList
        data={products}
        renderItem={({ item }) => {
          return <ProductItem product={item}></ProductItem>;
        }}
        keyExtractor={({ id }) => {
          return id;
        }}
        numColumns={2}
      ></FlatList>
    </View>
  );
}
