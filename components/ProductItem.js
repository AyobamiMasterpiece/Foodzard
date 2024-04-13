import { Link, useSegments } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Image, Text } from "react-native";
const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";
export default function ProductItem({ product }) {
  const segements = useSegments();
  return (
    <Link href={`/${segements[0]}/MealStack/` + product.id} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: product.image || defaultPizzaImage }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    overflow: "hidden",
    flex: 1,
    margin: 11,
    marginTop: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 18,
    marginVertical: 10,
  },
  price: {
    // color: Colors.light.tint,
    color: "red",
    fontWeight: "bold",
    marginTop: "auto",
  },
});
