import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example async thunk for fetching vehicle data
export const getAllTrackers = createAsyncThunk('trackers/getAllTrackers', async () => {
  // const response = await fetch('/api/trackers'); // replace with your API endpoint
  // return response.json();
  console.log(" slice execution")
  return [{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },{
    _id: 1,
    origin_country: '261 Erdman Ford',
    brand_name: 'East Daphne',
  },]


});

export const addTrackerSlice = createAsyncThunk('trackers/addTracker', async () => {
    console.log(" add tracker slice")
  })

const trackerSlice = createSlice({
  name: 'trackers',
  initialState: {
    brand: {
      listBrand: [],
      status: 'idle',
      isOpenEditModal: false,
      isOpenDeleteModal: false
    },
    listTrackers: [], // List of trackers objects
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Example of an additional synchronous action
    addVehicle: (state, action) => {
      state.list.push(action.payload);
    },
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
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTrackers.pending, (state) => {
        state.brand.status = 'loading';
      })
      .addCase(getAllTrackers.fulfilled, (state, action) => {
        state.brand.status = 'succeeded';
        state.brand.listBrand  = action.payload;
      })
      .addCase(getAllTrackers.rejected, (state, action) => {
        state.brand.status = 'failed';
        state.error = action.error.message;
      })

      //ADD Tracker Slice
      .addCase(addTrackerSlice.pending, (state) => {
        state.brand.status = 'loading';
      })
      .addCase(addTrackerSlice.fulfilled, (state, action) => {
        state.brand.status = 'succeeded';
        state.brand.isOpenEditModal = false;
        //state.brand.listBrand  = action.payload;
      })
      .addCase(addTrackerSlice.rejected, (state, action) => {
        state.brand.status = 'failed';
        state.error = action.error.message;
      });

  },
});

export const { addVehicle, openModalEditBrand, closeModalEditBrand, openModalDeleteBrand, closeModalDeleteBrand } = trackerSlice.actions;
export default trackerSlice.reducer;
