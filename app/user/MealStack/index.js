import products from "@assets/food-ordering-asset-bundle/data/products";
import { supabase } from "@lib/supabase";
import { Stack } from "expo-router";

import React, { useEffect } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";

import ProductItem from "@components/ProductItem.js";
import { useProductList } from "../../../api/products";
import Button from "../../../components/Button";

export default function Menu() {
  const { data: products, error, loading } = useProductList();
  console.log(products, "tor", error);
  if (loading) {
    return <ActivityIndicator></ActivityIndicator>;
  }
  if (error) {
    <Text>[error]</Text>;
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        // marginTop: 15,
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
      <Button
        text="Sign out"
        onPress={() => {
          supabase.auth.signOut();
        }}
      ></Button>
    </View>
  );
}
