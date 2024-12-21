import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:8093";


export const getUserExtrasMe = createAsyncThunk('user/getProfile', async (token) => {

  try {
    console.log(" Toekn =========> "+token)
    const res = await axios.get(apiUrl + "/api/userextras/me", {
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




const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth:{},
    userState: {},
    menu:[],
    avatar:"",
    status: 'idle', 
    error: null,
  },

  reducers: {

    // Add notification list 
    handleUpdateUserState: (state, action) => {
      console.log(" =========> new user State ", action.payload);
      state.userState = action.payload;
    },
    handleUpdateAuthState: (state, action) => {
      console.log(" =========> new auth State ", action.payload);
      state.auth = action.payload;
    },
 
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserExtrasMe.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserExtrasMe.fulfilled, (state, action) => {
        state.status = 'succeeded';
        //state.locationData = action.payload;
        console.log(action.payload)
        state.menu = action.payload.menu
        state.avatar = action.payload.avatar
      })
      .addCase(getUserExtrasMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

  },


});

export const { handleUpdateUserState,handleUpdateAuthState } = userSlice.actions;
export default userSlice.reducer;
