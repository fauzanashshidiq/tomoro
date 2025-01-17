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

export default function PaymentSuccessScreen({ route }) {
  const navigation = useNavigation();
  const { paymentMethod } = route.params; // Retrieve the passed payment method data
  const { pesananData } = route.params;
  const { unpaidOrders } = route.params; // Tambahkan unpaidOrders
  const { user } = route.params;

  // Formatkan timestamp menjadi tanggal yang diinginkan
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    // Format tanggal
    const options = {
      year: "numeric", // Tahun, misalnya "2024"
      month: "long", // Bulan, misalnya "Agustus"
      day: "numeric", // Tanggal, misalnya "27"
      hour: "numeric", // Jam, misalnya "10"
      minute: "numeric", // Menit, misalnya "15"
      timeZoneName: "short", // Zona waktu, misalnya "WIB"
    };

    return new Intl.DateTimeFormat("id-ID", options).format(date); // id-ID untuk bahasa Indonesia
  };

  // Gunakan pesananData atau unpaidOrders jika salah satu tidak tersedia
  const displayOrder =
    pesananData?.length > 0 ? pesananData[0] : unpaidOrders?.[0] || {};

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
            <Text style={styles.textTitlePaymentMethod}>
              {paymentMethod.name}
            </Text>
            <Image
              style={styles.imagePaymentMethod}
              source={paymentMethod.icon}
            />
          </View>
          <Text style={styles.textPaymentMethod}>
            {displayOrder?.total_harga
              ? `Rp ${displayOrder.total_harga.toLocaleString("id-ID")}`
              : "Rp 0"}
          </Text>
          <Text style={styles.textTitleDetail}>Nomor Pesanan</Text>
          <Text style={styles.textDetail}>2311400NA-007</Text>
          <Text style={styles.textTitleDetail}>Nomor Referensi</Text>
          <Text style={styles.textDetail}>AXILF91000</Text>
          <Text style={styles.textTitleDetail}>Tanggal Pembayaran</Text>
          <Text style={styles.textDetail}>
            {displayOrder?.timestamp
              ? formatTimestamp(displayOrder.timestamp)
              : "Loading..."}
          </Text>
          <Text style={styles.textTitleDetail}>Nama Pemesan</Text>
          <Text style={styles.textDetail}>
            {user || unpaidOrders?.[0]?.user_name || "Tidak diketahui"}
          </Text>

          <View style={styles.paymentMethodHeaderBottom}></View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cetakStrukButton}>
          <Text style={styles.cetakStrukButtonText}>Cetak Struk</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => {
            // Cek jika currentOrderId ada, maka navigasi ke MenuScreen
            if (user) {
              navigation.navigate("MenuScreen");
            }
            // Cek jika unpaidOrders ada, maka navigasi ke OrderScreen
            else if (Array.isArray(unpaidOrders) && unpaidOrders.length > 0) {
              navigation.navigate("OrderScreen");
            } else {
              // Tindakan default jika tidak ada kondisi yang memenuhi
              Alert.alert("Error", "Tidak ada data untuk dilanjutkan");
            }
          }}
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
