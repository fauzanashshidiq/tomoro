import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../OrderScreen";
import ReviewScreen from "../ReviewScreen";

const Stack = createStackNavigator();

export default function OrderStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
    </Stack.Navigator>
  );
}
