import CartProvider from "Providers/cartProvider";
import { Stack } from "expo-router";
import AuthProvider from "@Providers/authProvider";
import QueryProvider from "@Providers/queryProvider";
export default _layout = () => {
  console.log("me");
  return (
    <AuthProvider>
      <QueryProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen
              name="user"
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="tabs"
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="Cart"
              options={{
                presentation: "modal",
              }}
            ></Stack.Screen>

            <Stack.Screen
              name="auth"
              options={{
                headerShown: false,
              }}
            ></Stack.Screen>
          </Stack>
        </CartProvider>
      </QueryProvider>
    </AuthProvider>
  );
};
