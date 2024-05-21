import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MainService from "../../services/main.services";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
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
      state.status = "success";
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.status = "error";
    });
  },
});
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

export default productSlice.reducer;
export const { setFilter } = productSlice.actions;
