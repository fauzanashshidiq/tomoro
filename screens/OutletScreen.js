import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function OutletScreen() {
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const navigation = useNavigation();

  const outlets = [
    {
      id: 1,
      name: "Cikutra",
      status: "Open",
      address: "73m - jl. cikutra No. 143, Neglasari",
    },
    {
      id: 2,
      name: "Dago",
      status: "Open",
      address: "1.2km - jl. Dago No. 23, Coblong",
    },
    {
      id: 3,
      name: "Buah Batu",
      status: "Open",
      address: "2km - jl. Buah Batu No. 56, Lengkong",
    },
    {
      id: 4,
      name: "Cibaduyut",
      status: "Open",
      address: "3.5km - jl. Cibaduyut No. 78, Bojongloa Kidul",
    },
    {
      id: 5,
      name: "Setiabudi",
      status: "Closed",
      address: "4.1km - jl. Setiabudi No. 101, Sukasari",
    },
    {
      id: 6,
      name: "Antapani",
      status: "Open",
      address: "5km - jl. Antapani No. 99, Antapani",
    },
  ];

  const handleSelectOutlet = (id) => {
    setSelectedOutlet(id);
  };

  return (
    <LinearGradient
      colors={["#FFF2E5", "#FFD7AB"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Store List</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {outlets.map((outlet) => (
          <TouchableOpacity
            key={outlet.id}
            style={[
              styles.outletCard,
              {
                borderColor:
                  selectedOutlet === outlet.id ? "#EE7B00" : "#ffffff",
              },
            ]}
            onPress={() => handleSelectOutlet(outlet.id)}
          >
            <View style={styles.outletCardHeader}>
              <Text style={styles.locationText}>{outlet.name}</Text>
              <Text
                style={[
                  styles.openStatusText,
                  { color: outlet.status === "Open" ? "#2EC044" : "#FF0000" },
                ]}
              >
                {outlet.status}
              </Text>
              <Text style={styles.streetText}>{outlet.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.startOrderButton}
        onPress={() =>
          navigation.navigate("MenuScreen", {
            selectedOutlet: outlets[selectedOutlet - 1],
          })
        }
      >
        <Text style={styles.startOrderText}>Start Order</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    justifyContent: "center",
    paddingTop: 20,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    elevation: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  outletCard: {
    width: "auto",
    height: 100,
    marginHorizontal: 25,
    marginVertical: 5,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    padding: 10,
    borderWidth: 2,
    elevation: 4,
  },
  outletCardHeader: {
    flexDirection: "column",
    height: "100%",
  },
  locationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 2,
  },
  openStatusText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  streetText: {
    fontSize: 12,
    color: "#959595",
  },
  startOrderButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#EE7B00",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  startOrderText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
