import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import orders from '../../../assets/food-ordering-asset-bundle/data/orders'
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { useOrderDetails } from '../../../api/orders';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from "@lib/supabase";
const OrderDetailScreen = () => {
   const queryClient=useQueryClient()
   const { id } = useLocalSearchParams();
  useEffect(() => {
  const orders = supabase
    .channel('custom-filter-channel')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${id}`,
      },
      (payload) => {
          queryClient.invalidateQueries(['orders',id])
      }
    )
    .subscribe();

  return () => {
    orders.unsubscribe();
  };
}, []);
 
      const { data:order,isLoading,error}=useOrderDetails(id)
      if (isLoading) {
        return <ActivityIndicator></ActivityIndicator>
      }
      if (error) {
        return <Text>filed to fetch</Text>
      }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_item}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;