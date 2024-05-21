import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { hp, truncateText } from "../helpers/commons";
import { theme } from "../constants/theme";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducers";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";
import ButtonPrimary from "./Button";

/**
 *
 * this component is used to display a single product item
 *
 * @param {object} item
 * item: product item to be displayed
 * @returns
 */
export const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const { status } = useSelector((state) => state.cart);

  // Add to cart functionality
  const addCart = () => {
    dispatch(
      addToCart({
        userId: 1,
        date: new Date().toISOString(),
        products: [
          {
            productId: item.id,
            quantity: 1,
          },
        ],
      })
    );
    // Handle add to cart functionality
  };
  if (!item) return <View />;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("DetailProduct", { product: item });
      }}>
      <Animated.View
        entering={FadeInDown.delay(item.id * 100).springify()}
        style={styles.container}>
        <Animated.Image
          sharedTransitionTag={"prodcutImage"}
          source={{ uri: item.image }}
          style={styles.image}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>$ {item.price}</Text>
          <Text style={styles.description}>
            {truncateText(item.description, 100)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: theme.space.xs,
            }}>
            <AntDesign name="star" size={20} color="#FCD259ff" />
            <Text style={styles.rating}>
              {item.rating.rate} ({item?.rating?.count} reviews)
            </Text>
          </View>
          <ButtonPrimary
            disabled={status.state === "loading" && item.id === status.id}
            onPress={addCart}
            title={
              status.state === "loading" && item.id === status.id
                ? "Chargement..."
                : "Add to Cart"
            }
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: theme.raduis.lg,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    margin: 10,
    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: "auto",
    marginHorizontal: 5,
    objectFit: "contain",
  },
  details: {
    paddingLeft: 10,
    flex: 1,
    paddingVertical: theme.space.sm,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    flex: 1,
    fontSize: hp(2),
    color: theme.colors.black,
  },
  description: {
    paddingVertical: theme.space.xs,
    fontSize: hp(1.7),
    color: "#666",
  },
  rating: {
    fontSize: hp(1.8),
    marginHorizontal: theme.space.xs,
    color: "#444",
  },
});
