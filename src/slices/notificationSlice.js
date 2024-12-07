import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:8091";

const apiNominatim = "http://localhost:8080";


// export const addVehicleSlice = createAsyncThunk('vehicles/addVehicles', async (vehicleState) => {

//   try {
//     console.log(" slice vehicle add function ", vehicleState)
//     const res = await axios.post(apiUrl + "/api/v1/vehicles", {
//       ...vehicleState
//     });

//     if (res.status === 200) {
//       //console.log(res.data);
//       toast.success(res.data.message)
//       return res.data.data;
//     } else {
//       toast.error(res.data.message)
//       // console.error("Unexpected response status:", res.status);
//       // throw new Error("Failed to fetch trackers");  // Throw error to handle in `createAsyncThunk`
//     }

//   } catch (error) {
//     console.error("Error fetching trackers:", error.message);
//     throw error;  // Rethrow error to handle in the async thunk
//   }
// })




// export const getAllVehiclesMapSlice = createAsyncThunk('map/getAllVehiclesSlice', async () => {

//   try {
//     const res = await axios.get(apiUrl + "/api/v1/vehicles");

//     if (res.status === 200) {  // Checking for HTTP 200 status
//       //console.log(res.data);
//       toast.success(res.data.message)
//       return res.data.data;  // Return the data if needed for further use
//     } else {
//       toast.error(res.data.message)
//     }
//   } catch (error) {
//     console.error("Error fetching brands:", error.message);
//     throw error;  // Rethrow error to handle in the async thunk
//   }
// });






// export const updateVehicleSlice = createAsyncThunk('vehicles/updateVehicleSlice', async (vehicleState, { rejectWithValue }) => {
//   try {
//     console.log("update vehicle slice ", vehicleState);
//     const res = await axios.put(apiUrl + "/api/v1/vehicles/" + vehicleState.id, {
//       ...vehicleState

//     });


//     toast.success(res.data.message);
//     return res.data.data;


//   } catch (error) {
//     if (error.response && error.response.status === 400 && error.response.data.data) {
//       // Pass the specific validation errors to `rejected` case
//       return rejectWithValue(error.response.data.data);
//     } else {
//       console.error("Error updating tracker:", error.message);
//       throw error;
//     }
//   }
// });

// export const deleteVehicleSlice = createAsyncThunk('vehicle/deleteVehicleSlice', async (vehicleId) => {
//   try {
//     const res = await axios.delete(apiUrl + "/api/v1/vehicles/" + vehicleId);
//     if (res.status === 200) {  // Checking for HTTP 200 status
//       //console.log(res.data);
//       toast.success(res.data.message)
//       return res.data.data;  // Return the data if needed for further use
//     } else {
//       toast.error(res.data.message)
//     }
//   } catch (error) {
//     console.error("Error fetching brands:", error.message);
//     throw error;  // Rethrow error to handle in the async thunk
//   }
// })


export const fetchVehicleLocation = createAsyncThunk(
  'map/fetchVehicleLocation',
  async ({ latitude, longitude }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${apiNominatim}/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      if (res.status === 200) {
        return res.data; // Return geocoding data
      } else {
        toast.error("Failed to fetch location data.");
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      toast.error("Error fetching location data.");
      return rejectWithValue(error.message);
    }
  }
);


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


const notificationSlice = createSlice({
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
    handleAddNotificationList: (state, action) => {
      console.log(" =========> notification ", action.payload);
      state.notificationList.push(action.payload);
      if(action.payload.notificationStatus =="UNREAD" ){
        state.unreadNotification++;
      }
    },
    handleTooggleDropdownMenu: (state, action) => {
     state.isDropdownMenuVisibe = !state.isDropdownMenuVisibe;
    },
    handleReadNotification: (state, action) => {
     
      console.log(action.payload)
      state.notificationList = state.notificationList.map((notif)=>{
        if(notif.timestamp == action.payload){
            notif.notificationStatus = "READED"
            --state.unreadNotification;
            return notif;
         
        }
        return notif;
      }
      )
     },
 

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

export const { handleAddNotificationList,handleTooggleDropdownMenu,handleReadNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
