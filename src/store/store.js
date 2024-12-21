import { configureStore } from '@reduxjs/toolkit';
import brandReducer from '../slices/brandSlice';
import vehicleReducer from '../slices/vehicleSlice';
import mapReducer from '../slices/mapSlice';
import notificationReducer from '../slices/notificationSlice';
import driverReducer from '../slices/driverSlice';
import userReducer from '../slices/userSlice';


const store = configureStore({
  reducer: {
    trackers: brandReducer,
    vehicles: vehicleReducer,
    map: mapReducer,
    notification:notificationReducer,
    drivers:driverReducer,
    user:userReducer
  },
});

export default store;
