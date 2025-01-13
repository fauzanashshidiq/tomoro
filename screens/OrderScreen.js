import React, { useState } from "react";
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

export default function OrderScreen() {
  const [activeTab, setActiveTab] = useState("orders");
  const navigation = useNavigation();

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

      <ScrollView style={styles.contentContainer}>
        {/* Tab navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "orders" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("orders")}
          >
            <Ionicons
              name="bag-check"
              size={30}
              color={activeTab === "orders" ? "#EE7B00" : "#8E8E93"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "orders" && styles.activeTabText,
              ]}
            >
              Ordered
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
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
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "pickup" && styles.activeTab,
            ]}
            onPress={() => setActiveTab("pickup")}
          >
            <Ionicons
              name="walk-outline"
              size={30}
              color={activeTab === "pickup" ? "#EE7B00" : "#8E8E93"}
            />
            <Text
              style={[
                styles.tabText,
                activeTab === "pickup" && styles.activeTabText,
              ]}
            >
              Pick Up
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

        {/* Show content based on active tab */}
        {activeTab === "orders" && (
          <View>
            <Text>Ordered Content</Text>
          </View>
        )}
        {activeTab === "inprogress" && (
          <View style={styles.tabContent}>
            <Text>In Progress Content</Text>
          </View>
        )}
        {activeTab === "pickup" && (
          <View style={styles.tabContent}>
            <View style={styles.orderCard}>
              <View style={styles.orderCardHeader}>
                <Text style={styles.locationText}>Cikutra</Text>
                <Text style={styles.dateText}>02/11/2024 10:19</Text>
                <View style={styles.orderDetails}>
                  <Image
                    source={require("../assets/StrawberryAmericano.jpg")}
                    style={styles.productImage}
                  />
                  <Text style={styles.productName}>Strawberry Americano</Text>
                  <View>
                    <Text style={styles.productPrice}>Rp 26.000</Text>
                    <Text style={styles.productQuantity}>1 Item</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("ReviewScreen", {
                          productName: "Strawberry Americano",
                        })
                      }
                      style={styles.rateButtonContainer}
                    >
                      <Text style={styles.rateButtonText}>Rate</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.orderCard}>
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
                <Image
                  source={require("../assets/StrawberryAmericano.jpg")}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>Strawberry Americano</Text>
                <View>
                  <Text style={styles.productPrice}>Rp 26.000</Text>
                  <Text style={styles.productQuantity}>1 Item</Text>
                </View>
              </View>
            </View>
          </View>
        )}
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
    width: "auto",
    height: "auto",
    justifyContent: "center",
    paddingVertical: 30,
    paddingLeft: 20,
    backgroundColor: "#ffffff",
    elevation: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
  },
  tabNavigation: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#8E8E93",
    marginTop: 5,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#EE7B00",
  },
  activeTabText: {
    color: "#EE7B00",
  },
  orderCard: {
    width: "auto",
    height: 150,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10,
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
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
  },
  productPrice: {
    paddingLeft: 28,
    fontWeight: "bold",
    fontSize: 14,
    marginTop: -10,
  },
  productQuantity: {
    paddingLeft: 48,
    fontSize: 14,
    color: "#959595",
    alignSelf: "flex-end",
  },
  rateButtonContainer: {
    marginTop: 5,
    paddingHorizontal: 15,
    paddingVertical: 3,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignSelf: "flex-end",
    borderWidth: 1,
    borderColor: "#EE7B00",
  },
  rateButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#EE7B00",
    textAlign: "center",
  },

  completedOrderCard: {
    width: "auto",
    height: 123,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
  },
  completedOrderHeader: {
    flexDirection: "row",
  },
  completedStatus: {
    alignSelf: "flex-end",
    marginTop: 5,
    fontSize: 14,
    color: "#959595",
    fontWeight: "bold",
  },
  reviewsContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 10,
    elevation: 4,
  },
  reviewsHeader: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
