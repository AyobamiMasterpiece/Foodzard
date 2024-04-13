import { Link, Stack } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../../components/Button";
import { supabase } from "@lib/supabase";
export default function signUp() {
  const [email, setEmail] = useState("");
  const [isloading, setIsloadig] = useState(false);
  const [password, setPassword] = useState("");
  const HandleSignUp = async () => {
    setIsloadig(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    setIsloadig(false);
    console.log(error);
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: "Create account",
        }}
      ></Stack.Screen>
      <View style={styles.root}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={(e) => {
            setEmail(e);
          }}
          keyboardType="email-address"
          placeholder="ayotibami14@gmail.com"
          style={styles.input}
        ></TextInput>
        <Text style={styles.label}>Password</Text>
        <TextInput
          // keyboardType="visible-password"
          value={password}
          onChangeText={(e) => {
            setPassword(e);
          }}
          placeholder="12345"
          secureTextEntry={true}
          style={styles.input}
        ></TextInput>
        <Button
          text={isloading ? " Creating account" : " Create account"}
          disabled={isloading}
          onPress={HandleSignUp}
        ></Button>
        <Link href={"/auth/"} asChild>
          <Pressable
            android_ripple={{
              color: "white",
              foreground: true,
            }}
            style={{
              alignSelf: "center",
              padding: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Sign in
            </Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: "red",
    padding: 10,
    // alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    // alignSelf: "stretch",
    marginVertical: 15,
  },
  label: {
    fontSize: 15,
  },
});
