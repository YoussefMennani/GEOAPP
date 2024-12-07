import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:8091";



export const addVehicleSlice = createAsyncThunk('vehicles/addVehicles', async (vehicleState) => {

  try {
    console.log(" slice vehicle add function ", vehicleState)
    const res = await axios.post(apiUrl + "/api/v1/vehicles", {
      ...vehicleState
    });

    if (res.status === 200) {
      //console.log(res.data);
      toast.success(res.data.message)
      return res.data.data;
    } else {
      toast.error(res.data.message)
      // console.error("Unexpected response status:", res.status);
      // throw new Error("Failed to fetch trackers");  // Throw error to handle in `createAsyncThunk`
    }

  } catch (error) {
    console.error("Error fetching trackers:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
})




export const getAllVehiclesSlice = createAsyncThunk('vehicles/getAllVehiclesSlice', async () => {

  try {
    const res = await axios.get(apiUrl + "/api/v1/vehicles");

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







export const updateVehicleSlice = createAsyncThunk('vehicles/updateVehicleSlice', async (vehicleState, { rejectWithValue }) => {
  try {
    console.log("update vehicle slice ", vehicleState);
    const res = await axios.put(apiUrl + "/api/v1/vehicles/" + vehicleState.id, {
      ...vehicleState

    });


    toast.success(res.data.message);
    return res.data.data;


  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.data) {
      // Pass the specific validation errors to `rejected` case
      return rejectWithValue(error.response.data.data);
    } else {
      console.error("Error updating tracker:", error.message);
      throw error;
    }
  }
});

export const deleteVehicleSlice = createAsyncThunk('vehicle/deleteVehicleSlice', async (vehicleId) => {
  try {
    const res = await axios.delete(apiUrl + "/api/v1/vehicles/" + vehicleId);
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
})



export const getVehicleByLicensePlateMapSlice = createAsyncThunk('map/getVehicleByLicensePlateMapSlice', async (licensePlate) => {

  try {
    const res = await axios.get(apiUrl + "/api/v1/vehicles/byLicensePlate/" + licensePlate);

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



const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    // listTrackers: [], 
    targetVehicle: {},
    listVehicles: [],
    trackingListPosition:[],
    isOpenEditModal: false,
    isOpenDeleteModal: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  reducers: {
    // Example of an additional synchronous action
    addVehicle: (state, action) => {
      state.list.push(action.payload);
    },

    // Tracker
    openModalEditVehicle: (state, action) => {
      state.isOpenEditModal = true;
    },
    closeModalEditVehicle: (state, action) => {
      state.isOpenEditModal = false;
    },
    openModalDeleteVehicle: (state, action) => {
      state.isOpenDeleteModal = true;
    },
    closeModalDeleteVehicle: (state, action) => {
      state.isOpenDeleteModal = false;
    }


  },
  extraReducers: (builder) => {
    builder


      //############################################   VEHICLE   ###################################
      // add model
      .addCase(addVehicleSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addVehicleSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenEditModal = false;
        state.listVehicles.push(action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(addVehicleSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      // GET ALL TRACKERS
      .addCase(getAllVehiclesSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllVehiclesSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listVehicles = action.payload;
      })
      .addCase(getAllVehiclesSlice.rejected, (state, action) => {
        state.status = 'failed';
        toast.error("Something went wrong. If the problem persists, please contact support.");
        state.error = action.error.message;
      })


      //PUT TRACKER
      // Reducer handling for `updateTrackerSlice`
      .addCase(updateVehicleSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateVehicleSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenEditModal = false;
        state.listVehicles = state.listVehicles.map(vl => {
          if (vl.id === action.payload.id) {
            return action.payload;
          }
          return vl;
        });
      })
      .addCase(updateVehicleSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;

        if (action.payload) {
          // Loop through the validation error messages and display each one
          Object.entries(action.payload).forEach(([field, message]) => {
            toast.error(`${field}: ${message}`);
          });
        } else {
          toast.error("Something went wrong. If the problem persists, please contact support.");
        }
      })
      // DELETE Tracker
      .addCase(deleteVehicleSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteVehicleSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenDeleteModal = false;
        // console.log(state.brand.listBrand)
        // console.log("action : "+action.payload )
        state.listVehicles = state.listVehicles.filter(vl => vl.id != action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(deleteVehicleSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;

        toast.error("Something went wrong. If the problem persists, please contact support.");

      })

      // GET  Vehicle By license Plate
      .addCase(getVehicleByLicensePlateMapSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVehicleByLicensePlateMapSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.targetVehicle = action.payload;
      })
      .addCase(getVehicleByLicensePlateMapSlice.rejected, (state, action) => {
        state.status = 'failed';
        toast.error("Something went wrong. If the problem persists, please contact support.");
        state.error = action.error.message;
      })
      

      ;

  },
});

export const { addVehicle,

  openModalEditVehicle, closeModalEditVehicle, openModalDeleteVehicle, closeModalDeleteVehicle
} = vehicleSlice.actions;
export default vehicleSlice.reducer;
