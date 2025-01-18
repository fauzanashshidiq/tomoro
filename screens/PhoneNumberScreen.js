import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

export default function PhoneNumberScreen({ route, navigation }) {
  const { name, email, address, password, birthday, gender } = route.params;
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState(null);

  const handleSubmit = () => {
    if (!phone) {
      Alert.alert("Error", "Phone number is required.");
      return;
    }

    // Kirim data ke backend
    axios
      .post("http://192.168.223.191:5000/register", {
        name,
        email,
        phone: `${countryCode}${phone}`,
        address,
        password,
        birthday,
        gender,
      })
      .then(() => {
        Alert.alert("Success", "OTP sent successfully!");
        navigation.navigate("OTPVerification", {
          phone: `${countryCode}${phone}`,
        });
      })
      .catch(() => {
        Alert.alert("Error", "Registration failed. Please try again.");
      });
  };

  const pickerSelectStyles = {
    inputIOS: {
      width: 60,
      height: 40,
      paddingHorzontal: 10,
      borderColor: "#8E8E93",
      borderBottomWidth: 1,
      borderRadius: 5,
      fontSize: 16,
      color: "#000", // Warna teks
      backgroundColor: "transparent",
    },
    inputAndroid: {
      width: 60,
      height: 40,
      paddingHorzontal: 10,
      borderColor: "#8E8E93",
      borderBottomWidth: 1,
      borderRadius: 5,
      fontSize: 16,
      color: "#000", // Warna teks
      backgroundColor: "transparent",
    },
    placeholder: {
      color: "#8E8E93", // Warna placeholder
      fontSize: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subTitle}>
        Login or Register your Tomoro Coffee Account
      </Text>

      <View style={styles.phoneContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            setCountryCode(value); // Set nilai kode negara ke state
          }}
          items={[
            { label: "+62", value: "+62" },
            { label: "+1", value: "+1" },
            { label: "+44", value: "+44" },
          ]}
          style={pickerSelectStyles}
          value={countryCode} // Tetapkan nilai sesuai state
          placeholder={{
            label: "Select", // Teks placeholder
            value: null, // Nilai default placeholder
            color: "#8E8E93", // Warna teks placeholder
          }}
          useNativeAndroidPickerStyle={false} // Gunakan gaya kustom untuk Android
        />

        <TextInput
          style={styles.input}
          placeholder="83**"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>➔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F7ECE0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "flex-start",
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: "#8E8E93",
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#8E8E93",
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#EE7B00",
    padding: 12,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 24,
  },
});

const pickerSelectStyles = {
  inputIOS: {
    width: 70,
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#fff",
    borderColor: "#8E8E93",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
  inputAndroid: {
    width: 70,
    height: 40,
    paddingLeft: 10,
    backgroundColor: "#fff",
    borderColor: "#8E8E93",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
  },
};
