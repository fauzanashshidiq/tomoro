import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ userData }) {
  return (
    <LinearGradient colors={["#FFF2E5", "#FFD7AB"]} style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <View style={{ position: "relative" }}>
        <Image
          source={require("../assets/bgTomoro.jpg")}
          style={{
            width: "100%",
            height: undefined,
            aspectRatio: 430 / 380,
            marginTop: 30,
            alignSelf: "center",
          }}
          resizeMode="contain"
        />
        {/* Tombol Logout
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 65,
            right: 20,
            backgroundColor: "#ffffff",
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 5,
          }}
          onPress={() => {
            setIsLoggedIn(false); // Set status login menjadi false
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "#212121", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity> */}
      </View>

      {/* Konten Scrollable */}
      <ScrollView
        style={{
          flex: 1,
          marginTop: -100,
        }}
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        {/* Card Hi, User */}
        <View
          style={{
            width: 370,
            height: 120,
            backgroundColor: "#ffffff",
            marginVertical: 10,
            paddingLeft: 20,
            justifyContent: "center",
            borderRadius: 10,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", paddingBottom: 5 }}
            >
              Hi, {userData.name ? userData.name : "Userr"}
            </Text>
            <View
              style={{
                width: 330,
                borderBottomWidth: 0.5,
                borderBottomColor: "#555555",
                marginBottom: 25,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                flexWrap: "wrap",
              }}
            >
              <Text style={{ fontSize: 15, color: "#555555", flex: 1 }}>
                Benefit Card
              </Text>
              <Text style={{ fontSize: 15, color: "#555555", flex: 1 }}>
                Activate get weekly 9RB -
              </Text>
            </View>
          </View>
        </View>

        {/* Card PROMO */}
        <View
          style={{
            width: 370,
            height: 200,
            backgroundColor: "#ffffff",
            marginVertical: 10,
            paddingLeft: 20,
            paddingTop: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>PROMO</Text>
        </View>

        {/* Card Mission */}
        <View
          style={{
            width: 370,
            height: 120,
            backgroundColor: "#ffffff",
            marginVertical: 10,
            paddingLeft: 20,
            paddingTop: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Mission</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
