import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo atau gambar */}
      <Image
        source={require("../assets/logoTomoro.png")} // Ganti dengan logo Anda
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // Warna latar belakang
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
});

export default SplashScreen;
