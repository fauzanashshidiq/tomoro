import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export default function ReviewScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const submitReview = () => {
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and a comment.");
      return;
    }

    const newReview = {
      id: Date.now(),
      rating,
      comment,
    };
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
    alert("Thank you for your review!");
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
          style={styles.reviewsList}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={submitReview}>
        <Text style={styles.submitButtonText}>SUBMIT</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "auto",
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
  starsContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
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
  },
  submitButton: {
    backgroundColor: "#EE7B00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20, // Memberikan jarak dari bawah layar
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
    flexDirection: "row",
    marginBottom: 10,
  },
  reviewComment: {
    fontSize: 14,
  },
});
