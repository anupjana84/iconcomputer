import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const CarouselBottom = () => {
  const flatlistRef = useRef(null);
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const { banner, productBottom } = useSelector((state) => state.home);
  const navigation = useNavigation();

  // //  console.log("productBottom", productBottom);
  // Auto Scroll
  useEffect(() => {
    if (!productBottom?.data?.length) return; // Avoid running if no data

    const interval = setInterval(() => {
      const nextIndex =
        activeIndex >= productBottom.data.length - 1 ? 0 : activeIndex + 1;

      // Use safe scrolling with bounds checking
      try {
        flatlistRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        setActiveIndex(nextIndex);
      } catch (error) {
        console.warn("Scroll to index failed", error);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIndex, productBottom?.data?.length]);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index,
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("PRODUCT_DETAILS", { item })}
    >
      <View>
        <Image
          source={{ uri: item.details?.thumbnail_image }}
          style={{ height: 200, width: screenWidth, resizeMode: "contain" }}
        />
      </View>
    </TouchableOpacity>
  );

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth); // Round to avoid floating-point issues
    setActiveIndex(index);
  };

  const renderDotIndicators = () =>
    productBottom?.data?.map((_, index) => (
      <View
        key={index}
        style={{
          backgroundColor: activeIndex === index ? "green" : "red",
          height: 10,
          width: 10,
          borderRadius: 5,
          marginHorizontal: 6,
        }}
      />
    ));

  return (
    <View style={{ backgroundColor: "white", paddingBottom: 50 }}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={productBottom?.data}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default CarouselBottom;

const styles = StyleSheet.create({});
