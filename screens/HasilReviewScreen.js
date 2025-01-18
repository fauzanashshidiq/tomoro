import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { format } from "date-fns";

export default function HasilReviewScreen({ route, navigation }) {
  const { MenuId } = route.params; // Mengambil MenuId dari parameter navigasi
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState(null); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true);

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

  // Fetch data produk dan reviews ketika komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data produk
        const productResponse = await axios.get(
          `http://192.168.223.191:5000/menu/${MenuId}`
        );
        setProduct(productResponse.data);

        // Fetch reviews
        const reviewsResponse = await axios.get(
          `http://192.168.223.191:5000/reviews/${MenuId}`
        );
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [MenuId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#FFF2E5", "#FFD7AB"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Review Results</Text>
      </View>

      {/* Menampilkan gambar dan nama produk di atas */}
      {product && (
        <View style={styles.containerAtas}>
          <View style={styles.reviewBox}>
            <Text style={styles.label}>Rate Orders</Text>
            <View style={styles.productContainer}>
              <Image
                source={imageMapping[product.image] || null}
                style={styles.productImage}
              />
              <Text style={styles.label}>{product.nama}</Text>
            </View>
          </View>
        </View>
      )}

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 107 }}
      >
        {/* Menampilkan review-review produk */}
        {reviews.map((review, index) => (
          <View key={index} style={styles.reviewBoxReview}>
            <View style={styles.containerLabelUser}>
              <Text style={styles.labelName}>{review.username}</Text>
              <Text style={styles.labelName}>
                {" "}
                {format(new Date(review.review_timestamp), "dd/MM/yyyy HH:mm")}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text
                  key={star}
                  style={{
                    fontSize: 30,
                    color: review.review_rating >= star ? "#FFD700" : "#CCCCCC",
                    marginHorizontal: 1,
                  }}
                >
                  ★
                </Text>
              ))}
            </View>
            <View style={styles.komenContainer}>
              <Text style={styles.labelKomen}>{review.review_comment}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate("OrderScreen")}
      >
        <Text style={styles.doneButtonText}>DONE</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#ffffff",
    elevation: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    flex: 2,
  },
  backButton: {
    flex: 1,
    marginTop: 20,
  },
  reviewsList: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  reviewCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  reviewHeader: {
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewComment: {
    fontSize: 14,
  },
  doneButton: {
    position: "absolute",
    bottom: 20,
    left: 40,
    right: 40,
    backgroundColor: "#EE7B00",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  doneButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  containerAtas: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reviewBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 5,
  },
  reviewBoxReview: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  productContainer: {
    flexDirection: "row", // Membuat gambar dan teks sejajar secara horizontal
    justifyContent: "center",
    alignItems: "center", // Menyelaraskan secara vertikal di tengah
    marginVertical: 10,
    paddingHorizontal: 10, // Memberikan padding untuk mencegah elemen terlalu menempel ke tepi
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EE7B00",
    marginRight: 20, // Memberikan jarak yang lebih baik antara gambar dan teks
  },
  containerLabelUser: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    marginTop: -10,
    marginLeft: 0,
  },
  labelName: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    paddingLeft: 2,
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
});
