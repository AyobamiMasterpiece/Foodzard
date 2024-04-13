import { createContext, useContext, useState } from "react";

export const cartContext = createContext({});
import * as Crypto from "expo-crypto";
import { useInsertOrders } from "api/orders";
import { useInsertOrderItems } from "api/orderItems/orderItems";
import { useRouter } from "expo-router";

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const router = useRouter();

  const { mutate: insertOrder } = useInsertOrders();
  const { mutate: InsertOrderItems } = useInsertOrderItems();

  const addItem = (product, size) => {
    const existingitem = items.find(
      (item) => item.product == product && size == item.size
    );
    if (existingitem) {
      updateQuantity(existingitem.id, 1);
      return;
    }
    const obj = {
      id: Crypto.randomUUID(),
      product: product,
      productId: product.id,
      size,
      quantity: 1,
    };
    setItems([obj, ...items]);
  };
  const updateQuantity = (idquantity, num) => {
    const food = items
      .map((item) => {
        return item.id == idquantity
          ? { ...item, quantity: item.quantity + num }
          : item;
      })
      .filter((item) => item.quantity >= 0);
    setItems(food);
  };
  const totalPrice = items.reduce((sum, item) => {
    return item.product.price * item.quantity + sum;
  }, 0);
  return (
    <cartContext.Provider
      value={{
        items,
        onAddItem: addItem,
        updateQuantity: updateQuantity,
        totalPrice: totalPrice,
        checkOut: () => {
          insertOrder(
            {
              total: totalPrice,
            },
            {
              onSuccess: (order) => {
                const orderItems = items.map((item1) => {
                  return {
                    order_id: order.id,
                    product_id: item1.productId,
                    quantity: item1.quantity,
                    size: item1.size,
                  };
                });
                InsertOrderItems(orderItems, {
                  onSuccess() {
                    router.push("/user/orders/" + order.id);
                    setItems([]);
                  },
                });
              },
            }
          );
        },
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
export const useCart = () => {
  return useContext(cartContext);
};
export default CartProvider;
