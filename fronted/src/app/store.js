import { configureStore } from '@reduxjs/toolkit';
import instructorReducer from '../features/instructors/instructorSlice';
import courseReducer from '../features/courses/courseSlice';
import lectureReducer from '../features/lectures/lectureSlice';

const store = configureStore({
  reducer: {
    instructors: instructorReducer,
    courses: courseReducer,
    lectures: lectureReducer
  }
});

export default store;
