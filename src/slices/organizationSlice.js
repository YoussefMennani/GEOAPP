import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import toggleVisibility from '../services/organizationService';


const gateWayUrl = "http://localhost:8093";





export const addOrganizationSlice = createAsyncThunk('organization/addOrganization', async (data, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;
    console.log(data)

    const res = await axios.post(gateWayUrl + "/api/organizations", {
      ...data
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


export const saveOrganizationSlice = createAsyncThunk('organization/saveOrganization', async (orgData, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.post(gateWayUrl + "/api/organization/updateOrganization", {
      ...orgData
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


export const getOrganizationRootSlice = createAsyncThunk('organization/getOrganizationRoot', async (_, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/organizations/byProfile", {
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


export const getChildOrganizationSlice = createAsyncThunk('organization/getChildOrganization', async (_, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/organizations/getChildOrganization", {
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

export const getOrganizationSlice = createAsyncThunk('organization/getOrganization', async (_, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/organization", {
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

export const getOrganizationByIdSlice = createAsyncThunk('organization/getOrganizationById', async (idOrg, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/organizations/tree/" + idOrg, {
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


export const getOrganizationDataForChart = createAsyncThunk('organization/getOrganizationDataForChart', async (idOrg, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.get(gateWayUrl + "/api/organizations/getOrganizationDataForChart/" + idOrg, {
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


export const updateOrganizationSlice = createAsyncThunk('organization/updateOrganizationSlice', async (menuData, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.post(gateWayUrl + "/api/organization/updateOrganization", {
      ...menuData
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

//getChildOrganization

export const deleteOrganization = createAsyncThunk('organization/deleteById', async (organizationId, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.delete(gateWayUrl + "/api/organizations/" + organizationId, {
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

const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    // listTrackers: [], 
    isOpenModal: false,
    isOpenModalAddHeader: false,
    organizationList: [],
    organizationTarget: {},
    organizationRoot: [],
    targetEntity: {},
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isOpenModalOrgChart:false,
    targetOrgChart:"",
    orgChartData:{},
    organizationListChild:[]
  },

  reducers: {
    //------------------------------------------------------------------------------------
    setTargetEntity: (state, action) => {
      state.targetEntity = action.payload
    },
    //------------------------------------------------------------------------------------

    saveChnagesOrganization: (state, action) => {
      state.organizationList = action.payload
    },
    saveChnagesTargetOrg: (state, action) => {
      state.organizationTarget = action.payload
    },
    updateOrganization: (state, action) => {
      const update = state.organizationList.find((item) => item.name == action.payload.orgName)
      update.subUnit = action.payload.updatedOrg;

      state.organizationList = { ...state.organizationList, ...update }
    },
    openModalAddOrganization: (state, action) => {
      state.isOpenModal = true;
    },
    closeModalAddOrganization: (state, action) => {
      state.isOpenModal = false;
    },
    openModalOrgChart: (state, action) => {
      state.targetOrgChart = action.payload;
      state.isOpenModalOrgChart = true;
    },
    closeModalOrgChart: (state, action) => {
      state.isOpenModalOrgChart = false;
    },
    openModalAddOrganizationHeader: (state, action) => {
      state.isOpenModalAddHeader = true;
    },
    closeModalAddOrganizationHeader: (state, action) => {
      state.isOpenModalAddHeader = false;
    },
    toggleVisibilityReducer: (state,action) =>{
        state.orgChartData = toggleVisibility( state.orgChartData,action.payload)
        console.log("hereee")
    }
  },
  extraReducers: (builder) => {
    builder

      //------------------------------------------------------------------------------

      .addCase(getChildOrganizationSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getChildOrganizationSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log(action.payload)
        state.organizationListChild = action.payload
      })

      .addCase(getChildOrganizationSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      .addCase(getOrganizationRootSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrganizationRootSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log(action.payload)
        state.organizationRoot = action.payload
      })

      .addCase(getOrganizationRootSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      .addCase(deleteOrganization.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        // console.log(action.payload)
        toast.success("Organization deleted successfully")

        // state.organizationList = state.organizationList.filter((item)=>item.id != action.payload)
      })

      .addCase(deleteOrganization.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })
      //------------------------------------------------------------------------------
      .addCase(addOrganizationSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrganizationSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log(action.payload)
        state.organizationList.push(action.payload)
        toast.success("Organization saved successfully")
      })

      .addCase(addOrganizationSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      .addCase(getOrganizationSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrganizationSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log(action.payload)
        state.organizationList = action.payload
      })

      .addCase(getOrganizationSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })
      .addCase(getOrganizationByIdSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrganizationByIdSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log(action.payload)
        state.organizationTarget = action.payload
      })

      .addCase(getOrganizationByIdSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })
      .addCase(saveOrganizationSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveOrganizationSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log(action.payload)
        // state.organizationTarget = action.payload

        // const updatedOrgIndex = state.organizationList.findIndex((item) => item.id == action.payload.id);

        // if (updatedOrgIndex !== -1) {
        //     // Update the specific organization immutably
        //     const updatedOrg = {
        //         ...state.organizationList[updatedOrgIndex],
        //         data: action.payload.data, // Set the desired data instead of circular reference
        //     };

        //     // Update the organizationList
        //     state.organizationList = [
        //         ...state.organizationList.slice(0, updatedOrgIndex),
        //         updatedOrg,
        //         ...state.organizationList.slice(updatedOrgIndex + 1),
        //     ];
        //     state.isOpenModalAddHeader = false;
        // } else {
        //     console.error("Organization not found for ID:", action.payload.id);
        // }
      })

      .addCase(saveOrganizationSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })
      .addCase(updateOrganizationSlice.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateOrganizationSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log(action.payload)
        // state.organizationTarget = action.payload
      })

      .addCase(updateOrganizationSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })

      .addCase(getOrganizationDataForChart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        toast.error("Something went wrong. If the problem persists, please contact support.");
      })
      .addCase(getOrganizationDataForChart.pending, (state, action) => {
        state.status = 'loading';
      })

      .addCase(getOrganizationDataForChart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isOpenModal = false;
        console.log("______________________ data org  _______________________")
        console.log(action.payload)
        state.orgChartData = action.payload;
            })


  },

});

export const {
  saveChnagesOrganization, openModalAddOrganization, saveChnagesTargetOrg, setTargetEntity, closeModalAddOrganization, updateOrganization, openModalAddOrganizationHeader, 
  closeModalAddOrganizationHeader, closeModalOrgChart,openModalOrgChart,toggleVisibilityReducer
} = organizationSlice.actions;
export default organizationSlice.reducer;
