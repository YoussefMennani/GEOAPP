import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:8090";

export const getAllBrandsSlice = createAsyncThunk('trackers/getAllBrands', async () => {

  console.log("slice execution");
  console.log("hello");

  try {
    const res = await axios.get(apiUrl + "/api/v1/tracker/brands");

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


export const addBrandSlice = createAsyncThunk('trackers/addBrand', async (brandState) => {

  try {
    const res = await axios.post(apiUrl + "/api/v1/tracker/brands", {
      brandName: brandState.brandName,
      originCountry: brandState.originCountry
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

export const deleteBrandSlice = createAsyncThunk('trackers/deleteBrand', async (brandId) => {

  try {
    const res = await axios.delete(apiUrl + "/api/v1/tracker/brands/" + brandId);

    if (res.status === 200) {
      //console.log(res.data);
      toast.warn(res.data.message)
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

export const updateBrandSlice = createAsyncThunk('trackers/updateBrand', async (brandState) => {


  console.log("+++++++++++++++++", brandState)
  try {
    const res = await axios.put(apiUrl + "/api/v1/tracker/brands/" + brandState.brandId, {
      id: brandState.brandId,
      brandName: brandState.brandName,
      originCountry: brandState.originCountry
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


// MODEL Functions
export const getAllModelsSlice = createAsyncThunk('trackers/getAllModels', async () => {

  try {
    const res = await axios.get(apiUrl + "/api/v1/tracker/models");

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


export const addModelSlice = createAsyncThunk('trackers/addModel', async (modelState) => {

  try {
    console.log(" slice model add function ", modelState)
    const res = await axios.post(apiUrl + "/api/v1/tracker/models", {

      modelId: modelState.modelId,
      modelName: modelState.modelName,
      features: modelState.features,
      batteryLife: modelState.batteryLife,
      networkType: modelState.networkType,
      brand: modelState.brand,

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


export const updateModelSlice = createAsyncThunk('trackers/updateModel', async (modelState) => {


  console.log("+++++++++++++++++", modelState)
  try {
    const res = await axios.put(apiUrl + "/api/v1/tracker/models/" + modelState.modelId, {
      id: modelState.modelId,
      batteryLife: modelState.batteryLife,
      brand: modelState.brand,
      features: modelState.features,
      modelId: modelState.modelId,
      modelName: modelState.modelName,
      networkType: modelState.networkType
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



export const deleteModelSlice = createAsyncThunk('trackers/deleteModel', async (modelId) => {

  try {
    const res = await axios.delete(apiUrl + "/api/v1/tracker/models/" + modelId);

    if (res.status === 200) {
      //console.log(res.data);
      toast.warn(res.data.message)
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


export const addTrackerSlice = createAsyncThunk('trackers/addTracker', async (trackerState) => {

  try {
    console.log(" slice model add function ", trackerState)
    const res = await axios.post(apiUrl + "/api/v1/trackers", {

      imei: trackerState.imei,
      model: trackerState.model,
      brand: trackerState.brand,
      simSerialNumber: trackerState.simSerialNumber,
      simNumber: trackerState.simNumber,
      status:trackerState.status
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




export const getAllTrackersSlice = createAsyncThunk('trackers/getAllTrackers', async () => {

  try {
    const res = await axios.get(apiUrl + "/api/v1/trackers");

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



export const updateTrackerSlice = createAsyncThunk('trackers/updateTracker', async (trackerState, { rejectWithValue }) => {
  try {
    console.log("update tracker slice ", trackerState);
    const res = await axios.put(apiUrl + "/api/v1/trackers/" + trackerState.id, {
      imei: trackerState.imei,
      model: trackerState.model,
      brand: trackerState.brand,
      simSerialNumber: trackerState.simSerialNumber,
      simNumber: trackerState.simNumber,
      status:trackerState.status

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

export const deleteTrackerSlice = createAsyncThunk('trackers/deleteTracker', async (modelId) => {

  try {
    const res = await axios.delete(apiUrl + "/api/v1/trackers/" + modelId);

    if (res.status === 200) {
      //console.log(res.data);
      toast.warn(res.data.message)
      return res.data.data;
    } else {
      toast.error(res.data.message)
      // console.error("Unexpected response status:", res.status);
      // throw new Error("Failed to fetch trackers");  // Throw error to handle in `createAsyncThunk`
    }

  } catch (error) {
    if (error.response && error.response.status === 400 && error.response.data.data) {
      // Pass the specific validation errors to `rejected` case
      return rejectWithValue(error.response.data.data);
    } else {
      console.error("Error updating tracker:", error.message);
      throw error;
    }
  }
})


const brandSlice = createSlice({
  name: 'trackers',
  initialState: {
    brand: {
      listBrand: [],
      status: 'idle',
      isOpenEditModal: false,
      isOpenDeleteModal: false
    },
    model: {
      listModel: [],
      status: 'idle',
      isOpenEditModal: false,
      isOpenDeleteModal: false
    },
    listTrackers: [], // List of trackers objects
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

    // Brand
    openModalEditBrand: (state, action) => {
      state.brand.isOpenEditModal = true;
    },
    closeModalEditBrand: (state, action) => {
      state.brand.isOpenEditModal = false;
    },
    openModalDeleteBrand: (state, action) => {
      state.brand.isOpenDeleteModal = true;
    },
    closeModalDeleteBrand: (state, action) => {
      state.brand.isOpenDeleteModal = false;
    },

    // Model
    openModalEditModel: (state, action) => {
      state.model.isOpenEditModal = true;
    },
    closeModalEditModel: (state, action) => {
      state.model.isOpenEditModal = false;
    },
    openModalDeleteModel: (state, action) => {
      state.model.isOpenDeleteModal = true;
    },
    closeModalDeleteModel: (state, action) => {
      state.model.isOpenDeleteModal = false;
    },

    // Tracker
    openModalEditTracker: (state, action) => {
      state.isOpenEditModal = true;
    },
    closeModalEditTracker: (state, action) => {
      state.isOpenEditModal = false;
    },
    openModalDeleteTracker: (state, action) => {
      state.isOpenDeleteModal = true;
    },
    closeModalDeleteTracker: (state, action) => {
      state.isOpenDeleteModal = false;
    }


  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrandsSlice.pending, (state) => {
        state.brand.status = 'loading';
      })
      .addCase(getAllBrandsSlice.fulfilled, (state, action) => {
        state.brand.status = 'succeeded';
        state.brand.listBrand = action.payload;
      })
      .addCase(getAllBrandsSlice.rejected, (state, action) => {
        state.brand.status = 'failed';
        toast.error("Something went wrong. If the problem persists, please contact support.");
        state.error = action.error.message;
      })

      //ADD Brand Slice
      .addCase(addBrandSlice.pending, (state) => {
        state.brand.status = 'loading';
      })
      .addCase(addBrandSlice.fulfilled, (state, action) => {
        state.brand.status = 'succeeded';
        state.brand.isOpenEditModal = false;
        state.brand.listBrand.push(action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(addBrandSlice.rejected, (state, action) => {
        state.brand.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      //DELETE brand Slice
      .addCase(deleteBrandSlice.pending, (state) => {
        state.brand.status = 'loading';
      })
      .addCase(deleteBrandSlice.fulfilled, (state, action) => {
        state.brand.status = 'succeeded';
        state.brand.isOpenDeleteModal = false;
        // console.log(state.brand.listBrand)
        // console.log("action : "+action.payload )
        state.brand.listBrand = state.brand.listBrand.filter(brand => brand.id != action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(deleteBrandSlice.rejected, (state, action) => {
        state.brand.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");

      })

      //PUT brand Slice
      .addCase(updateBrandSlice.pending, (state) => {
        state.brand.status = 'loading';
      })
      .addCase(updateBrandSlice.fulfilled, (state, action) => {
        state.brand.status = 'succeeded';
        state.brand.isOpenEditModal = false;
        state.brand.listBrand = state.brand.listBrand.map(brand => {
          if (brand.id == action.payload.id) {
            return action.payload
          }
          return brand
        })
        //state.brand.listBrand  = action.payload;
      })
      .addCase(updateBrandSlice.rejected, (state, action) => {
        state.brand.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");

      })


      //############################################   MODEL   ###################################
      // get all data 
      .addCase(getAllModelsSlice.pending, (state) => {
        state.model.status = 'loading';
      })
      .addCase(getAllModelsSlice.fulfilled, (state, action) => {
        state.model.status = 'succeeded';
        state.model.listModel = action.payload;
      })
      .addCase(getAllModelsSlice.rejected, (state, action) => {
        state.model.status = 'failed';
        toast.error("Something went wrong. If the problem persists, please contact support.");
        state.error = action.error.message;
      })
      // add model
      .addCase(addModelSlice.pending, (state) => {
        state.model.status = 'loading';
      })
      .addCase(addModelSlice.fulfilled, (state, action) => {
        state.model.status = 'succeeded';
        state.model.isOpenEditModal = false;
        state.model.listModel.push(action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(addModelSlice.rejected, (state, action) => {
        state.model.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })
      // UPDATE MODEL
      .addCase(updateModelSlice.pending, (state) => {
        state.model.status = 'loading';
      })
      .addCase(updateModelSlice.fulfilled, (state, action) => {
        state.model.status = 'succeeded';
        state.model.isOpenEditModal = false;
        state.model.listModel = state.model.listModel.map(model => {
          if (model.id == action.payload.id) {
            return action.payload
          }
          return model
        })
        //state.brand.listBrand  = action.payload;
      })
      .addCase(updateModelSlice.rejected, (state, action) => {
        state.model.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })
      // DELETE MODEL
      //DELETE brand Slice
      .addCase(deleteModelSlice.pending, (state) => {
        state.model.status = 'loading';
      })
      .addCase(deleteModelSlice.fulfilled, (state, action) => {
        state.model.status = 'succeeded';
        state.model.isOpenDeleteModal = false;
        // console.log(state.brand.listBrand)
        // console.log("action : "+action.payload )
        state.model.listModel = state.model.listModel.filter(model => model.id != action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(deleteModelSlice.rejected, (state, action) => {
        state.model.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");

      })

      //############################################   MODEL   ###################################
      // add model
      .addCase(addTrackerSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTrackerSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenEditModal = false;
        state.listTrackers.push(action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(addTrackerSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      // GET ALL TRACKERS
      .addCase(getAllTrackersSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTrackersSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listTrackers = action.payload;
      })
      .addCase(getAllTrackersSlice.rejected, (state, action) => {
        state.status = 'failed';
        toast.error("Something went wrong. If the problem persists, please contact support.");
        state.error = action.error.message;
      })


      //PUT TRACKER
      // Reducer handling for `updateTrackerSlice`
      .addCase(updateTrackerSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTrackerSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenEditModal = false;
        state.listTrackers = state.listTrackers.map(tracker => {
          if (tracker.id === action.payload.id) {
            return action.payload;
          }
          return tracker;
        });
      })
      .addCase(updateTrackerSlice.rejected, (state, action) => {
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
      .addCase(deleteTrackerSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTrackerSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenDeleteModal = false;
        // console.log(state.brand.listBrand)
        // console.log("action : "+action.payload )
        state.listTrackers = state.listTrackers.filter(tracker => tracker.id != action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(deleteTrackerSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        if (action.payload) {
          // Loop through the validation error messages and display each one
          Object.entries(action.payload).forEach(([field, message]) => {
            toast.error(`${message}`);
          });
        } else {
          toast.error("Something went wrong. If the problem persists, please contact support.");
        }
      })
    ;

  },
});

export const { addVehicle,
  openModalEditBrand, closeModalEditBrand, openModalDeleteBrand, closeModalDeleteBrand,
  openModalEditModel, closeModalEditModel, openModalDeleteModel, closeModalDeleteModel,
  openModalEditTracker, closeModalEditTracker, openModalDeleteTracker, closeModalDeleteTracker
} = brandSlice.actions;
export default brandSlice.reducer;
