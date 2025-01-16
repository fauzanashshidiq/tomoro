import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { format } from "date-fns";

export default function OrderScreen({ userData }) {
  const [activeTab, setActiveTab] = useState("cart");
  const navigation = useNavigation();

  const [paidOrders, setPaidOrders] = useState([]);
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const userId = userData.id; // Ganti dengan user_id pengguna saat ini

  // Mapping gambar berdasarkan nama
  const imageMapping = {
    "StrawberryAmericano.jpg": require("../assets/StrawberryAmericano.jpg"),
    "CloudSeriesExlusiveCombo.png": require("../assets/CloudSeriesExlusiveCombo.png"),
    // Tambahkan gambar lainnya sesuai dengan nama file di assets
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://192.168.203.178:5000/pesanans2`, {
          params: {
            user_id: userId,
            status_pesanan: "Sudah Bayar",
          },
        })
        .then((response) => {
          // Mengurutkan pesanan berdasarkan timestamp (terbaru ke terlama)
          const sortedPaidOrders = response.data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          // Map data dengan gambar
          const mappedOrders = sortedPaidOrders.map((order) => ({
            ...order,
            imageSource: imageMapping[order.image] || null,
          }));

          setPaidOrders(mappedOrders);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

      axios
        .get(`http://192.168.203.178:5000/pesanans2`, {
          params: {
            user_id: userId,
            status_pesanan: "Belum Bayar",
          },
        })
        .then((response) => {
          // Mengurutkan pesanan berdasarkan timestamp (terbaru ke terlama)
          const sortedUnpaidOrders = response.data.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          // Map data dengan gambar
          const mappedOrders = sortedUnpaidOrders.map((order) => ({
            ...order,
            imageSource: imageMapping[order.image] || null,
          }));

          setUnpaidOrders(mappedOrders);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 100); // Poll setiap 5 detik

    return () => clearInterval(interval);
  }, []);

  return (
    <LinearGradient
      colors={["#FFF2E5", "#FFD7AB"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>My Orders</Text>
      </View>

      {/* Tab navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "cart" && styles.activeTab]}
          onPress={() => {
            setActiveTab("cart");
          }}
        >
          <Ionicons
            name="cart"
            size={30}
            color={activeTab === "cart" ? "#EE7B00" : "#8E8E93"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "cart" && styles.activeTabText,
            ]}
          >
            Chart
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "inprogress" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("inprogress")}
          >
            <Ionicons
              name="time-outline"
              size={30}
              color={activeTab === "inprogress" ? "#EE7B00" : "#8E8E93"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "inprogress" && styles.activeTabText,
              ]}
            >
              In Progress
            </Text>
          </TouchableOpacity> */}

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "ordered" && styles.activeTab,
          ]}
          onPress={() => {
            setActiveTab("ordered");
          }}
        >
          <Ionicons
            name="bag-check"
            size={30}
            color={activeTab === "ordered" ? "#EE7B00" : "#8E8E93"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "ordered" && styles.activeTabText,
            ]}
          >
            Ordered
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "reviews" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("reviews")}
        >
          <Ionicons
            name="chatbubble-outline"
            size={30}
            color={activeTab === "reviews" ? "#EE7B00" : "#8E8E93"}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "reviews" && styles.activeTabText,
            ]}
          >
            Reviews
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.contentContainer}>
        {/* Show content based on active tab */}
        {activeTab === "cart" && (
          <View>
            <View style={styles.tabContent}>
              {Array.isArray(unpaidOrders) && unpaidOrders.length === 0 ? (
                <View style={styles.orderCard}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Your Chart
                  </Text>
                  <Text>No orders yet. Select "Menu" to make an order.</Text>
                </View>
              ) : (
                unpaidOrders.map((order) => (
                  <View key={order.id} style={styles.orderCard}>
                    <Text style={styles.locationText}>Cikutra</Text>
                    <Text style={styles.dateText}>
                      {format(new Date(order.timestamp), "dd/MM/yyyy HH:mm")}
                    </Text>
                    <View style={styles.orderDetails}>
                      <View style={styles.imageContainer}>
                        <Image
                          source={order.imageSource}
                          style={styles.productImage}
                        />
                      </View>
                      <Text style={styles.productName}>{order.nama}</Text>
                      <View>
                        <Text style={styles.productPrice}>
                          {`Rp ${order.total_harga.toLocaleString("id-ID")}`}
                        </Text>
                        <Text
                          style={styles.productQuantity}
                        >{`${order.quantity} Item`}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("ReviewScreen", {
                              productName: order.product_name,
                            })
                          }
                          style={styles.rateButtonContainer}
                        >
                          <Text style={styles.rateButtonText}>Checkout</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))
              )}
            </View>
          </View>
        )}
        {activeTab === "ordered" && (
          <View style={styles.tabContent}>
            {Array.isArray(paidOrders) && paidOrders.length === 0 ? (
              <View style={styles.orderCard}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  Your Orders
                </Text>
                <Text>No orders yet. Select "Menu" to make an order.</Text>
              </View>
            ) : (
              paidOrders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <Text style={styles.locationText}>Cikutra</Text>
                  <Text style={styles.dateText}>
                    {format(new Date(order.timestamp), "dd/MM/yyyy HH:mm")}
                  </Text>
                  <View style={styles.orderDetails}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={order.imageSource}
                        style={styles.productImage}
                      />
                    </View>
                    <Text style={styles.productName}>{order.nama}</Text>
                    <View>
                      <Text style={styles.productPrice}>
                        {`Rp ${order.total_harga.toLocaleString("id-ID")}`}
                      </Text>
                      <Text
                        style={styles.productQuantity}
                      >{`${order.quantity} Item`}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("ReviewScreen", {
                            productName: order.product_name,
                          })
                        }
                        style={styles.rateButtonContainer}
                      >
                        <Text style={styles.rateButtonText}>Rate</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            )}
          </View>
        )}
        {/* <View style={styles.orderCard}>
              <View style={styles.completedOrderHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.locationText}>Cikutra</Text>
                  <Text style={styles.dateText}>02/11/2024 10:19</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.completedStatus}>Completed</Text>
                </View>
              </View>
              <View style={styles.orderDetails}>
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../assets/StrawberryAmericano.jpg")}
                    style={styles.productImage}
                  />
                </View>
                <Text style={styles.productName}>Strawberry Americano</Text>
                <View>
                  <Text style={styles.productPrice}>Rp 26.000</Text>
                  <Text style={styles.productQuantity}>1 Item</Text>
                </View>
              </View>
            </View> */}
        {activeTab === "reviews" && (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsHeader}>Your Reviews</Text>
            <Text>No reviews yet. Tap "Rate" to add a review.</Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    paddingVertical: 45, // Sesuaikan nilai ini jika tampilan terlalu besar
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    elevation: 10,
  },
  headerText: {
    fontSize: 18, // Ukuran teks responsif secara manual
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  tabNavigation: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8E8E93",
    marginTop: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#EE7B00",
  },
  activeTabText: {
    color: "#EE7B00",
  },
  orderCard: {
    marginHorizontal: "5%",
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    justifyContent: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
    color: "#959595",
  },
  orderDetails: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "flex-start",
  },
  imageContainer: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    alignSelf: "center",
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  productName: {
    flex: 2,
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "center",
  },
  productPrice: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: -5,
    textAlign: "right",
  },
  productQuantity: {
    fontSize: 12,
    color: "#959595",
    textAlign: "right",
  },
  completedOrderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  completedStatus: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#959595", // Anda bisa mengganti warna sesuai kebutuhan
    paddingLeft: 80,
  },

  rateButtonContainer: {
    marginTop: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  rateButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#EE7B00",
    textAlign: "center",
  },
  reviewsContainer: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: "5%",
    marginVertical: 5,
    elevation: 4,
  },
  reviewsHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
