// clientProfileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LikeApi } from "@/Constants/Api/Api";

export const getLike = createAsyncThunk(
  "profile/getprofile",
  async (value) => {
    try {
      const response = await LikeApi(value);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const getlikeSlice = createSlice({
  name: "like",
  initialState: {
    clientProfile: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLike.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLike.fulfilled, (state, action) => {
        state.loading = false;
        state.clientProfile = action.payload;
      })
      .addCase(getLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default getlikeSlice.reducer;
