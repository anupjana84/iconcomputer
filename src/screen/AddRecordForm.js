import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import axios from "axios";
import Header from "../components/Header";

const AddRecordForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [note, setNote] = useState("");
  const [invoiceImage, setInvoiceImage] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [callDate, setCallDate] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("pin", pin);
      formData.append("note", note);
      if (invoiceImage) {
        formData.append("invoice_image", {
          uri: invoiceImage.uri,
          type: invoiceImage.type,
          name: "invoice_image.jpg",
        });
      }
      formData.append("call_date", callDate);
      formData.append("status", status);

      const response = await axios.post("YOUR_API_ENDPOINT", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Record added successfully!");
        // Clear form fields after successful submission
        setName("");
        setPhone("");
        setAddress("");
        setPin("");
        setNote("");
        setInvoiceImage(null);
        setCallDate("");
        setStatus("Pending");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "Failed to add record. Please try again.");
    }
  };

  // Handle image selection
  const handleImageSelection = async () => {
    const options = {
      mediaType: "photo",
      selectionLimit: 1,
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorMessage) {
        setInvoiceImage(response.assets[0]);
      }
    });
  };

  return (
    <>
    <ScrollView style={styles.container}>
      <Header isCart={true} name={`Back`} />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
        />

        <Text style={styles.label}>Phone</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter Phone Number"
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(value)=> setAddress(value)}
          placeholder="Enter Address"
        />

        <Text style={styles.label}>PIN</Text>
        <TextInput
          style={styles.input}
          value={pin}
          onChangeText={(value)=> setPin(value)}
          placeholder="Enter PIN"
        />

        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={(value)=> setNote(value)}
          placeholder="Enter Note"
        />

        <Text style={styles.label}>Invoice Image</Text>
        <TouchableOpacity onPress={handleImageSelection} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Select Invoice Image</Text>
        </TouchableOpacity>
        {invoiceImage && (
          <Image source={{ uri: invoiceImage.uri }} style={styles.selectedImage} />
        )}

        <Text style={styles.label}>Call Date</Text>
        <TextInput
          style={styles.input}
          value={callDate}
          onChangeText={setCallDate}
          placeholder="YYYY-MM-DD HH:MM:SS"
        />

       

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  formContainer: {
    padding: 20,
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  imageButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  imageButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  statusContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  statusButton: {
    backgroundColor: "#e9ecef",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 8,
  },
  activeStatusButton: {
    backgroundColor: "#28a745",
  },
  statusText: {
    color: "#333",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddRecordForm;