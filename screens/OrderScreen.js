import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { format } from "date-fns";

export default function OrderScreen({ userData }) {
  const [activeTab, setActiveTab] = useState("cart");
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true); // State untuk loading
  const [menuData, setMenuData] = useState([]); // State untuk menyimpan data menu
  const [paidOrders, setPaidOrders] = useState([]);
  const [unpaidOrders, setUnpaidOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const userId = userData.id; // Ganti dengan user_id pengguna saat ini

  const { rating } = 4;

  // Mapping gambar berdasarkan nama
  const imageMapping = {
    "CloudSeriesExlusiveCombo.png": require("../assets/CloudSeriesExlusiveCombo.png"),
    "StrawberryAmericano.jpg": require("../assets/StrawberryAmericano.jpg"),
    "CheeseCloudLatte.jpg": require("../assets/CheeseCloudeLatte.jpg"),
    "GrappefruitAmericano.jpg": require("../assets/GrappefruitAmericano.jpg"),
    "LemonadeAmericano.jpg": require("../assets/LemonadeAmericano.jpg"),
    "MatchaOatLatte.jpg": require("../assets/MatchaOatLatte.jpg"),
    "HojichaOatLatte.jpg": require("../assets/HojichaOatLatte.jpg"),
    // Tambahkan gambar lainnya sesuai dengan nama file di assets
  };

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(`http://192.168.223.191:5000/pesanans2`, {
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
        .get(`http://192.168.223.191:5000/pesanans2`, {
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

      axios
        .get("http://192.168.223.191:5000/menus")
        .then((response) => {
          setMenuData(response.data); // Simpan data ke state
          setLoading(false); // Set loading selesai
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading selesai meski ada error
        });
      axios
        .get(`http://192.168.223.191:5000/review/${userId}`)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the reviews:", error);
        });
    }, 100);

    return () => clearInterval(interval);
  }, [userId]);

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
            Cart
          </Text>
        </TouchableOpacity>

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
                    Your Cart
                  </Text>
                  <Text>
                    No items in your cart. Select "Menu" to add items.
                  </Text>
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
                            navigation.navigate("CheckoutScreen", {
                              unpaidOrders: [order], // Kirimkan hanya data pesanan ini
                              selectedMenu: order, // Kirimkan data menu yang terkait
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
                        onPress={() => {
                          // Cek apakah review sudah ada untuk order_id spesifik ini
                          const existingReview = reviews.find(
                            (review) =>
                              String(review.order_id) === String(order.id) &&
                              String(review.menu_id) === String(order.menu_id)
                          );

                          if (existingReview) {
                            // Tampilkan alert jika pesanan ini sudah direview
                            Alert.alert(
                              "Have reviewed",
                              "You have already provided a review for this order. Select Reviews to edit/delete your review."
                            );
                          } else {
                            // Navigasi ke ReviewScreen jika belum pernah review
                            navigation.navigate("ReviewScreen", {
                              orderId: order.id,
                              MenuId: order.menu_id,
                            });
                          }
                        }}
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
        {activeTab === "reviews" && (
          <View style={styles.tabContent}>
            {loading ? (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Loading data menu...
              </Text>
            ) : (
              menuData.map((menu, index) => (
                <View key={menu.id || index} style={styles.orderCardReview}>
                  <Text style={styles.locationText}>Cikutra</Text>
                  <Text style={styles.dateText}></Text>
                  <View style={styles.orderDetails}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={imageMapping[menu.image] || null}
                        style={styles.productImage}
                      />
                    </View>
                    <Text style={styles.productName}>{menu.nama}</Text>
                    <View>
                      <Text style={styles.productPrice}>
                        Rp {menu.harga.toLocaleString("id-ID")}
                      </Text>
                      <TouchableOpacity
                        style={styles.rateButtonContainerReviews}
                        onPress={() =>
                          navigation.navigate("HasilReviewScreen", {
                            MenuId: menu.id,
                          })
                        }
                      >
                        <Text style={styles.rateButtonTextReview}>
                          All Reviews
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.reviewBox}>
                    {reviews
                      .filter((review) => review.menu_id === menu.id) // Filter review berdasarkan menu_id
                      .map((review, index) => (
                        <View key={index}>
                          <View
                            style={{
                              borderTopWidth: 1,
                              marginVertical: 10,
                              borderColor: "#EFEFEF",
                            }}
                          ></View>
                          <Text style={styles.headerReviewText}>
                            Your Review
                          </Text>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={styles.ratingContainer}>
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Text
                                  key={star}
                                  style={{
                                    fontSize: 30,
                                    color:
                                      review.review_rating >= star
                                        ? "#FFD700"
                                        : "#CCCCCC",
                                    marginHorizontal: 1,
                                  }}
                                >
                                  ★
                                </Text>
                              ))}
                            </View>
                            <TouchableOpacity
                              style={styles.editButton}
                              onPress={() =>
                                Alert.alert(
                                  "Your Review",
                                  "What do you want?",
                                  [
                                    { text: "Cancel" },
                                    {
                                      text: "Delete",
                                      onPress: () => {
                                        const id = review.id;
                                        fetch(`http://192.168.223.191:5000/reviews/delete/${id}`, {
                                          method: "DELETE",
                                        })
                                          .then((response) => response.json())
                                          .then((data) => console.log(data))
                                          .catch((error) => console.error(error));
                                      },
                                    },
                                    {
                                      text: "Edit",
                                      onPress: () => {
                                        navigation.navigate("ReviewScreen", { id: review.id,
                                          orderId: review.orderId,
                                          MenuId: review.MenuId, });
                                      },
                                    },
                                  ]
                                )
                              }
                            >
                              <Text style={styles.editIcon}>✎</Text>
                            </TouchableOpacity>

                          </View>
                          <View style={styles.komenContainer}>
                            <Text style={styles.labelKomen}>
                              {review.review_comment || "No review yet."}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                </View>
              ))
            )}
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
  rateButtonContainerReviews: {
    marginTop: 10,
    paddingHorizontal: 5,
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
  rateButtonTextReview: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#EE7B00",
    textAlign: "center",
  },
  orderCardReview: {
    marginHorizontal: "5%",
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    justifyContent: "center",
  },
  headerReviewText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  containerLabelUser: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: -10,
    marginLeft: 0,
  },
  komenContainer: {
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: "#EFEFEF",
  },
  labelKomen: {
    fontSize: 13,
    color: "#333",
    textAlign: "justify",
  },
  editButton: {
    marginLeft: 10,
    justifyContent: "center",
  },
  editIcon: {
    fontSize: 20,
    color: "#EE7B00",
  },
});
