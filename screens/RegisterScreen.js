import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [gender, setGender] = useState("Laki-laki");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegister = () => {
    if (!name || !email || !address || !password) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    navigation.navigate("PhoneNumber", {
      name,
      email,
      address,
      password,
      birthday: birthday.toISOString().split("T")[0],
      gender,
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ justifyContent: "center", flexGrow: 1 }}
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subTitle}>Nick Name*</Text>
      <TextInput
        style={styles.input}
        placeholder="Name (no emoji/symbol)"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.subTitle}>Email*</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.subTitle}>Birthday*</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text>{birthday.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthday}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setBirthday(selectedDate);
            }
          }}
        />
      )}
      <Text style={styles.subTitle}>Gender*</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
        >
          <Picker.Item label="Laki-laki" value="Laki-laki" />
          <Picker.Item label="Perempuan" value="Perempuan" />
        </Picker>
      </View>
      <Text style={styles.subTitle}>Address*</Text>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.subTitle}>Password*</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F7ECE0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#8E8E93",
    marginBottom: 16,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderColor: "#8E8E93",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#EE7B00",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  linkText: {
    color: "#EE7B00",
    marginTop: 16,
    marginLeft: 10,
  },
});
