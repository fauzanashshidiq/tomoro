import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PaymentSuccessScreen() {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigation = useNavigation();

  const paymentMethods = [
    {
      id: 1,
      name: "ShopeePay/SPayLater",
      icon: require("../assets/shopee.png"),
    },
    {
      id: 2,
      name: "Gopay",
      icon: require("../assets/gopay.png"),
    },
    { id: 3, name: "Ovo", icon: require("../assets/ovo.png") },
    {
      id: 4,
      name: "Dana",
      icon: require("../assets/dana.png"),
    },
    { id: 5, name: "Qris", icon: require("../assets/qris.png") },
  ];

  const handleSelectMethod = (id) => {
    if (selectedMethod === id) {
      // Jika metode yang sama dipilih dua kali, batalkan pilihan
      setSelectedMethod(null);
    } else {
      setSelectedMethod(id);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.orderCard}>
          <Text style={styles.price}>Rp 26.000</Text>
        </View>
        <View style={styles.orderCardPaymentMethod}>
          <Text style={styles.textTitlePaymentMethod}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <View key={method.id} style={styles.paymentMethodRow}>
              <Image source={method.icon} style={styles.paymentIcon} />
              <Text style={styles.textPaymentMethod}>{method.name}</Text>
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.radioSelected,
                ]}
                onPress={() => handleSelectMethod(method.id)}
              >
                <View style={styles.radioInner} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.orderCardPayment}>
        <TouchableOpacity
          style={styles.buttonSelectPayment}
          onPress={() => {
            if (selectedMethod) {
              navigation.navigate("PaymentSuccessScreen");
            } else {
              Alert.alert("Payment Failed", "Please select a payment method");
            }
          }}
        >
          <Text style={styles.textSelectPayment}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#ffffff", flex: 1 },
  header: {
    width: "auto",
    height: "auto",
    justifyContent: "center",
    paddingVertical: 30,
    backgroundColor: "#ffffff",
    elevation: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
  },
  orderCard: {
    backgroundColor: "#EFEFEF",
    padding: 20,
  },
  price: { textAlign: "center", fontSize: 20, fontWeight: "bold", margin: 10 },
  orderCardPaymentMethod: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  textTitlePaymentMethod: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentMethodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    marginHorizontal: 10,
  },
  textPaymentMethod: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9, // Membuat tombol berbentuk lingkaran
    backgroundColor: "#959595", // Warna abu-abu sebagai default
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "#EE7B00", // Warna oranye saat dipilih
  },
  radioInner: {
    width: 9, // Ukuran lubang putih
    height: 9,
    borderRadius: 5, // Membuat lingkaran untuk lubang
    backgroundColor: "#ffffff", // Warna putih untuk lubang
  },
  orderCardPayment: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonSelectPayment: {
    backgroundColor: "#EE7B00",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    alignItems: "center",
  },
  textSelectPayment: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});