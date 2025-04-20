import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const res = await axios.get('http://localhost:5000/api/courses');
    return res.data;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    data: [],
    status: 'idle'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default courseSlice.reducer;
