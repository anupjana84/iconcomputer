import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Header from "../components/Header";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import CarouselProduct from "../components/CarouselProduct";
import ProductDetails_1 from "../components/ProductDetails_1";
import ProductDetailsPrice from "../components/ProductDetailsPrice";
import { useDispatch, useSelector } from "react-redux";
import { addCartRow } from "../../reducers/UiReducer";

const ProductQRDetail = () => {
  const { addToCartItem } = useContext(CartContext);
  const route = useRoute();
  const navigation = useNavigation();
  const product = route.params.item;
  const { login } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const images = (() => {
    try {
      return typeof product[0]?.details?.image === "string"
        ? JSON.parse(product[0]?.details?.image)
        : product[0]?.details?.image || [];
    } catch (error) {
      console.error("Failed to parse images:", error);
      return [];
    }
  })();

  const handleAddToCart1 = () => {
    const data = Number(
      Math.round(
        Number(product[0]?.sale_price) +
          (Number(product[0]?.sale_price) * (product[0]?.category?.gst || 0)) /
            100
      )
    );
    const productdata = {
      ...product[0],
      sale_price: data,
    };
    dispatch(addCartRow(productdata));
    navigation.navigate("CART");
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("Landing");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <StatusBar backgroundColor="#88dae0" barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Header
              isCart={true}
              name={`${product[0].category?.name} ${product[0].brand?.name}`}
            />
          </View>
          <View style={styles.imageContainer}>
            <CarouselProduct images={images} />
          </View>
          <ProductDetails_1 product={product[0]} />
        </ScrollView>
        <View style={{ padding: 15 }}>
          <ProductDetailsPrice
            product={product[0]}
            login={login}
            handleAddToCart={handleAddToCart1}
          />
        </View>
      </View>
    </>
  );
};

export default ProductQRDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    height: 420,
    width: "100%",
  },
});