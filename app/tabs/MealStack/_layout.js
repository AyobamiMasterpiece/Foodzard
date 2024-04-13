import { Ionicons } from "@expo/vector-icons";
import { Link, Redirect, Stack } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useAuth } from "../../../Providers/authProvider";

export default function _layout() {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return <Redirect href={"/"}></Redirect>;
  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: "Menu",
          headerTitleAlign: "center",
          headerRight: () => {
            return (
              <Link href={"/tabs/MealStack/create"} asChild push>
                <Pressable>
                  <AntDesign
                    name="plus"
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
      <Stack.Screen name="[id]" options={{}}></Stack.Screen>
      <Stack.Screen name="create" options={{}}></Stack.Screen>
    </Stack>
  );
}
