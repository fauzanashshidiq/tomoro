import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function MenuModal({ isVisible, onClose, menuData, userData }) {
  const [selectedSize, setSelectedSize] = useState("Reguler");
  const [isIcedActive, setIsIcedActive] = useState(false);
  const [count, setCount] = useState(1);
  const navigation = useNavigation();
  const { rating } = menuData;
  const { harga, id } = menuData;

  // Mapping gambar berdasarkan nama
  const imageMapping = {
    "CloudSeriesExlusiveCombo.png": require("../../assets/CloudSeriesExlusiveCombo.png"),
    "StrawberryAmericano.jpg": require("../../assets/StrawberryAmericano.jpg"),
    "CheeseCloudLatte.jpg": require("../../assets/CheeseCloudeLatte.jpg"),
    "GrappefruitAmericano.jpg": require("../../assets/GrappefruitAmericano.jpg"),
    "LemonadeAmericano.jpg": require("../../assets/LemonadeAmericano.jpg"),
    "MatchaOatLatte.jpg": require("../../assets/MatchaOatLatte.jpg"),
    "HojichaOatLatte.jpg": require("../../assets/HojichaOatLatte.jpg"),
    // Tambahkan gambar lainnya sesuai dengan nama file di assets
  };

  // Menentukan gambar berdasarkan nama dari menuData
  const menuImage = imageMapping[menuData?.image] || null; // Jika gambar tidak ditemukan, null

  const handleIcedPress = () => {
    setIsIcedActive(!isIcedActive);
  };

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  // const handleAddToCart = () => {
  //   onClose(); // Tutup modal
  //   navigation.navigate("CheckoutScreen", { selectedMenu: menuData }); // Kirim data ke CheckoutScreen
  // };

  const handleAddToCart = async () => {
    if (!userData || !userData.id) {
      console.error("User data is not available");
      return; // Prevent proceeding without valid userData
    }
    try {
      // Data yang akan dikirim ke backend
      const orderData = {
        menu_id: id, // ID menu dari menuData
        user_id: userData.id, // Gantilah dengan user_id yang sesuai (misalnya dari sesi login)
        quantity: count, // Jumlah pesanan
        size: selectedSize, // Ukuran (Reguler/Large)
        iced: isIcedActive ? 1 : 0, // Minuman Iced atau tidak
        total_harga: count * harga,
      };

      // Kirim POST request ke endpoint backend
      const response = await axios.post(
        "http://192.168.203.178:5000/pesanans",
        orderData
      );

      if (response.status === 201) {
        const currentOrderId = response.data.id; // Ambil ID dari respons
        console.log("Pesanan berhasil ditambahkan!");
        console.log("data id pesanan: " + currentOrderId);

        onClose(); // Tutup modal
        navigation.navigate("CheckoutScreen", {
          selectedMenu: menuData,
          currentOrderId: currentOrderId,
          user: userData.name,
        }); // Navigasi ke CheckoutScreen
      } else {
        console.error("Gagal menambahkan pesanan");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menambahkan pesanan:", error);
    }
  };

  useEffect(() => {
    if (isVisible) {
      setCount(1);
      setSelectedSize("Reguler");
    }
  }, [isVisible]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={{ margin: 0, justifyContent: "flex-end" }}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <View style={styles.closeButtonView}>
            <Text style={styles.closeButtonText}>x</Text>
          </View>
        </TouchableOpacity>

        <Image source={menuImage} style={styles.image} resizeMode="contain" />

        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text
              key={star}
              style={{
                fontSize: 30,
                color: rating >= star ? "#FFD700" : "#CCCCCC", // Menetapkan rating ke 4
                marginHorizontal: 5,
              }}
            >
              ★
            </Text>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.sizeContainer}>
          <TouchableOpacity
            onPress={() => setSelectedSize("Reguler")}
            style={[
              styles.sizeButton,
              selectedSize === "Reguler" && styles.sizeButtonSelected,
            ]}
          >
            <Image
              source={require("../../assets/frameUkuranBotol.png")}
              style={styles.sizeImage}
            />
            <Text style={styles.sizeText}>Reguler</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedSize("Large")}
            style={[
              styles.sizeButton,
              selectedSize === "Large" && styles.sizeButtonSelected,
            ]}
          >
            <Image
              source={require("../../assets/frameUkuranBotol.png")}
              style={styles.sizeImage}
            />
            <Text style={styles.sizeText}>Large</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.icedContainer}>
          <TouchableOpacity
            onPress={handleIcedPress}
            style={[
              styles.icedButton,
              isIcedActive && styles.icedButtonSelected,
            ]}
          >
            <Text style={styles.icedText}>Iced</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.countContainer}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.decrementButton}
          >
            <Text style={styles.decrementButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>{count}</Text>
          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.incrementButton}
          >
            <Text style={styles.incrementButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.addToChartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToChartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    marginTop: -19,
    marginBottom: -13,
    marginLeft: -20,
    marginRight: -20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "75%",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonView: {
    backgroundColor: "gray",
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "white",
    marginBottom: 3,
  },
  image: {
    width: 286,
    height: 189,
    marginTop: 20,
    alignSelf: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "center",
  },
  divider: {
    width: 330,
    borderBottomWidth: 0.5,
    borderBottomColor: "#555555",
    marginBottom: 10,
    marginTop: 10,
    alignSelf: "center",
  },
  sizeContainer: {
    flexDirection: "row",
    height: 100,
    width: 300,
    justifyContent: "center",
  },
  sizeButton: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    width: 200,
    marginLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  sizeButtonSelected: {
    backgroundColor: "#FFF2E5",
    borderColor: "#EE7B00",
  },
  sizeText: {
    textAlign: "center",
    fontWeight: "semibold",
    color: "black",
  },
  sizeImage: { alignSelf: "center" },
  icedContainer: {
    height: 50,
    width: 100,
    marginTop: 10,
  },
  icedButton: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    width: 100,
    marginLeft: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  icedButtonSelected: {
    backgroundColor: "#FFF2E5",
    borderColor: "#EE7B00",
  },
  icedText: {
    textAlign: "center",
    fontWeight: "semibold",
    color: "#212121",
  },
  countContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  decrementButton: {
    width: 30,
    height: 30,
    backgroundColor: "gray",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  decrementButtonText: { fontSize: 16, color: "white", fontWeight: "bold" },
  incrementButton: {
    width: 30,
    height: 30,
    backgroundColor: "#EE7B00",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  incrementButtonText: { fontSize: 16, color: "white", fontWeight: "bold" },
  countText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555555",
    marginHorizontal: 10,
  },
  addToChartButton: {
    backgroundColor: "#EE7B00",
    marginTop: 10,
    width: 330,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    alignSelf: "center",
  },
  addToChartText: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
});
