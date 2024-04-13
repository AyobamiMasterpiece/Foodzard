import { cartContext, useCart } from "Providers/cartProvider";
import { Stack } from "expo-router";
import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import CartListItem from "@components/CartListItem.js";
import Button from "@components/Button";
export default function Cart() {
  const { items, totalPrice } = useContext(cartContext);
  const { checkOut } = useCart();
  if (items.length == 0) {
    return (
      <View
        style={{
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Seems you have no items here yet!
        </Text>
      </View>
    );
  }
  return (
    <View
      style={
        {
          // backgroundColor: "yellow",
          //flex: 1,
        }
      }
    >
      <FlatList
        data={items}
        renderItem={({ item }) => {
          return <CartListItem cartItem={item}></CartListItem>;
        }}
        contentContainerStyle={{
          padding: 10,
          gap: 10,
          // backgroundColor: "red",
          // marginBottom: 0,
          // flex: 0,
        }}
      ></FlatList>
      <View
        style={{
          // backgroundColor: "green",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Total Price : {totalPrice.toFixed(2)}
        </Text>
        <Button
          text="Checkout"
          onPress={() => {
            checkOut();
          }}
        ></Button>
      </View>
    </View>
  );
}
