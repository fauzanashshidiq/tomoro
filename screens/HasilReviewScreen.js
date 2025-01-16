import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function HasilReviewScreen({ route, navigation }) {
  const { reviews } = route.params;

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
      </View>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              {[...Array(5)].map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < item.rating ? "star" : "star-outline"}
                  size={20}
                  color={i < item.rating ? "#FFD700" : "#CCCCCC"}
                />
              ))}
            </View>
            <Text style={styles.reviewComment}>{item.comment}</Text>
          </View>
        )}
        contentContainerStyle={styles.reviewsList}
      />

      <TouchableOpacity
        style={styles.doneButton}
        onPress={() => navigation.navigate("Home")}
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
    justifyContent: "space-between",
    padding: 20,
  },
  reviewBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  productContainer: {
    flexDirection: "row", // Membuat gambar dan teks sejajar secara horizontal
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
    marginRight: 10, // Memberikan jarak yang lebih baik antara gambar dan teks
  },
  labelName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
    color: "#333",
    flex: 1, // Memastikan teks tidak terlalu jauh ke kanan dan menempati ruang yang tersisa
  },
});
