import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../MenuScreen";
import OutletScreen from "../OutletScreen";
import CheckoutScreen from "../CheckoutScreen";
import PaymentSuccessScreen from "../PaymentSuccessScreen";
import SelectPayment from "../SelectPayment";

const Stack = createStackNavigator();

export default function MenuStackNavigator({ userData }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MenuScreen">
        {() => <MenuScreen userData={userData} />}
      </Stack.Screen>
      <Stack.Screen name="OutletScreen" component={OutletScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="SelectPayment" component={SelectPayment} />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
    </Stack.Navigator>
  );
}
