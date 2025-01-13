import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function PaymentSuccessScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.header}></View>
        <Image
          style={styles.successImage}
          source={require("../assets/vectorSuccess.png")}
        />
        <Text style={styles.successText}>Pembayaran Berhasil!</Text>
        <View style={styles.orderCardPaymentMethod}>
          <View style={styles.paymentMethodHeader}>
            <Text style={styles.textTitlePaymentMethod}>QRIS</Text>
            <Image
              style={styles.imagePaymentMethod}
              source={require("../assets/qris.png")}
            />
          </View>
          <Text style={styles.textPaymentMethod}>Rp 26.000</Text>
          <Text style={styles.textTitleDetail}>Nomor Pesanan</Text>
          <Text style={styles.textDetail}>2311400NA-007</Text>
          <Text style={styles.textTitleDetail}>Nomor Referensi</Text>
          <Text style={styles.textDetail}>AXILF91000</Text>
          <Text style={styles.textTitleDetail}>Tanggal Pembayaran</Text>
          <Text style={styles.textDetail}>27 Agustus 2024, 10:15 WIB</Text>
          <Text style={styles.textTitleDetail}>Nama Pemesan</Text>
          <Text style={styles.textDetail}>Karina</Text>
          <View style={styles.paymentMethodHeaderBottom}></View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cetakStrukButton}>
          <Text style={styles.cetakStrukButtonText}>Cetak Struk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.navigate("MenuScreen")}
        >
          <Text style={styles.closeButtonText}>Tutup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    width: "100%",
    height: 70,
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#ffffff",
  },
  contentContainer: {
    flex: 1,
  },
  successImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
    alignSelf: "center",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
    marginBottom: 20,
    textAlign: "center",
  },
  orderCardPaymentMethod: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  paymentMethodHeader: {
    borderBottomWidth: 1,
    borderColor: "#EFEFEF",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  textTitlePaymentMethod: {
    flex: 5,
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 20,
  },
  imagePaymentMethod: {
    flex: 1,
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginVertical: 10,
  },
  textPaymentMethod: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textTitleDetail: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333333",
    marginTop: 10,
  },
  textDetail: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 5,
  },
  paymentMethodHeaderBottom: {
    borderTopWidth: 1,
    borderColor: "#EFEFEF",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    paddingVertical: 20,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  cetakStrukButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#EE7B00",
    borderRadius: 25,
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  closeButton: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: "#FFD7AB",
    borderRadius: 25,
    alignItems: "center",
    margin: 10,
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  cetakStrukButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#EE7B00",
    fontWeight: "bold",
  },
});
