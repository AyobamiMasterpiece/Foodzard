import { Redirect, Stack } from "expo-router";
import React, { useContext } from "react";
import { authContext } from "../../Providers/authProvider";

export default function Auth() {
  const { sessions } = useContext(authContext);
  if (sessions) {
    return <Redirect href={"/"}></Redirect>;
  }
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Sign in",
        }}
      ></Stack.Screen>
    </Stack>
  );
}
