import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function HasilReviewScreen({ route, navigation }) {
  const { reviews } = route.params;

  const { rating } = 4;

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
      <View style={styles.container}>
        <View style={styles.reviewBox}>
          <Text style={styles.label}>Rate Your Order</Text>
          <View style={styles.productContainer}>
            <Image
              source={require("../assets/StrawberryAmericano.jpg")}
              style={styles.productImage}
            />
            <Text style={styles.label}>Strawberry Americano</Text>
          </View>
        </View>
        <View style={styles.reviewBoxReview}>
          <View style={styles.containerLabelUser}>
            <Text style={styles.labelName}>User Name</Text>
            <Text style={styles.labelName}>Timestamp</Text>
          </View>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                style={{
                  fontSize: 30,
                  color: rating >= star ? "#FFD700" : "#CCCCCC",
                  marginHorizontal: 1,
                }}
              >
                ★
              </Text>
            ))}
          </View>
          <View style={styles.komenContainer}>
            <Text style={styles.labelKomen}>Isi komen</Text>
          </View>
        </View>
        <View style={styles.reviewBoxReview}>
          <View style={styles.containerLabelUser}>
            <Text style={styles.labelName}>User Name</Text>
            <Text style={styles.labelName}>Timestamp</Text>
          </View>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                style={{
                  fontSize: 30,
                  color: rating >= star ? "#FFD700" : "#CCCCCC",
                  marginHorizontal: 1,
                }}
              >
                ★
              </Text>
            ))}
          </View>
          <View style={styles.komenContainer}>
            <Text style={styles.labelKomen}>Isi komen</Text>
          </View>
        </View>
      </View>

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
    backgroundColor: "#EE7B00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    margin: 20,
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
  reviewBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 10,
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
