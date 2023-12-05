import { GetComment } from '@/Constants/Api/Api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (id, thunkAPI) => {
    try {
      const response = await GetComment(id);
     // Replace GetComment with your actual API call
      return response.data; 
      // Assuming the response has a 'data' property containing comments
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const commentSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default commentSlice.reducer;
