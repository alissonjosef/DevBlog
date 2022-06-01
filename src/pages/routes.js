import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./Home";
import Detail from "./Detail";
import CategoryPosts from "./CategoryPosts";
import Search from "./Search";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{
          headerShown: false
      }} />
      <Stack.Screen name="Detail" component={Detail}  options={{
          title: 'Detalhes',
          headerTintColor:'#fff',
          headerStyle: {
            backgroundColor: "#232630"
          }
      }}/>
      <Stack.Screen name="CategoryPosts" component={CategoryPosts} options={{
          headerTintColor:'#fff',
          headerStyle: {
            backgroundColor: "#232630"
          }
      }}/>
      <Stack.Screen name="Search" component={Search} options={{
          title: 'Procurando',
          headerTintColor:'#fff',
          headerStyle: {
            backgroundColor: "#232630"
          }
      }}/>
    </Stack.Navigator>
  );
}

export default Routes;
