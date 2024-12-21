import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:8091";

const gateWayUrl = "http://localhost:8222";


export const addVehicleSlice = createAsyncThunk('vehicles/addVehicles', async (vehicleState, { getState }) => {

  try {

    const state = getState();
    const token = state.user.auth.token; // Assuming your token is stored in the auth slice.


    console.log(" slice vehicle add function ", vehicleState)
    const imgFilePath = `image-vehicle/${Date.now()}`;
    const responseUrlImg = await axios.get(`http://localhost:8222/minio/generate-presigned-url/${imgFilePath}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const presignedUrlImg = responseUrlImg.data;
    console.log(" Minio  avatar url : " + presignedUrlImg)

    if (vehicleState.imgPath != null && vehicleState.imgPath != "") {

      const ResponseUploadImage = await axios.put(presignedUrlImg, vehicleState.imgPath, {
        headers: {
          'Content-Type': vehicleState.imgPath.type,
        },
      });
      if (ResponseUploadImage.status === 200) {
        toast.success("Image profile uploaded successfully!");
      }

    }

    console.log(" slice vehicle add function ", vehicleState)
    const res = await axios.post(gateWayUrl + "/api/v1/vehicles", {
      ...vehicleState,
      imgPath: imgFilePath
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
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


export const assignDriverSlice = createAsyncThunk('vehicles/assign_driver', async (data, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token; // Assuming your token is stored in the auth slice.
    console.log(" slice assign vehicle data :::: ", data)
    const res = await axios.post(gateWayUrl + "/api/v1/vehicles/assign_driver/" + data.vehicleId,
      data.driverId
      , {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'text/plain' }

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


export const unassignDriverSlice = createAsyncThunk('vehicles/unassign_driver', async (data, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token; // Assuming your token is stored in the auth slice.
    console.log(" slice unassign vehicle data :::: ", data)
    const res = await axios.post(gateWayUrl + "/api/v1/vehicles/unassign_driver/" + data.vehicleId,
      data.driverId
      , {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'text/plain' }

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


export const getAllVehiclesSlice = createAsyncThunk('vehicles/getAllVehiclesSlice', async (_, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token; // Assuming your token is stored in the auth slice.


    const res = await axios.get(gateWayUrl + "/api/v1/vehicles", {
      headers: { 'Authorization': `Bearer ${token}` }
    });

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







export const updateVehicleSlice = createAsyncThunk('vehicles/updateVehicleSlice', async (vehicleState, { getState, rejectWithValue }) => {
  try {

    const state = getState();
    const token = state.user.auth.token; // Assuming your token is stored in the auth slice.

    console.log("update vehicle slice ", vehicleState);

    const imgFilePath = `image-vehicle/${Date.now()}`;
    const responseUrlImg = await axios.get(`http://localhost:8222/minio/generate-presigned-url/${imgFilePath}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    const presignedUrlImg = responseUrlImg.data;
    console.log(" Minio  avatar url : " + presignedUrlImg)

    if (vehicleState.imgPath != null && vehicleState.imgPath != "") {

      const ResponseUploadImage = await axios.put(presignedUrlImg, vehicleState.imgPath, {
        headers: {
          'Content-Type': vehicleState.imgPath.type,
        },
      });
      if (ResponseUploadImage.status === 200) {
        toast.success("Image profile uploaded successfully!");
      }

    }

    const res = await axios.put(gateWayUrl + "/api/v1/vehicles/" + vehicleState.id, {
      ...vehicleState,
      imgPath: imgFilePath
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
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

export const deleteVehicleSlice = createAsyncThunk('vehicle/deleteVehicleSlice', async (vehicleId, { getState }) => {
  try {

    const state = getState();
    const token = state.user.auth.token; // Assuming your token is stored in the auth slice.

    const res = await axios.delete(gateWayUrl + "/api/v1/vehicles/" + vehicleId, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
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



export const getVehicleByLicensePlateMapSlice = createAsyncThunk('map/getVehicleByLicensePlateMapSlice', async (licensePlate, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/v1/vehicles/byLicensePlate/" + licensePlate, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

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
    trackingListPosition: [],
    isOpenEditModal: false,
    isOpenDeleteModal: false,
    isOpenAssignVlModal: false,
    isOpenShowDriverInfo: false,
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
    },
    openModalAssignVehicle: (state, action) => {
      state.isOpenAssignVlModal = true;
    },
    closeModalAssignVehicle: (state, action) => {
      state.isOpenAssignVlModal = false;
    },
    openModalShowDriverInfo: (state, action) => {
      state.isOpenShowDriverInfo = true;
    },
    closeModalShowDriverInfo: (state, action) => {
      state.isOpenShowDriverInfo = false;
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
        console.log(state)
        //state.brand.listBrand  = action.payload;
        // state.trackers = state.trackers.listTrackers.map((tracker) => {
        //   if (tracker.id === action.payload.tracker.trackerId) {
        //       tracker.isVehicleAssociated = true
        //   }
        // })
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
    //assign driver to vehicle
    .addCase(assignDriverSlice.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(assignDriverSlice.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.listVehicles = state.listVehicles.map(vl => {
        if (vl.id === action.payload.id) {
          return action.payload;
        }
        return vl;
      });

      state.isOpenAssignVlModal = false;
    })
    .addCase(assignDriverSlice.rejected, (state, action) => {
      state.status = 'failed';
      toast.error("Something went wrong. If the problem persists, please contact support.");
      state.error = action.error.message;
    })
    //unassign driver to vehicle
    .addCase(unassignDriverSlice.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(unassignDriverSlice.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.listVehicles = state.listVehicles.map(vl => {
        if (vl.id === action.payload.id) {
          return action.payload;
        }
        return vl;
      });

      state.isOpenShowDriverInfo = false
    })
    .addCase(unassignDriverSlice.rejected, (state, action) => {
      state.status = 'failed';
      toast.error("Something went wrong. If the problem persists, please contact support.");
      state.error = action.error.message;
    })
      ;

  },
});

export const { addVehicle,

  openModalEditVehicle, closeModalEditVehicle, openModalDeleteVehicle, closeModalDeleteVehicle,
  openModalAssignVehicle, closeModalAssignVehicle, openModalShowDriverInfo, closeModalShowDriverInfo
} = vehicleSlice.actions;
export default vehicleSlice.reducer;
