import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import { useDispatch, useSelector } from "react-redux";

import { getAllProducts } from "../../redux/reducer/productReducers";
import { ProductItem, Categories } from "../../components";

import { theme } from "../../constants/theme";
import { styles } from "./style";
import { hp } from "../../helpers/commons";
import { StatusBar } from "expo-status-bar";
export const Home = () => {
  const { top } = useSafeAreaInsets();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { carts } = useSelector((state) => state.cart);
  const { products, status, filter } = useSelector((state) => state.product);

  const [slice, setSlice] = useState(5);
  const paddingTop = top > 0 ? top + 5 : 10;
  useEffect(() => {
    dispatch(getAllProducts(filter));
  }, [filter]);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#f5f5f5" translucent={false} />
      {/* Header */}
      <View style={[styles.header, { paddingTop }]}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
          }}
          style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerText} numberOfLines={1}>
            Hi, Med Ali 👋
          </Text>
          <Text style={styles.headerSubText} numberOfLines={1}>
            Let's discover the best products...
          </Text>
        </View>

        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => {
            navigation.navigate("Cart");
          }}>
          <AntDesign name="shoppingcart" size={24} />
          <Text
            style={[
              styles.cartText,
              {
                display: carts?.length === 0 ? "none" : "flex",
              },
            ]}>
            {" "}
            {carts?.length}{" "}
          </Text>
        </TouchableOpacity>
      </View>
      {/* Categories */}

      <Categories />
      {/* List */}

      <View style={styles.list}>
        {["loading", "error"].includes(status) ? (
          <View style={styles.container_grid}>
            {status === "loading" ? (
              <ActivityIndicator size="large" color={theme.colors.black} />
            ) : status === "error" ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: theme.space.xs,
                }}>
                <MaterialIcons
                  name="error"
                  size={hp(3.5)}
                  color={theme.colors.danger}
                />
                <Text style={styles.errorText}>Something went wrong!</Text>
              </View>
            ) : null}
          </View>
        ) : (
          <FlashList
            data={Array.isArray(products) ? products.slice(0, slice) : []}
            renderItem={({ item }) => <ProductItem item={item} />}
            keyExtractor={(item) => item.id}
            estimatedItemSize={200}
            onEndReachedThreshold={0.5}
            refreshing={status === "loading"}
            ListEmptyComponent={() => (
              <View style={styles.container_grid}>
                <Text style={styles.emptyText}>No results found!</Text>
              </View>
            )}
            onRefresh={() => {
              dispatch(getAllProducts(filter));
            }}
            onEndReached={() => {
              // console.log("end");
              setSlice((prev) => prev + 5);
            }}
          />
        )}
      </View>
    </View>
  );
};
