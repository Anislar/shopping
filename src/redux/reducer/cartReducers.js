import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MainService from "../../services/main.services";

export const addToCart = createAsyncThunk(
  "carts/post",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await MainService.addToCart(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    carts: [],
    status: {
      action: "",
      state: "idle",
      id: null,
    },
  },
  reducers: {
    // Reset cart
    resetCart: (state) => {
      state.carts = [];
    },
    // Update quantity of a product in the cart
    updateQteCart: (state, action) => {
      if (action.payload.quantity === 0) {
        state.carts = state.carts.filter(
          (cart) => cart?.productId !== action.payload.productId
        );
        return;
      }
      state.carts = state.carts.map((cart) => {
        if (cart?.productId === action.payload.productId) {
          return { ...cart, quantity: action.payload.quantity };
        }
        return cart;
      });
    },
  },
  extraReducers: (builder) => {
    // Get all carts

    // Add to cart
    builder.addCase(addToCart.pending, (state, action) => {
      state.status = {
        state: "loading",
        id: action.meta.arg.products[0].productId,
      };
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const payload = { ...action.payload.products[0] };
      let array = [];
      if (
        state.carts.length === 0 ||
        state.carts.find((cart) => cart?.productId === payload.productId) ===
          undefined
      ) {
        array = [...state.carts, payload];
      } else {
        array = [...state.carts].map((cart) => {
          if (cart?.productId === payload.productId) {
            return { ...cart, quantity: cart.quantity + 1 };
          } else {
          }
        });
      }

      state.carts = [...array];
      state.status = {
        state: "success",
        id: null,
      };
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.status = {
        state: "error",
        id: null,
      };
    });
  },
});

export default cartSlice.reducer;
export const { resetCart, updateQteCart } = cartSlice.actions;
//
