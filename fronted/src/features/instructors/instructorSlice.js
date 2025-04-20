import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchInstructors = createAsyncThunk(
  'instructors/fetchInstructors',
  async () => {
    const res = await axios.get('http://localhost:5000/api/instructors');
    return res.data;
  }
);

const instructorSlice = createSlice({
  name: 'instructors',
  initialState: {
    data: [],
    status: 'idle'
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstructors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchInstructors.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export default instructorSlice.reducer;
