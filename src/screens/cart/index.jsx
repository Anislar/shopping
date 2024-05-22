import { View, Text, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { FlashList } from "@shopify/flash-list";

import { Ionicons } from "@expo/vector-icons";
import { theme } from "../../constants/theme";
import { CartItem } from "../../components";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../components/Button";
import { styles } from "./style";

/**
 * this is the Cart screen
 *
 * @returns
 */
export const Cart = () => {
  const navigation = useNavigation();
  const { status, carts } = useSelector((state) => state.cart);
  const { products } = useSelector((state) => state.product);

  // Get product by id from the list of products
  const getProduct = (id) => {
    try {
      return products?.find((product) => product.id === id);
    } catch (error) {
      return "";
    }
  };

  // Get total price
  const getTotal = () => {
    let total = 0;
    carts?.forEach((item) => {
      total += getProduct(item?.productId)?.price * item?.quantity;
    });
    return total.toFixed(2);
  };
  // Loading state
  if (status.state === "loading") return <ActivityIndicator size="large" />;
  return (
    <View style={styles.container}>
      {/* List of items */}
      <FlashList
        ListHeaderComponent={() => (
          <Text style={styles.cartTitle}> List of Item: {carts?.length} </Text>
        )}
        ListEmptyComponent={
          <View style={styles.container_grid}>
            <Text style={styles.emptyText}>No results found!</Text>
          </View>
        }
        estimatedItemSize={200}
        data={carts}
        renderItem={({ item }) => (
          <CartItem item={item} getProduct={getProduct} />
        )}
      />

      {/* Total price */}
      {carts?.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:$ {getTotal()} </Text>
          <ButtonPrimary
            Icon={
              <Ionicons
                name="cart"
                style={{ marginRight: 5 }}
                size={24}
                color={theme.colors.white}
              />
            }
            disabled={status.state === "loading" && item.id === status.id}
            onPress={() => navigation.navigate("Checkout")}
            title="Proceed to checkout"
          />
        </View>
      )}
    </View>
  );
};
