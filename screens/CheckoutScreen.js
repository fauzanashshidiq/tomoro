import React, { useState, useEffect } from "react";
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
import axios from "axios";

export default function CheckoutScreen({ route }) {
  const navigation = useNavigation();
  const { selectedMenu } = route.params;
  const { currentOrderId } = route.params;
  const { user } = route.params;
  const [pesananData, setPesananData] = useState([]);

  // Mapping gambar berdasarkan nama
  const imageMapping = {
    "StrawberryAmericano.jpg": require("../assets/StrawberryAmericano.jpg"),
    "CloudSeriesExlusiveCombo.png": require("../assets/CloudSeriesExlusiveCombo.png"),
    // Tambahkan gambar lainnya sesuai dengan nama file di assets
  };

  // Menentukan gambar berdasarkan nama dari menuData
  const menuImage = imageMapping[selectedMenu?.image] || null; // Jika gambar tidak ditemukan, null

  useEffect(() => {
    if (currentOrderId) {
      axios
        .get(`http://192.168.203.178:5000/pesanans/${currentOrderId}`)
        .then((response) => {
          setPesananData([response.data]); // Simpan data pesanan
        })
        .catch((error) => {
          console.error("Error fetching order:", error);
        });
    }
  }, [currentOrderId]);

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
            <Image source={menuImage} style={styles.productImage} />
            <View style={styles.productContent}>
              <Text
                style={styles.productName}
                numberOfLines={2} // Membatasi hanya 1 baris
                ellipsizeMode="tail" // Menambahkan "..." di akhir teks jika terlalu panjang
              >
                {selectedMenu.nama}
              </Text>
              <Text style={styles.productSize}>
                {""}
                {pesananData.length > 0
                  ? `${pesananData[0].size}, ${
                      pesananData[0].quantity === 1 ? "Iced" : "Non-Iced"
                    }`
                  : " "}
              </Text>
              <Text style={styles.productPrice}>
                Rp {selectedMenu.harga.toLocaleString("id-ID")}
              </Text>
            </View>
            <Text style={styles.productQuantity}>
              {""}
              {pesananData.length > 0 ? `${pesananData[0].quantity}x` : "0"}
            </Text>
          </View>
        </View>
        <View style={styles.orderCardPrice}>
          <Text style={styles.textTotal}>Total</Text>
          <Text style={styles.textTotalPrice}>
            {pesananData.length > 0
              ? `Rp ${pesananData[0].total_harga.toLocaleString("id-ID")}`
              : "Rp 0"}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.orderCardPayment}>
        <Text style={styles.textTotalPricePayment}>
          {pesananData.length > 0
            ? `Rp ${pesananData[0].total_harga.toLocaleString("id-ID")}`
            : "Rp 0"}
        </Text>
        <TouchableOpacity
          style={styles.buttonSelectPayment}
          onPress={() =>
            navigation.navigate("SelectPayment", {
              currentOrderId: currentOrderId,
              user: user,
              pesananData: pesananData,
              selectedMenu: selectedMenu,
            })
          }
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
    flex: 1,
    width: 100,
    height: 90,
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  productContent: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 3,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    maxWidth: 200,
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
    paddingLeft: 20,
    paddingBottom: 10,
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
    fontSize: 12,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
