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
import axios from "axios";

export default function PaymentSelectScreen({ route }) {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const navigation = useNavigation();
  const { pesananData } = route.params;
  const { user } = route.params;
  const { currentOrderId } = route.params;
  const { unpaidOrders } = route.params;

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
      setSelectedMethod(null);
    } else {
      setSelectedMethod(id);
    }
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert("Payment Failed", "Please select a payment method");
      return;
    }

    // Validasi unpaidOrders dan currentOrderId
    const isUnpaidOrdersValid =
      Array.isArray(unpaidOrders) && unpaidOrders.length > 0;
    const isCurrentOrderIdValid =
      currentOrderId !== null && currentOrderId !== undefined;

    if (isUnpaidOrdersValid) {
      // Lakukan request untuk update status semua unpaidOrders
      unpaidOrders.forEach((order) => {
        axios
          .post(`http://192.168.0.102:5000/pesanans/${order.id}`, {
            status_pesanan: "Sudah Bayar",
            id: order.id,
          })
          .then(() => {
            console.log(`Order ${order.id} status updated to "Sudah Bayar"`);
          })
          .catch((error) => {
            console.error(`Error updating order ${order.id}: `, error);
            Alert.alert("Error", "Error processing payment for some orders");
          });
      });

      // Navigasi ke PaymentSuccessScreen setelah semua status diubah
      navigation.navigate("PaymentSuccessScreen", {
        paymentMethod: paymentMethods.find(
          (method) => method.id === selectedMethod
        ),
        pesananData: pesananData,
        user: user,
        unpaidOrders: unpaidOrders, // Kirim unpaidOrders jika diperlukan
      });
    } else if (isCurrentOrderIdValid) {
      // Jika hanya ada currentOrderId yang valid, update status pesanan tersebut
      axios
        .post(`http://192.168.203.178:5000/pesanans/${currentOrderId}`, {
          status_pesanan: "Sudah Bayar",
          id: currentOrderId,
        })
        .then(() => {
          // Navigasi ke PaymentSuccessScreen setelah status berhasil diubah
          navigation.navigate("PaymentSuccessScreen", {
            paymentMethod: paymentMethods.find(
              (method) => method.id === selectedMethod
            ),
            pesananData: pesananData,
            user: user,
            unpaidOrders: unpaidOrders, // Kirim unpaidOrders jika diperlukan
          });
        })
        .catch((error) => {
          console.error("Error updating payment status: ", error);
          Alert.alert("Error", "Error processing payment");
        });
    } else {
      Alert.alert("Error", "No unpaid orders found or invalid order ID");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Payment</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.orderCard}>
          <Text style={styles.price}>
            {pesananData.length > 0
              ? `Rp ${pesananData[0]?.total_harga?.toLocaleString("id-ID")}`
              : Array.isArray(unpaidOrders) && unpaidOrders.length > 0
              ? `Rp ${unpaidOrders[0]?.total_harga?.toLocaleString("id-ID")}`
              : "Rp 0"}
          </Text>
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
          onPress={handlePayment}
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
