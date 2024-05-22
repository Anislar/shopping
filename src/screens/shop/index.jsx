import { FlatList, Text, View } from "react-native";
import { styles } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { resetCart } from "../../redux/reducer/cartReducers";
import ButtonPrimary from "../../components/Button";
import { truncateText } from "../../helpers/commons";

export const Shopping = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { carts } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.product);
  const getProduct = (id) => {
    try {
      return allProducts?.find((product) => product.id === id);
    } catch (error) {
      return "";
    }
  };

  // Get total price
  const getTotal = () => {
    let total = 0;
    carts?.forEach((item) => {
      total += getProduct(item.productId)?.price * item.quantity;
    });
    return total.toFixed(2);
  };
  function Totals() {
    return (
      <View style={styles.cartLineTotal}>
        <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
        <Text style={styles.lineRight}>$ {getTotal()}</Text>
      </View>
    );
  }
  // render item
  function renderItem({ item }) {
    return (
      <View style={styles.cartLine}>
        <Text style={styles.lineLeft}>
          {" "}
          {truncateText(getProduct(item?.productId)?.title, 30)} x{" "}
          {item.quantity}
        </Text>
        <Text style={styles.lineRight}>
          $ {getProduct(item?.productId)?.price?.toFixed(2)}{" "}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={carts}
        renderItem={renderItem}
        keyExtractor={(item) => item.productId?.toString()}
        ListFooterComponent={Totals}
      />
      <View
        style={{
          margin: 20,
        }}>
        <ButtonPrimary
          onPress={() => {
            alert("Checkout success", "Thank you for your purchase");
            setTimeout(() => {
              navigation.navigate("Home");
              dispatch(resetCart());
            }, 1500);
          }}
          title="Checkout"
        />
      </View>
    </View>
  );
};
