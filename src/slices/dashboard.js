import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:8091";




export const fetchHistoryVehicle = createAsyncThunk(
  'map/fetchHistoryVehicle',
  async ({ vehicleID, startDateTime, endDateTime }, { rejectWithValue }) => {
    try {
      console.log(" data ",{ vehicleID, startDateTime, endDateTime })
      const res = await axios.get(
        `${apiUrl}/api/v1/vehicles/history?vehicleID=${vehicleID}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`
      );
      if (res.status === 200) {
        console.log("response from history",res.data)
        return res.data; // Return geocoding data
      } else {
        toast.error("Failed to fetch Tracking data.");
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      toast.error("Error fetching Tracking data.");
      return rejectWithValue(error.message);
    }
  }
);


const dashboardSlice = createSlice({
  name: 'notification',
  initialState: {
    notificationList: [],
    unreadNotification:0,
    isDropdownMenuVisibe : false,
    status: 'idle', 
    error: null,
    locationData: null, // To store location data

  },

  reducers: {

    // Add notification list 
    // handleAddNotificationList: (state, action) => {
    //   console.log(" =========> notification ", action.payload);
    //   state.notificationList.push(action.payload);
    //   if(action.payload.notificationStatus =="UNREAD" ){
    //     state.unreadNotification++;
    //   }
    // },

 

  },

  extraReducers: (builder) => {
    builder
      // .addCase(fetchVehicleLocation.pending, (state) => {
      //   state.status = 'loading';
      // })
      // .addCase(fetchVehicleLocation.fulfilled, (state, action) => {
      //   state.status = 'succeeded';
      //   state.locationData = action.payload;
      //   console.log(state.locationData)
      // })
      // .addCase(fetchVehicleLocation.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.payload;
      // })

  },


});

export const {  } = dashboardSlice.actions;
export default dashboardSlice.reducer;
