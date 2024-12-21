import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { polygon } from 'leaflet';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';
import keycloak from '../keycloak/keycloak';

const apiUrl = "http://localhost:8091";
const apiGateWay = "http://localhost:8222";

const apiPositionUrl = "http://localhost:8092";

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




export const getAllVehiclesMapSlice = createAsyncThunk('map/getAllVehiclesSlice', async (_,{ getState }) => {

  try {

    const state = getState();
    const token = state.user.auth.token;
    const roles = state.user.userState.realm_access.roles;
    const organization = state.user.userState.organization;
    let res = "";
    if (roles.includes("ADMIN")) {
       res = await axios.get(apiGateWay + "/api/v1/vehicles", {
        headers: { 'Authorization': `Bearer ${token}` }
      });

    } else {
       res = await axios.get(apiGateWay + "/api/v1/vehicles/organization/"+organization, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

    }

   
    if (res.status === 200) {  // Checking for HTTP 200 status
      //console.log(res.data);
      toast.success(res.data.message)
      return res.data.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});


export const addPolygone = createAsyncThunk('map/createGeofence', async (data, { getState }) => {

  const state = getState();
  // console.log("state++++++++",state)
  const token = state.user.auth.token; // Assuming your token is stored in the auth slice.

  console.log("createGeofence add action... ", data)
  try {
    const res = await axios.post(apiGateWay + "/api/v1/positions/geofence/create", {
      // username: data.username,
      username:state.user.userState.organization,
      label: data.label,
      timestamp: Date.now(),
      locations: data.polygoneData[0],
      color: "#5594e8"
    }, {
      headers: {
        Authorization: `Bearer ${token}`  // Use the token here.
      }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      //console.log(res.data);
      toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;  // Rethrow error to handle in the async thunk
  }
});


export const getPolygone = createAsyncThunk('map/getPolygone', async (data, { getState }) => {

  const state = getState();
  // console.log("state++++++++",state)
  const token = state.user.auth.token; // Assuming your token is stored in the auth slice.


  console.log("getPolygone get action...", data)
  try {
    const res = await axios.get(apiGateWay + "/api/v1/positions/geofence/by-username/" + (state.user.userState.organization || "UNKOWN"), {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      console.log(res.data);
      // toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});



export const updateShape = createAsyncThunk('map/updateShape', async (shapeData,{getState}) => {
  console.log("shapeData action...")
  try {
    const state = getState();
    const token = state.user.auth.token;
    const res = await axios.put(apiGateWay + "/api/v1/positions/geofence/update/" + shapeData.id, { ...shapeData }
    ,{
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      console.log(res.data);
      // toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});

export const deleteShape = createAsyncThunk('map/deleteShape', async (shapeDataId,{getState}) => {
  console.log("deleteShape shapeData action...")
  try {
    const state = getState();
    const token = state.user.auth.token;
    const res = await axios.delete(apiGateWay + "/api/v1/positions/geofence/delete/" + shapeDataId
    ,{
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      console.log(res.data);
      // toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});


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
  async ({ vehicleID, startDateTime, endDateTime }, { rejectWithValue,getState }) => {
    try {
      const state = getState();
      const token = state.user.auth.token;
      console.log(" data ", { vehicleID, startDateTime, endDateTime })
      const res = await axios.get(
        `${apiUrl}/api/v1/vehicles/history?vehicleID=${vehicleID}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`
        ,{
          headers: { 'Authorization': `Bearer ${token}` }
        }
        );
      if (res.status === 200) {
        console.log("response from history", res.data)
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


const mapSlice = createSlice({
  name: 'map',
  initialState: {
    // listTrackers: [], 
    selectedVehicle: {},
    vehicleList: [],
    trackingResponse: {},
    listPolygon: [],
    mapSettings: {
      reelTimeTracking: true,
      darkMode: false,
      pathCorrection: false,
    },
    isOpenShowVehiclePanel: false,
    isOpenShowPolygonPanel: true,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    locationData: null, // To store location data

  },

  reducers: {
    // Example of an additional synchronous action
    handleSelectVehicle: (state, action) => {
      //state.list.push(action.payload);
      console.log("payload selected vl ", action.payload);
      state.selectedVehicle = action.payload;
      //  state.selectedVehicle = state.vehicleList[action.payload.lastPosition.imei];
    },
    // update data of position 
    handleUpdateListVlState: (state, action) => {
      //state.list.push(action.payload);
      console.log(" =========> data kafka vl ", action.payload);
      // state.selectedVehicle = action.payload;
      state.vehicleList[action.payload.imei].lastPosition = action.payload;
      state.vehicleList[action.payload.imei].currentDriver = action.payload.driver;
      // if( state.selectedVehicle && action.payload.imei == state.selectedVehicle.lastPosition.imei){
      //   state.selectedVehicle.lastPosition = action.payload;
      // }

    },

    // Tracker
    openPanelShowVehicle: (state, action) => {
      state.isOpenShowVehiclePanel = true;
    },
    closePanelShowVehicle: (state, action) => {
      state.isOpenShowVehiclePanel = false;
      state.selectedVehicle = {}
    },
    // POLYGON PANEL
    openPanelShowPolygon: (state, action) => {
      state.isOpenShowPolygonPanel = true;
    },
    closePanelShowPolygon: (state, action) => {
      state.isOpenShowPolygonPanel = false;
    },
    updateReelTimeTrackingChecking: (state, action) => {
      state.mapSettings.reelTimeTracking = action.payload;
      toast.info("Real time tracking " + (action.payload == true ? "enabled" : "disabled"))
    },
    updateDarkModeChecking: (state, action) => {
      state.mapSettings.darkMode = action.payload;
      toast.info("Dark Mode " + (action.payload == true ? "enabled" : "disabled"))
    },
    updatePathCorrectionChecking: (state, action) => {
      state.mapSettings.pathCorrection = action.payload;
      toast.info("Path Correction  " + (action.payload == true ? "enabled" : "disabled"))
    },
    handleDisableVehicle: (state, action) => {
      // state.mapSettings.reelTimeTracking = action.payload;
      // toast.info("Real time tracking "+ (action.payload == true ? "enabled" : "disabled"))
      // console.log(action.payload)
      state.vehicleList[action.payload].disabled = !state.vehicleList[action.payload].disabled
    },

    handleChangeColorPolygon: (state, action) => {
      const { id, color } = action.payload;
      console.log(id, color)
      state.listPolygon = state.listPolygon.map((polygon) => {
        if (polygon.id === id) {
          polygon.color = color;
          return polygon;
        } else {
          return polygon
        }
      })

    }


  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleLocation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicleLocation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.locationData = action.payload;
        console.log(state.locationData)
      })
      .addCase(fetchVehicleLocation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      //Tracking
      .addCase(fetchHistoryVehicle.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHistoryVehicle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.trackingResponse = action.payload;
        console.log(state.trackingResponse)
      })
      .addCase(fetchHistoryVehicle.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      //Map Vehicle
      .addCase(getAllVehiclesMapSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllVehiclesMapSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.vehicleList = action.payload.reduce((acc, vl) => {
          acc[vl.tracker.imei] = { ...vl, disabled: false }; // Add each vehicle with its IMEI as the key
          return acc;
        }
          , {}
        );
      })
      .addCase(getAllVehiclesMapSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error("Something went wrong. If the problem persists, please contact support.");

      })
      .addCase(addPolygone.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPolygone.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listPolygon.push(action.payload);
        console.log(state.payload)
      })
      .addCase(addPolygone.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //get polygon list
      .addCase(getPolygone.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPolygone.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listPolygon = action.payload;
        console.log(state.locationData)
      })
      .addCase(getPolygone.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      //update shape
      .addCase(updateShape.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateShape.fulfilled, (state, action) => {
        state.status = 'succeeded';
        toast.success("Shape data updted successfully")
        state.listPolygon = state.listPolygon.map((polygon) => {
          if (polygon.id == action.payload.id) {
            return action.payload
          }
          return polygon;
        })
      })
      .addCase(updateShape.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        toast.error("Something went wrong. If the problem persists, please contact support.");

      })
      .addCase(deleteShape.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteShape.fulfilled, (state, action) => {
        state.status = 'succeeded';
        toast.info("Shape deleted")
        state.listPolygon = state.listPolygon.filter(pol => pol.id != action.payload)
      })
      .addCase(deleteShape.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");

      })
  },


});

export const { handleSelectVehicle, openPanelShowVehicle, closePanelShowVehicle, handleUpdateListVlState,
  updateReelTimeTrackingChecking, handleDisableVehicle, updateDarkModeChecking, updatePathCorrectionChecking,
  openPanelShowPolygon, closePanelShowPolygon, handleChangeColorPolygon } = mapSlice.actions;
export default mapSlice.reducer;
