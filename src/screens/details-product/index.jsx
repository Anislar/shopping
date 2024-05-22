import React from "react";
import { View, Text, Button } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { addToCart } from "../../redux/reducer/cartReducers";
import { useDispatch, useSelector } from "react-redux";
import Animated, { FadeInDown } from "react-native-reanimated";

import { styles } from "./style";
import ButtonPrimary from "../../components/Button";
export const DetailProduct = ({ route }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const { status } = useSelector((state) => state.cart);

  // Add to cart functionality
  const addCart = () => {
    dispatch(
      addToCart({
        userId: 1,
        date: new Date().toISOString(),
        products: [
          {
            productId: product.id,
            quantity: 1,
          },
        ],
      })
    );
    // Handle add to cart functionality
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}>
      <View style={styles.container}>
        <Animated.Image
          sharedTransitionTag={"prodcutImage"}
          source={{ uri: product.image }}
          style={styles.image}
        />
        <Animated.Text entering={FadeInDown.delay(350)} style={styles.title}>
          {product.title}
        </Animated.Text>
        <Animated.Text entering={FadeInDown.delay(400)} style={styles.price}>
          ${product.price}
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(450)}
          style={styles.description}>
          {product.description}
        </Animated.Text>

        <Animated.View
          entering={FadeInDown.delay(500)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: theme.space.xs,
          }}>
          <AntDesign name="star" size={20} color="#FCD259ff" />
          <Text style={styles.rating}>
            {product.rating.rate} ({product?.rating?.count} reviews)
          </Text>
        </Animated.View>
      </View>
      <Animated.View
        entering={FadeInDown.delay(550)}
        style={{
          width: "100%",
          padding: theme.space.xxl,
          borderRadius: theme.raduis.xl,
        }}>
        <ButtonPrimary
          disabled={status.state === "loading" && item.id === status.id}
          onPress={addCart}
          title={
            status.state === "loading" && item.id === status.id
              ? "Chargement..."
              : "Add to Cart"
          }
        />
      </Animated.View>
    </View>
  );
};
