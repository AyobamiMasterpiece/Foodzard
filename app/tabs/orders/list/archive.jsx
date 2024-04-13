import React from 'react'
// import orders from '../../../../assets/food-ordering-asset-bundle/data/orders'

import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
 import OrderItemListItem from '../../../../components/OrderListItem';
import { useOrderList } from '../../../../api/orders';
// console.log(orders);
export default function index() {
   const { data: orders, isLoading, error } = useOrderList({archived:true});
 
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