import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function ReviewScreen({ navigation, route }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const { orderId, MenuId } = route.params;

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const submitReview = async () => {
    if (!rating || rating <= 0) {
      alert("Please provide a valid rating between 1 and 5.");
      return;
    }
  
    if (!comment.trim()) {
      alert("Please provide a comment.");
      return;
    }
  
    // Ensure timestamp is formatted properly
    const formattedTimestamp = new Date()
      .toISOString()
      .replace("T", " ")
      .substring(0, 19);
  
    const reviewData = {
      id_pesanan: orderId,
      rating,
      komen: comment,
      timestamp: formattedTimestamp,
    };
  
    // Check if an ID exists (indicating an update scenario)
    const isUpdate = route.params?.id;
  
    const alertMessage = isUpdate
      ? "Are you sure you want to update this review?"
      : "Are you sure you want to submit this review?";
  
    Alert.alert("Confirm Review", alertMessage, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: isUpdate ? "Update" : "Send",
        onPress: async () => {
          try {
            const url = isUpdate
              ? `http://192.168.223.191:5000/reviews/update/${route.params.id}`
              : "http://192.168.223.191:5000/reviews";
  
            const method = isUpdate ? "PUT" : "POST";
  
            const response = await axios({
              url,
              method,
              data: reviewData,
            });
  
            if (response.status === 201 || response.status === 200) {
              const successMessage = isUpdate
                ? "Review updated successfully!"
                : "Review submitted successfully!";
              
              Alert.alert("Success", successMessage);
            
              // Reset input fields
              setReviews([reviewData, ...reviews]);
              setRating(0);
              setComment("");
            
              // Navigate based on the action
              if (isUpdate) {
                navigation.navigate("OrderScreen");
              } else {
                navigation.navigate("HasilReviewScreen", { MenuId: MenuId });
              }
            }
             else {
              console.error(
                "Failed to process review:",
                response.statusText
              );
              Alert.alert(
                "Error",
                "Failed to process review. Please try again later."
              );
            }
          } catch (error) {
            console.error(
              "An error occurred while processing the review:",
              error
            );
            alert("An error occurred. Please try again later.");
          }
        },
      },
    ]);
  };
  

  const renderStar = (index) => {
    return (
      <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
        <Ionicons
          name={index < rating ? "star" : "star-outline"}
          size={30}
          color={index < rating ? "#FFD700" : "#CCCCCC"}
        />
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headerText}>Review Order</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.reviewBox}>
          <Text style={styles.label}>Rate Your Order</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, i) => renderStar(i))}
          </View>
        </View>
        <View style={styles.commentBox}>
          <Text style={styles.label}>Comment Your Order</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="Beritahu kami tentang produk kami"
            value={comment}
            onChangeText={(text) => setComment(text)}
            multiline
          />
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 45,
    backgroundColor: "#ffffff",
    elevation: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 2,
  },
  backButton: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  commentBox: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginBottom: 20,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
    textAlign: "justify",
  },
  submitButton: {
    backgroundColor: "#EE7B00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  submitButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 20,
  },
  reviewsList: {
    marginTop: 20,
  },
  reviewCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    elevation: 5,
  },
  reviewHeader: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewComment: {
    fontSize: 14,
  },
});
