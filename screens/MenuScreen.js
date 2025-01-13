import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import MenuModal from "./components/MenuModal";

export default function MenusScreen({userData}) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [menuData, setMenuData] = useState([]); // State untuk menyimpan data menu
  const [loading, setLoading] = useState(true); // State untuk loading
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedOutlet } = route.params || {};

  useEffect(() => {
    // Ambil data dari API
    axios
      .get("http://192.168.0.102:5000/menus")
      .then((response) => {
        setMenuData(response.data); // Simpan data ke state
        setLoading(false); // Set loading selesai
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading selesai meski ada error
      });
  }, []);

  const handlePress = (menu) => {
    setSelectedMenu(menu);
    setModalVisible(true);
  };

  return (
    <LinearGradient
      colors={["#FFF2E5", "#FFD7AB"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View
        style={{
          width: "auto",
          height: "auto",
          justifyContent: "center",
          paddingLeft: 20,
          backgroundColor: "#ffffff",
          elevation: 10,
          paddingVertical: 20,
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("OutletScreen")}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 20 }}>
            {selectedOutlet ? selectedOutlet.name : "Outlet"}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 15,
            paddingTop: 15,
            alignSelf: "center",
            color: "#EE7B00",
            fontWeight: "bold",
          }}
        >
          [NEW] - DISKON HINGGA 50% SETIAP SABTU
        </Text>
      </View>
      <ScrollView>
        <View style={{ flexDirection: "row" }}>
          {loading ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              Loading data menu...
            </Text>
          ) : (
            <View style={{ flex: 1, marginTop: 30 }}>
              {menuData.map((menu, index) => (
                <TouchableOpacity
                  key={menu.id || index} // Pastikan API memberikan ID unik
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingBottom: 30,
                  }}
                  onPress={() => handlePress(menu)}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color:
                        selectedMenu?.nama === menu.nama
                          ? "#EE7B00"
                          : "#8E8E93",
                      fontWeight: "bold",
                    }}
                  >
                    {menu.nama}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View style={{ flex: 4, marginTop: 10 }}>
            <Image
              source={require("../assets/garfieldTomoro.jpg")}
              style={{
                width: "90%",
                height: undefined,
                aspectRatio: 331 / 219,
                marginTop: 10,
                alignSelf: "center",
                borderRadius: 10,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 15,
                marginRight: 15,
                width: "auto",
                height: 150,
                backgroundColor: "#4998C8",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/gambarMenu1.png")}
                style={{ marginLeft: 20 }}
              />
            </View>
            <View
              style={{
                marginBottom: 10,
                marginLeft: 15,
                marginRight: 15,
                width: "auto",
                height: 150,
                backgroundColor: "#F3DD88",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/gambarMenu2.png")}
                style={{ marginLeft: 20 }}
              />
            </View>
            <View
              style={{
                marginBottom: 10,
                marginLeft: 15,
                marginRight: 15,
                width: "auto",
                height: 150,
                backgroundColor: "#9B7EDB",
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../assets/gambarMenu3.png")}
                style={{ marginLeft: 20 }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <MenuModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        menuData={selectedMenu || {}} 
        userData={userData}
      />
    </LinearGradient>
  );
}
