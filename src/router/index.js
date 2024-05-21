import { resetCart } from "../redux/reducer/cartReducers";
import { store } from "../redux/store";
import { Home, DetailProduct, Shopping, Cart } from "../screens";
import { EvilIcons } from "@expo/vector-icons";
export const routerArray = [
  {
    name: "Home",
    component: Home,
    options: { headerShown: false },
  },
  {
    name: "DetailProduct",
    component: DetailProduct,
    options: {
      headerShown: true,
      title: "Detail Product",
      headerStyle: {
        backgroundColor: "#fcfcfc",
      },
    },
  },
  {
    name: "Cart",
    component: Cart,
    options: {
      headerShown: true,
      headerRight: () => (
        <EvilIcons
          onPress={() => {
            store.dispatch(resetCart());
          }}
          name="trash"
          size={30}
          color="black"
        />
      ),

      title: "Cart",
      headerStyle: {
        backgroundColor: "#fcfcfc",
      },
    },
  },
  {
    name: "Checkout",
    component: Shopping,
    options: {
      headerShown: true,
      title: "Checkout",
      headerStyle: {
        backgroundColor: "#fcfcfc",
      },
    },
  },
];
