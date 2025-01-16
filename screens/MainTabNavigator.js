import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import OrderStackNavigator from "../screens/navigator/OrderStackNavigator";
import MenuStackNavigator from "../screens/navigator/MenuStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator({ userData, onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Menu") {
            iconName = focused ? "cafe" : "cafe-outline";
          } else if (route.name === "Order") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#EE7B00",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home">
        {() => <HomeScreen userData={userData} />}
      </Tab.Screen>
      <Tab.Screen name="Menu">
        {() => <MenuStackNavigator userData={userData} />}
      </Tab.Screen>
      <Tab.Screen
        name="Order"
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Cegah perilaku navigasi default
            navigation.navigate("Order", { screen: "OrderScreen" }); // Reset stack ke OrderScreen
          },
        })}
      >
        {() => <OrderStackNavigator userData={userData} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <ProfileScreen userData={userData} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
