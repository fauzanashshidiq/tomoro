import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutScreen({ route }) {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={["#FFF2E5", "#FFD7AB"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Checkout</Text>
      </View>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.orderCard}>
          <View style={styles.completedOrderHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.locationText}>Order</Text>
            </View>
          </View>
          <View style={styles.orderDetails}>
            <Image
              source={require("../assets/CloudSeriesExlusiveCombo.png")}
              style={styles.productImage}
            />
            <View style={styles.productContent}>
              <Text style={styles.productName}>Strawberry Americano</Text>
              <Text style={styles.productSize}>Reguler, Iced</Text>
              <Text style={styles.productPrice}>Rp 26.000</Text>
            </View>
            <Text style={styles.productQuantity}>1x</Text>
          </View>
        </View>
        <View style={styles.orderCardPrice}>
          <Text style={styles.textTotal}>Total</Text>
          <Text style={styles.textTotalPrice}>Rp 26.000</Text>
        </View>
      </ScrollView>
      <View style={styles.orderCardPayment}>
        <Text style={styles.textTotalPricePayment}>Rp 26.000</Text>
        <TouchableOpacity
          style={styles.buttonSelectPayment}
          onPress={() => navigation.navigate("SelectPayment")}
        >
          <Text style={styles.textSelectPayment}>Select Payment</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
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
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  orderCardHeader: {
    flexDirection: "column",
  },
  locationText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#959595",
  },
  orderDetails: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  productContent: {
    flexDirection: "column",
    justifyContent: "center",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productSize: {
    fontSize: 14,
    color: "#959595",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 10,
  },
  productQuantity: {
    paddingLeft: 40,
    fontSize: 14,
    color: "#959595",
    alignSelf: "flex-end",
  },
  orderCardPrice: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 30,
    elevation: 4,
    flexDirection: "row",
  },
  textTotal: { flex: 1, textAlign: "left", fontSize: 16, fontWeight: "bold" },
  textTotalPrice: {
    flex: 1,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "bold",
  },
  orderCardPayment: {
    backgroundColor: "#FFF2E5",
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  textTotalPricePayment: {
    flex: 2,
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
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
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
