import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { toast } from 'react-toastify';
import { Status } from '../assets/enums/enums';

const apiUrl = "http://localhost:9991";




export const fetchReconstructionError = createAsyncThunk(
  'anomalyDetection/fetchReconstructionError',
  async (dateRange, { rejectWithValue }) => {
    try {
      console.log(dateRange)
      console.warn("emter here")
      const res = await axios.get(
        apiUrl + `/api/v1/anomaly_detection/gradient_chart?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      );
      if (res.status === 200) {

        return res.data; // Return geocoding data
      } else {
        toast.error("Failed to fetch anomaly detection.");
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Error fetching Tracking data.");
      return rejectWithValue(error.message);
    }
  }
);


export const fetchanAmalyDetectionData = createAsyncThunk(
  'anomalyDetection/fetchanAmalyDetectionData',
  async (dateRange, { rejectWithValue }) => {
    try {
      console.warn("emter here")
      const res = await axios.get(
        apiUrl + `/api/v1/anomaly_detection/getAnomalyData?startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`
      );
      if (res.status === 200) {

        return res.data; // Return geocoding data
      } else {
        toast.error("Failed to fetch anomaly detection.");
        return rejectWithValue(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Error fetching Tracking data.");
      return rejectWithValue(error.message);
    }
  }
);

const anomalyDetectionSlice = createSlice({
  name: 'anomalyDetection',
  initialState: {
    reconstruction_error: 0,
    anomalyList: [],
    anomalyCount: 0,
    anomalyGrowPercent: 0,
    radarPlotData: {},
    anomalyGroupedByDriver:[],
    status: 'idle',
    error: null,
  },

  reducers: {

    // Add notification list 
    // handleAddNotificationList: (state, action) => {
    //   console.log(" =========> notification ", action.payload);
    //   state.notificationList.push(action.payload);
    //   if(action.payload.notificationStatus =="UNREAD" ){
    //     state.unreadNotification++;
    //   }
    // },



  },

  extraReducers: (builder) => {
    builder
      //fetchReconstructionError
      .addCase(fetchReconstructionError.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReconstructionError.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reconstruction_error = action.payload;
      })
      .addCase(fetchReconstructionError.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      //fetchanAmalyDetectionData
      .addCase(fetchanAmalyDetectionData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchanAmalyDetectionData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.anomalyList = action.payload;
        const filtredData = action.payload.filter((anomaly) => (anomaly.jugement == "anomalies")).length
        state.anomalyCount = filtredData;

        const countTotalResult = action.payload.length;
        state.anomalyGrowPercent = (100 * filtredData) / countTotalResult;

        //mean of each record 
        const sums = {};
        const counts = {};

        // Iterate over each object in the list
        console.log(action.payload)
        action.payload.forEach(item => {
          for (const [key, value] of Object.entries(item.anomalies)) {
            if (!sums[key]) {
              sums[key] = 0;
              counts[key] = 0;
            }
            sums[key] += value;
            counts[key] += 1;
          }
        });

        // Calculate the means
        const means = {};
        for (const key in sums) {

          // const splitedKey = key.split(".")
          // console.log(" splited key",splitedKey)
          
//  means[splitedKey.length >= 2 ? splitedKey[1] : key ]
          means[key]  = (Math.ceil((sums[key] / counts[key])*100)/10);
        }
        state.radarPlotData = means
        console.log("Means:", means);

        state.anomalyGroupedByDriver = groupAndSortByCount(action.payload)

      })
      .addCase(fetchanAmalyDetectionData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },


});

const groupAndSortByCount = (list) => {
  // Step 1: Group by driver.id
  const grouped = list.reduce((acc, item) => {
    console.log(item)
    // const userId = item.position.driver.id;
    const label = item.position.driver.firstName+"_"+item.position.driver.lastName
    if (!acc[label]) {
      acc[label] = { ...item.position.driver,vehicle:item.position.vehicle.licensePlate, countAnomaly: 0, countNormal: 0};
    }
    if(item.jugement == "anomalies"){
      acc[label].countAnomaly += 1;
    }else{
      acc[label].countNormal += 1;

    }
    return acc;
  }, {});

  console.log("atttttttttttttttt",grouped)

  // Step 2: Convert the grouped object into an array
  const groupedArray = Object.values(grouped);

  // Step 3: Sort by count in descending order
  const sorted = groupedArray.sort((a, b) => b.countAnomaly - a.countAnomaly);

  return sorted;
};

export const { } = anomalyDetectionSlice.actions;
export default anomalyDetectionSlice.reducer;
