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

export const getAllUsers = createAsyncThunk('user/getAllUsers', async (_, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;
    console.log(" Toekn =========> "+token)
    const res = await axios.get(apiUrl + "/api/userextras", {
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




export const addUserSlice = createAsyncThunk('user/addUserSlice', async (userState, { getState }) => {

  try {

    const state = getState();
    const token = state.user.auth.token;

    console.log(" slice driver add function ", userState)
    const imgFilePath = `image-driver/${Date.now()}`;
    const responseUrlImg = await axios.get(`http://localhost:8222/minio/generate-presigned-url/${imgFilePath}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const presignedUrlImg = responseUrlImg.data;
    console.log(" Minio  avatar url : " + presignedUrlImg)

    const docFilePath = `file-driver/${Date.now()}`;
    const responseUrlFile = await axios.get(`http://localhost:8222/minio/generate-presigned-url/${docFilePath}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const presignedUrlFile = responseUrlFile.data;
    console.log(" Minio  file url : " + presignedUrlFile)


    // const profile = state.profil.profilesList.find((p)=>p.id === userState.profile) 
    // const organization = state.organization.organizationList.find((org)=>org.id === userState.organization)

    const res = await axios.post(apiUrl + "/api/userextras", {
      ...userState,
      // profile:profile,
      // organization:organization,
      profileImageUrl: imgFilePath,
      documentUrl: docFilePath
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.status === 200) {
      if (userState.profileImageUrl != null || userState.documentUrl != null) {
        // Step 2: Upload the file to MinIO using the pre-signed URL
        if (userState.profileImageUrl != null) {

          const ResponseUploadProfileImage = await axios.put(presignedUrlImg, userState.profileImageUrl, {
            headers: {
              'Content-Type': userState.profileImageUrl.type,
            },
          });
          if (ResponseUploadProfileImage.status === 200) {
            toast.success("Image profile uploaded successfully!");
          }

        }

        if (userState.documentUrl != null) {
          const ResponseUploadDocumentUrl = await axios.put(presignedUrlFile, userState.documentUrl, {
            headers: {
              'Content-Type': userState.documentUrl.type,
            },
          });
          if (ResponseUploadDocumentUrl.status === 200) {
            toast.success("File uploaded successfully!");
          }

        }
      }




      //console.log(res.data);
      toast.success(res.data.message)
      return res.data;
    } else {
      toast.error(res.data.message)
      // console.error("Unexpected response status:", res.status);
      // throw new Error("Failed to fetch trackers");  // Throw error to handle in `createAsyncThunk`
    }

  } catch (error) {
    console.error("Error adding driver:", error.message);
    throw error;  // Rethrow error to handle in the async thunk
  }
})


const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth:{},
    userState: {},
    profile:{},
    usersList:[],
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
        state.profile = action.payload.profile
        state.avatar = action.payload.avatar
      })
      .addCase(getUserExtrasMe.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addUserSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersList.push(action.payload)
        toast.success("user added successfully")
      })
      .addCase(addUserSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersList = action.payload
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })



  },


});

export const { handleUpdateUserState,handleUpdateAuthState } = userSlice.actions;
export default userSlice.reducer;
