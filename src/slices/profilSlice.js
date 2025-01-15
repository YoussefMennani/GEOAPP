import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { addOperationField } from '../services/menuService'; // Adjust the path as needed


const gateWayUrl = "http://localhost:8093";





export const saveProfileSlice = createAsyncThunk('profil/saveProfileSlice', async (profile, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.post(gateWayUrl + "/api/userextras/profile", {
      ...profile
    },
     {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      //console.log(res.data);
      toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});


export const getMenuProfilSlice = createAsyncThunk('profil/getMenuProfile', async (menuName, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/userextras/menu/getByName/"+menuName,{
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      //console.log(res.data);
      toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});

export const getAllProfiles = createAsyncThunk('profil/getProfiles', async (_, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/userextras/profiles",{
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      //console.log(res.data);
      toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});


export const deleteProfile = createAsyncThunk('profil/delete', async (profileId, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.delete(gateWayUrl + "/api/userextras/profile/"+profileId,{
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.status === 200) {  // Checking for HTTP 200 status
      //console.log(res.data);
      toast.success(res.data.message)
      return res.data;  // Return the data if needed for further use
    } else {
      toast.error(res.data.message)
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
});

const generateRandomDoubleId = () => {
  return (Math.random()); // Generates a random double with 6 decimal places
};

const profilSlice = createSlice({
  name: 'profil',
  initialState: {
    // listTrackers: [], 
    isOpenAddModal:false,
    menuList : {
    },
    profilesList:[]
    ,

    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  reducers: {
    handleExpandMenu: (state, action) => {
      state.menuList = action.payload
    },
    openModaAddProfillMenu: (state, action) => {
      state.isOpenAddModal = true;
    },
    closeModalAddProfilMenu: (state, action) => {
      console.log("sads")
      state.isOpenAddModal = false;
    }
  },
  extraReducers: (builder) => {
    builder

    .addCase(saveProfileSlice.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(saveProfileSlice.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isOpenAddModal = false;
      console.log(action.payload)
      state.profilesList.push(action.payload)
      toast.success("profile saved with success")
    })

    .addCase(saveProfileSlice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error("Something went wrong. If the problem persists, please contact support.");
    })
    .addCase(getMenuProfilSlice.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getMenuProfilSlice.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload)
      state.menuList =  addOperationField(action.payload)
    })

    .addCase(getMenuProfilSlice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error("Something went wrong. If the problem persists, please contact support.");
    })
 
    .addCase(getAllProfiles.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getAllProfiles.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload)
      state.profilesList =  action.payload
    })

    .addCase(getAllProfiles.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error("Something went wrong. If the problem persists, please contact support.");
    })

    .addCase(deleteProfile.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(deleteProfile.fulfilled, (state, action) => {
      state.status = 'succeeded';
      console.log(action.payload)
      state.profilesList =  state.profilesList.filter((profile)=>profile.id != action.payload)
      toast.success("profile deleted with success")

    })

    .addCase(deleteProfile.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error("Something went wrong. If the problem persists, please contact support.");
    })
  },
  
});

export const {
  handleExpandMenu,openModaAddProfillMenu,closeModalAddProfilMenu
} = profilSlice.actions;
export default profilSlice.reducer;
