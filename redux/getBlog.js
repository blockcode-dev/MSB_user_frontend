// clientProfileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BlogDetailAPI } from "@/Constants/Api/Api";

export const getBlog = createAsyncThunk(
  "profile/getprofile",
  async (value) => {
    try {
      const response = await BlogDetailAPI(value);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const getBlogSlice = createSlice({
  name: "getBlogDetail",
  initialState: {
    clientProfile: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProfile = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getBlogSlice.reducer;
