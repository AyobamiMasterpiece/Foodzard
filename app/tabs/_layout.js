import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarStyle: {
          backgroundColor: "orange",
        },
      }}
    >
      <Tabs.Screen
        name="MealStack"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="cutlery" size={24} color={color} />;
          },
          tabBarLabel: "Menu",
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="orders"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <Ionicons name="list" size={25} color={color}></Ionicons>;
          },
        }}
      ></Tabs.Screen>
      {/* <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      ></Tabs.Screen> */}
    </Tabs>
  );
}
