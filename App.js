import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import MainTabNavigator from "./screens/MainTabNavigator";
import OTPVerification from "./screens/OTPVerificationScreen";
import PhoneNumberScreen from "./screens/PhoneNumberScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Simulasi Splash Screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Fungsi Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Main">
            {() => (
              <MainTabNavigator userData={userData} onLogout={handleLogout} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  onLogin={(user) => {
                    setIsLoggedIn(true);
                    setUserData(user);
                  }}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerification} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
