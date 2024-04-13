import React, { useEffect } from 'react'

import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import OrderItemListItem from '@components/OrderListItem';
import { useOrderList } from '../../../../api/orders';
import { err } from 'react-native-svg';
import { supabase } from "@lib/supabase";
import { useQueryClient } from '@tanstack/react-query';
// console.log(orders);
export default function index() {
  const queryClient=useQueryClient()
  useEffect(()=>{

const channels = supabase.channel('custom-insert-channel')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'order' },
    (payload) => {
     queryClient.invalidateQueries(['order'])
    }
  )
  .subscribe()
  return ()=>{
    channels.unsubscribe()
  }
  },[])
  const { data: orders, isLoading, error } = useOrderList({ archived: false });
  console.log(error);
  console.log(orders);
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