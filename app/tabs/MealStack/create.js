import Button from "@components/Button";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import {
  useDeleteProduct,
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "api/products";
import { Skeleton } from "@rneui/base";
export default function Create() {
  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { mutate: DeleteProduct, isPending } = useDeleteProduct();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const { id } = useLocalSearchParams();
  const { data: updatedProducts } = useProduct(id);
  console.log(updatedProducts);
  const isUpdating = Boolean(id);
  useEffect(() => {
    if (updatedProducts) {
      console.log("God");
      setName(updatedProducts.name);
      setPrice(updatedProducts.price);
      setImage(updatedProducts.image);
    }
  }, [updatedProducts]);
  if (isPending) {
    return <Skeleton height={"70%"}></Skeleton>;
  }

  const handleImageChange = () => {
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    pickImage();
  };
  const onSubmit = () => {
    if (isUpdating) {
      update();
    } else {
      create();
    }
  };
  const update = () => {
    updateProduct(
      {
        id: Number(id),

        name,
        price: parseFloat(price),
        image,
      },
      {
        onSuccess: () => {
          console.log("papa");
          router.back();
        },
      }
    );
  };
  const create = () => {
    insertProduct(
      {
        name,
        price: parseFloat(price),

        image,
      },
      {
        onSuccess: () => {
          router.back();
        },
      }
    );
  };
  const deleteFunc = () => {
    DeleteProduct(Number(id), {
      onSuccess: () => {
        router.replace("/tabs");
      },
    });
  };
  const onConfirmDelete = () => {
    Alert.alert("Confirm Delete", "Are you sure you wanna delete", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: deleteFunc,
      },
    ]);
  };
  return (
    <>
      <Stack.Screen
        options={{
          title: isUpdating ? "Update Product" : "Create Product",
        }}
      ></Stack.Screen>
      <ScrollView
        style={styles.root}
        contentContainerStyle={{
          justifyContent: "center",
        }}
      >
        <StatusBar style="dark"></StatusBar>
        <Pressable onPress={handleImageChange}>
          <Image
            source={{
              uri:
                image ||
                "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
            }}
            style={styles.img}
          ></Image>
          <Text
            style={{
              fontSize: 20,
              alignSelf: "center",
              marginVertical: 20,
            }}
          >
            Select Image
          </Text>
        </Pressable>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          placeholder="Name"
          onChangeText={(e) => {
            setName(e);
          }}
        ></TextInput>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          placeholder="9.99"
          keyboardType="numeric"
          value={String(price)}
          onChangeText={(e) => {
            setPrice(e);
          }}
        ></TextInput>
        <Button
          text={isUpdating ? "Update" : "Create"}
          onPress={onSubmit}
        ></Button>
        {isUpdating && (
          <Button
            text="Delete"
            onPress={onConfirmDelete}
            stylearr={{
              backgroundColor: "red",
            }}
          ></Button>
        )}
      </ScrollView>
    </>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,

    padding: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginTop: 7,
    marginBottom: 20,
  },
  img: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
});
