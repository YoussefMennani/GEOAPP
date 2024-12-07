import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:8097";



export const addDriverSlice = createAsyncThunk('drivers/addDriver', async (driverState) => {

  try {
    console.log(" slice driver add function ", driverState)

    const responseUrlImg = await axios.get(`http://localhost:9002/minio/generate-presigned-url/image-driver/${Date.now()}`);
    const presignedUrlImg = responseUrlImg.data;
    console.log(" Minio  avatar url : " + presignedUrlImg)


    const responseUrlFile = await axios.get(`http://localhost:9002/minio/generate-presigned-url/file-driver/${Date.now()}`);
    const presignedUrlFile = responseUrlFile.data;
    console.log(" Minio  file url : " + presignedUrlFile)

    const res = await axios.post(apiUrl + "/api/v1/drivers", {
      ...driverState,
      profileImageUrl: presignedUrlImg,
      documentUrl: presignedUrlFile
    });
    if (res.status === 200) {
      if (driverState.profileImageUrl != null || driverState.documentUrl != null) {
        // Step 2: Upload the file to MinIO using the pre-signed URL
        if (driverState.profileImageUrl != null) {

          const ResponseUploadProfileImage = await axios.put(presignedUrlImg, driverState.profileImageUrl, {
            headers: {
              'Content-Type': driverState.profileImageUrl.type,
            },
          });
          if (ResponseUploadProfileImage.status === 200 ) {
            alert("Image profile uploaded successfully!");
          }

        }

        if (driverState.documentUrl != null) {
          const ResponseUploadDocumentUrl = await axios.put(presignedUrlFile, driverState.documentUrl, {
            headers: {
              'Content-Type': driverState.documentUrl.type,
            },
          });
          if (ResponseUploadDocumentUrl.status === 200) {
            alert("File uploaded successfully!");
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




export const getAllDriversSlice = createAsyncThunk('drivers/getAllDriversSlice', async () => {

  try {
    const res = await axios.get(apiUrl + "/api/v1/drivers");

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









const driverSlice = createSlice({
  name: 'vehicle',
  initialState: {
    // listTrackers: [], 
    targetDriver: {},
    listDrivers: [],
    isOpenEditModal: false,
    isOpenDeleteModal: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  reducers: {

    // Tracker
    openModalEditDriver: (state, action) => {
      state.isOpenEditModal = true;
    },
    closeModalEditDriver: (state, action) => {
      state.isOpenEditModal = false;
    },
    openModalDeleteDriver: (state, action) => {
      state.isOpenDeleteModal = true;
    },
    closeModalDeleteDriver: (state, action) => {
      state.isOpenDeleteModal = false;
    }


  },
  extraReducers: (builder) => {
    builder


      //############################################   Driver   ###################################
      // add model
      .addCase(addDriverSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addDriverSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenEditModal = false;
        state.listDrivers.push(action.payload)
        //state.brand.listBrand  = action.payload;
      })
      .addCase(addDriverSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      // GET ALL TRACKERS
      .addCase(getAllDriversSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllDriversSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listDrivers = action.payload;
      })
      .addCase(getAllDriversSlice.rejected, (state, action) => {
        state.status = 'failed';
        toast.error("Something went wrong. If the problem persists, please contact support.");
        state.error = action.error.message;
      })


  },
});

export const { addVehicle,

  openModalEditDriver, closeModalEditDriver, openModalDeleteDriver, closeModalDeleteDriver
} = driverSlice.actions;
export default driverSlice.reducer;
