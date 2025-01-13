import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tempUser, setTempUser] = useState(null); // Menyimpan user sementara
  const navigation = useNavigation();

  const handleLogin = () => {
    console.log("Sending login request...");
    axios
      .post("http://192.168.0.102:5000/login", { email, password })
      .then((response) => {
        const user = response.data;
        setTempUser(user); // Simpan user data sementara
        Alert.alert("Login Successful!", "Welcome to Tomoro Coffee!", [
          {
            text: "OK",
            onPress: () => {
              onLogin(user); // Panggil onLogin dengan user data
            },
          },
        ]);
      })
      .catch(() => {
        Alert.alert("Login Failed!", "Email or password is wrong.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F7ECE0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#8E8E93",
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#EE7B00",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "#EE7B00",
    marginTop: 16,
  },
});
