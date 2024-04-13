import { View, Text, StyleSheet, FlatList,Pressable, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import orders from '../../../assets/food-ordering-asset-bundle/data/orders'
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import { useOrderDetails, useUpdateOrder } from '../../../api/orders';
import { useState } from 'react';


const OrderDetailScreen = () => {
  const { id } = useLocalSearchParams();
 const {mutate:updateStatus}= useUpdateOrder()


const { data:order,isLoading,error}=useOrderDetails(id)
// const [status,setStatus]=useState(order.status)
// console.log(status,status);
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
        ListFooterComponent={()=>{
          return  <>
  <Text style={{ fontWeight: 'bold' }}>Status</Text>
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {['New','Cooking','Delivering','Delivered'].map((statusItem) =>  (
      <Pressable
        key={statusItem}
        onPress={() => {
          updateStatus({id,update:{status:statusItem}})
        }}
        style={{
          borderColor: 'yellow',
          borderWidth: 1,
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
          backgroundColor:
            order.status === statusItem
              ? 'orange'
              : 'transparent',
        }}
      >
        <Text
          style={{
            color:
              order.status === statusItem ? 'white' : 'red',
          }}
        >
          {statusItem}
        </Text>
      </Pressable>
    ))}
  </View>
</>

        }}
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