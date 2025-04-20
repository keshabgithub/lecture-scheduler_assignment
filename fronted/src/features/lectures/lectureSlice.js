import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchLectures = createAsyncThunk(
  'lectures/fetchLectures',
  async () => {
    const res = await axios.get('http://localhost:5000/api/lectures');
    return res.data;
  }
);

const lectureSlice = createSlice({
  name: 'lectures',
  initialState: {
    data: [],
    status: 'idle'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLectures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLectures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLectures.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default lectureSlice.reducer;
