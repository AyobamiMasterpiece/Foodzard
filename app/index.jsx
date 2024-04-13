import { View, Text, ActivityIndicator } from 'react-native';
import React, { useContext } from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { authContext, useAuth } from '../Providers/authProvider';
import { supabase } from "@lib/supabase";

const index = () => {

  const {loading,sessions,isAdmin}=useAuth(); 
 
   if (loading) {
    return <ActivityIndicator></ActivityIndicator>
   }
   if(!sessions){
    
     return <Redirect href={'/auth/'}></Redirect>
  
   }
   if (!isAdmin) {
    console.log('admin');
    return <Redirect href={'/user'}></Redirect>
   }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/user/MealStack/'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/tabs/MealStack/'} asChild>
        <Button text="Admin" />
      </Link>

      {/* <Link href={'/auth'} asChild>
  <Button text="Sign in" />
</Link> */}
<Button text='Sign out' onPress={()=>{
  supabase.auth.signOut()
}}></Button>
    </View>
  );
};

export default index;