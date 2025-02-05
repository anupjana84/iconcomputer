import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginDispatch } from "../../reducers/HomeReducer";
import Loader from "../components/Loader";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { loading } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    phone: "",
    password: "",
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              {/* <Image
                alt="App Logo"
                resizeMode="contain"
                style={styles.headerImg}
                source={{
                  uri: "https://nitish.musafirbazar.com/assets/playstore.png",
                }}
              /> */}
              <Image
                resizeMode="contain"
                source={require("../assets/playstore.png")}
                style={styles.headerImg}
              />

              <Text style={styles.title}>
                Sign in to{" "}
                <Text style={{ color: "#88dae0" }}>Icon Computer</Text>
              </Text>

              <Text style={styles.subtitle}>
                Get access to your portfolio and more
              </Text>
            </View>

            <View style={styles.form}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Phone</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={(phone) => setForm({ ...form, phone })}
                  placeholder="8888888888"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  value={form.phone}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>

                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(password) => setForm({ ...form, password })}
                  placeholder="********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity
                  onPress={() => {
                    // let form = {
                    //   phone: form.phone,
                    //   password: form.password,
                    // };
                    // 9832226500;
                    dispatch(loginDispatch(form, navigation));
                    //  console.log("form", form);

                    // navigation.navigate("Productlist");
                    // handle link
                  }}
                >
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: "700",
    color: "#938F8F",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 36,
  },
  headerImg: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E96E6E",
    textAlign: "center",
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#88dae0",
    borderColor: "#88dae0",
    color: "#FFFFFF",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
