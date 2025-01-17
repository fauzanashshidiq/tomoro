import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderScreen from "../OrderScreen";
import ReviewScreen from "../ReviewScreen";
import HasilReviewScreen from "../HasilReviewScreen";
import CheckoutScreen from "../CheckoutScreen";
import PaymentSelectScreen from "../SelectPayment";
import PaymentSuccessScreen from "../PaymentSuccessScreen";

const Stack = createStackNavigator();

export default function OrderStackNavigator({ userData }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OrderScreen">
        {() => <OrderScreen userData={userData} />}
      </Stack.Screen>
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="HasilReviewScreen" component={HasilReviewScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen name="SelectPayment" component={PaymentSelectScreen} />
      <Stack.Screen
        name="PaymentSuccessScreen"
        component={PaymentSuccessScreen}
      />
    </Stack.Navigator>
  );
}
