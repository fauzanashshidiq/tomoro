import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";

export default function OTPVerificationScreen({ route, navigation }) {
  const { phone } = route.params; // Nomor telepon dari RegisterScreen
  const [otp, setOtp] = useState(["", "", "", ""]); // Array untuk menyimpan setiap digit OTP
  const inputs = useRef([]); // Referensi ke semua TextInput

  const handleVerifyOTP = () => {
    const otpCode = otp.join(""); // Gabungkan semua digit menjadi satu string
    axios
      .post("http://192.168.0.102:5000/verify-otp", { phone, otp: otpCode })
      .then(() => {
        Alert.alert("Registration successful!", "Verification successful!");
        navigation.navigate("Login");
      })
      .catch(() => {
        Alert.alert("Registration failed!", "Invalid OTP, please try again.");
      });
  };

  const handleChangeText = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Pindah ke input berikutnya jika ada
    if (text && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const handleResendOTP = () => {
    Alert.alert(
      "Resend OTP successful!",
      "Resend OTP sent to " + phone + " (OTP code is: 0000)"
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP Code</Text>
      <Text style={styles.subTitle}>
        A verification code has been sent via SMS to {phone}
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            ref={(ref) => (inputs.current[index] = ref)} // Simpan referensi TextInput
          />
        ))}
      </View>
      <Text style={styles.subTitle}>Didn't receive OTP code?</Text>
      <View style={styles.resendHeader}>
        <TouchableOpacity style={styles.resend} onPress={handleResendOTP}>
          <Text style={styles.resendText}>Resend</Text>
        </TouchableOpacity>
        <Text style={styles.resendText}> | </Text>
        <TouchableOpacity style={styles.resend}>
          <Text style={styles.resendText}>Send Via WhatsApp</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify</Text>
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
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 5,
    color: "#8E8E93",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
    marginTop: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    margin: 7,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    borderRadius: 5,
  },
  resendHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  resend: {
    padding: 0,
  },
  resendText: {
    color: "#8E8E93",
  },
  button: {
    backgroundColor: "#EE7B00",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
