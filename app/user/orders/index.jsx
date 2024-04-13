import React from 'react'

import { ActivityIndicator, FlatList, StyleSheet, View,Text } from 'react-native';
import OrderItemListItem from '../../../components/OrderListItem';
import { useMyOrders } from '../../../api/orders';

// console.log(orders);
export default function index() {
  const { data: orders, isLoading, error } = useMyOrders();

if (isLoading) {
  return <ActivityIndicator />;
}
if (error) {
  return <Text>Failed to fetch</Text>;
}
  return (
    <View style={styles.root}>
    <FlatList 
    data={orders}
    renderItem={({item})=>{
    
     return <OrderItemListItem order={item}></OrderItemListItem>
    }}
    ></FlatList>
    </View>
  )
}
const styles=StyleSheet.create({
    root:{
        flex:1,
        padding:10,
        // backgroundColor:'red'
    }
})