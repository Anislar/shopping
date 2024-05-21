import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { hp, truncateText } from "../helpers/commons";
import { AntDesign } from "@expo/vector-icons";
import { updateQteCart } from "../redux/reducer/cartReducers";

/**
 * Cart item component to display a single item in the cart
 *
 * @param {object} item
 * item: item to be displayed
 * @param {function} getProduct
 * getProduct: function to get product details from product id
 * @returns
 */
export const CartItem = ({ item, getProduct }) => {
  const dispatch = useDispatch();

  return (
    <View key={item?.productId} style={styles.cartItem}>
      <View style={styles.detailContainer}>
        <Image
          source={{ uri: getProduct(item?.productId)?.image }}
          style={{ width: 50, height: 50, objectFit: "cover" }}
          borderRadius={50}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.title}>
            {truncateText(getProduct(item?.productId)?.title ?? "", 30)}
          </Text>
          <Text style={styles.price}>
            ${getProduct(item?.productId)?.price?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                updateQteCart({
                  productId: item?.productId,
                  quantity: item?.quantity - 1,
                })
              );
            }}>
            <AntDesign name="minuscircleo" size={22} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item?.quantity}</Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(
                updateQteCart({
                  productId: item?.productId,
                  quantity: item?.quantity + 1,
                })
              );
            }}>
            <AntDesign name="pluscircleo" size={22} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: hp(1.4),
    fontWeight: "bold",
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  quantityContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    fontSize: hp(10),
    paddingHorizontal: 10,
    color: "#ff6347",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
