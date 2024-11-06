import { configureStore } from '@reduxjs/toolkit';
import trackerReducer from '../slices/trackerSlice';

const store = configureStore({
  reducer: {
    trackers: trackerReducer,
  },
});

export default store;
