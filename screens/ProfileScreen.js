import React, { use } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProfileScreen({ userData, onLogout }) {
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: onLogout },
    ]);
  };

  return (
    <LinearGradient
      colors={["#FFF2E5", "#FFD7AB"]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <Image
          source={require("../assets/takutnyo.jpg")}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{userData.name}</Text>
        <Text style={styles.email}>{userData.email}</Text>
      </View>

      {/* Edit Button */}
      {/* <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil-outline" size={20} color="white" />
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity> */}

      {/* Profile Details Section */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{userData.phone}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>{userData.address}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Birthday:</Text>
          <Text style={styles.detailValue}>{userData.birthday}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Gender:</Text>
          <Text style={styles.detailValue}>{userData.gender}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Joined:</Text>
          <Text style={styles.detailValue}>{userData.joined}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF2E5",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    marginTop: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
  email: {
    fontSize: 16,
    color: "#555555",
    marginBottom: 20,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EE7B00",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 30,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  detailsContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555555",
  },
  detailValue: {
    fontSize: 16,
    color: "#212121",
  },
  logoutButton: {
    backgroundColor: "#D32F2F",
    padding: 10,
    borderRadius: 5,
    marginVertical: 20,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
  },
});
