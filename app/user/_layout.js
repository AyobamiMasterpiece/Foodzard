import { Redirect, Tabs } from "expo-router";
import React, { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { authContext } from "../../Providers/authProvider";

export default function _layout() {
  const { sessions } = useContext(authContext);
  if (!sessions) {
    return <Redirect href={"/auth/"} />;
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "orange",
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
