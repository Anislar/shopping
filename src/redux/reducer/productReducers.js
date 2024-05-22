import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MainService from "../../services/main.services";

export const getAllProducts = createAsyncThunk(
  "products/get",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await MainService.getProducts(payload);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    // Add products
    products: [],
    // Add allProducts
    allProducts: [],
    status: "idle",
    filter: "all",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      if (action.meta.arg === "all") state.allProducts = action.payload;
      state.status = "success";
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default productSlice.reducer;
export const { setFilter } = productSlice.actions;
