import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import { customerDispatch } from "../../reducers/HomeReducer";
import Loader from "./Loader";
import DatePicker from "react-native-date-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OrderForm = () => {
  const [load, setLoad] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wpnumber, setwpnumber] = useState("");
  const [pin, setPin] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { loading, sales, login } = useSelector((state) => state.home);
  const { cart } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // console.log(sales,'sales')
  // console.log(sales[0]?.id,'id')

  const handleSubmit = () => {
    // AsyncStorage.getItem("sales").then((data) => {
    //   console.log(data,'ddd')
    // })
    //  console.log(sales[0]?.id,'id')
     //console.log(login?.salesman)
   // return
    //  console.log({
    //   name,
    //   phone,
    //   address,
    //   pin,
    //   date,
    // });
    let form = {
      name,
      phone,
      address,
      pin,
      salesman_id: login?.salesman?.id,
      wpnumber,
    };
   dispatch(customerDispatch(form, cart, date, login?.token));
   // navigation.navigate("confirm");
  };
  //  console.log("first", date.toISOString());

  return (
    <>
      {loading || load ? (
        <Loader />
      ) : (
        <LinearGradient colors={["#c3f1e3", "#fff"]} style={styles.container}>
          <ScrollView style={styles.container}>
            <View>
              <Header isCart={true} name={"CheckOut"} />
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setName}
                value={name}
                placeholder="Enter Name"
                placeholderTextColor="#999"
              />

              <Text style={styles.label}>Phone</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={setPhone}
                value={phone}
                placeholder="Enter Phone"
                 placeholderTextColor="#999"
              />
              <Text style={styles.label}>Whatapp Number</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.input}
                onChangeText={setwpnumber}
                value={wpnumber}
                placeholder="Enter Whatapp Number"
                 placeholderTextColor="#999"
              />
              <Text style={styles.label}>Address</Text>
              <TextInput
              multiline={true}
              numberOfLines={5}
                style={styles.input1}
                onChangeText={setAddress}
                value={address}
                placeholder="Enter Address"
                 placeholderTextColor="#999"
              />

              <Text style={styles.label}>Pin</Text>
              <TextInput
                style={styles.input}
                onChangeText={setPin}
                value={pin}
                placeholder="Enter Pin Code"
                 placeholderTextColor="#999"
              />

              <Text style={styles.label}>Select Date</Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => setIsDatePickerOpen(true)}
              >
                <Text>{date.toDateString()}</Text>
              </TouchableOpacity>

              <DatePicker
                modal
                open={isDatePickerOpen}
                date={date}
                onConfirm={(selectedDate) => {
                  setIsDatePickerOpen(false);
                  setDate(selectedDate);
                }}
                onCancel={() => setIsDatePickerOpen(false)}
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </LinearGradient>
      )}
    </>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  formContainer: {
    borderRadius: 8,
    padding: 10,
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
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    
  },
  input1: {
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
    justifyContent: "center",
    
  },
  submitButton: {
    backgroundColor: "#88dae0",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
};

export default OrderForm;
