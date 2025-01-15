import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';


const gateWayUrl = "http://localhost:8093";





export const saveMenuSlice = createAsyncThunk('menu/saveMenu', async (menuData, { getState }) => {

  try {
    const state = getState();
    const token = state.user.auth.token;

    const res = await axios.post(gateWayUrl + "/api/userextras/menu/saveOrUpdate", {
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


export const getMenuSlice = createAsyncThunk('menu/getMenu', async (menuName, { getState }) => {

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

const generateRandomDoubleId = () => {
  return (Math.random()); // Generates a random double with 6 decimal places
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    // listTrackers: [], 
    isOpenModal:false,
    menuList : {
      // menuName:"menu1",
      // data :[
      //   {
      //     header: "App",
      //     items: [
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Dashboard",
      //         icon: "bx bx-home",
      //         available: true,
      //         link: "/",
      //         collapsed: false,
      //         submenu: [],
      //         isEdit: false
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Map",
      //         icon: "bx bx-map-alt",
      //         available: true,
      //         link: "/map",
      //         collapsed: false,
      //         submenu: []
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Vehicles",
      //         icon: "bx bx bx-car",
      //         available: true,
      //         link: "/vehicles",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Vehicles Manager",
      //             available: true,
      //             link: "/vehicles/vehicles_manager",
      //             collapsed: false
      //           }
      //         ]
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Anomaly Detection",
      //         icon: "bx bxs-bug-alt",
      //         available: true,
      //         link: "/anomaly",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Dashboard",
      //             available: true,
      //             link: "/anomaly/dashboard",
      //             collapsed: false
      //           }
      //         ]
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Gps Tracker",
      //         icon: "bx bx bx-broadcast",
      //         available: true,
      //         link: "/gps_tracker",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Tracker Manager",
      //             available: true,
      //             link: "/gps_tracker/tracker_manager",
      //             collapsed: false
      //           },
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Brand Tracker",
      //             available: true,
      //             link: "/gps_tracker/brand",
      //             collapsed: false
      //           },
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Model Tracker",
      //             available: true,
      //             link: "/gps_tracker/model",
      //             collapsed: false
      //           }
      //         ]
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Subscriptions",
      //         icon: "bx bx bx-memory-card",
      //         available: true,
      //         link: "/Subscriptions",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Subscriptions Manager",
      //             available: true,
      //             link: "/Subscriptions/subscriptions_manager",
      //             collapsed: false
      //           }
      //         ]
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Drivers",
      //         icon: "bx bx bx-user-pin",
      //         available: true,
      //         link: "/drivers",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Drivers Manager",
      //             available: true,
      //             link: "/drivers/drivers_manager",
      //             collapsed: false
      //           }
      //         ]
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Layouts",
      //         icon: "bx bx-layout",
      //         available: true,
      //         link: "/ui",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Without menu",
      //             available: true,
      //             link: "/layout/without-menu",
      //             collapsed: false
      //           },
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Without navbar",
      //             available: true,
      //             link: "/layout/without-navbar",
      //             collapsed: false
      //           },
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Container",
      //             available: true,
      //             link: "/layout/container",
      //             collapsed: false
      //           },
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Fluid",
      //             available: true,
      //             link: "/layout/fluid",
      //             collapsed: false
      //           },
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Blank",
      //             available: true,
      //             link: "/layout/blank",
      //             collapsed: false
      //           }
      //         ]
      //       }
      //     ]
      //   },
      //   {
      //     header: "Organization Management",
      //     items: [
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Users",
      //         icon: "bx bxs-user",
      //         available: true,
      //         link: "/users",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "User manager",
      //             available: true,
      //             link: "/users/user_manager",
      //             collapsed: false
      //           }
      //         ]
      //       },
      //       {
      //         id: generateRandomDoubleId(),
      //         text: "Organization",
      //         icon: "bx bxs-buildings",
      //         available: true,
      //         link: "/organization",
      //         collapsed: false,
      //         submenu: [
      //           {
      //             id: generateRandomDoubleId(),
      //             text: "Organization manager",
      //             available: true,
      //             link: "/organization/organization_manager",
      //             collapsed: false
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
    } 
    ,

    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  reducers: {
    handleExpandMenu: (state, action) => {
      state.menuList = action.payload
    },
    openModalMenu: (state, action) => {
      state.isOpenModal = true;
    },
    closeModalMenu: (state, action) => {
      console.log("sads")
      state.isOpenModal = false;
    }
  },
  extraReducers: (builder) => {
    builder

    .addCase(saveMenuSlice.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(saveMenuSlice.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isOpenModal = false;
      console.log(action.payload)
      state.menuList =  action.payload
    })

    .addCase(saveMenuSlice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error("Something went wrong. If the problem persists, please contact support.");
    })
    .addCase(getMenuSlice.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(getMenuSlice.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.isOpenModal = false;
      console.log(action.payload)
      state.menuList =  action.payload
    })

    .addCase(getMenuSlice.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      toast.error("Something went wrong. If the problem persists, please contact support.");
    })
 
  },
  
});

export const {
  handleExpandMenu,openModalMenu,closeModalMenu
} = menuSlice.actions;
export default menuSlice.reducer;
