import { configureStore } from '@reduxjs/toolkit';
import brandReducer from '../slices/brandSlice';
import vehicleReducer from '../slices/vehicleSlice';
import mapReducer from '../slices/mapSlice';
import notificationReducer from '../slices/notificationSlice';
import driverReducer from '../slices/driverSlice';
import userReducer from '../slices/userSlice';
import anomalyDetection from '../slices/anomalyDetectionSlice';
import profilReducer from '../slices/profilSlice';
import organizationReducer from '../slices/organizationSlice';


import menuReducer from '../slices/menuSlice';

const store = configureStore({
  reducer: {
    trackers: brandReducer,
    vehicles: vehicleReducer,
    map: mapReducer,
    notification:notificationReducer,
    drivers:driverReducer,
    user:userReducer,
    anomalyDetection:anomalyDetection,
    menu:menuReducer,
    profil:profilReducer,
    organization:organizationReducer
  },
});

export default store;
