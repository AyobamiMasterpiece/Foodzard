import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => {
          return (
            <Link href={"../../../Cart"} asChild push>
              <Pressable>
                <Ionicons
                  name="cart"
                  size={35}
                  color={"black"}
                  style={{ marginRight: 15 }}
                ></Ionicons>
              </Pressable>
            </Link>
          );
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Menu",
          headerTitleAlign: "center",
        }}
      ></Stack.Screen>
    </Stack>
  );
}
