import React, { useEffect, useState } from 'react'


import GaugeChart from 'react-gauge-chart'
import Example from './Example';
import { fetchanAmalyDetectionData, fetchReconstructionError } from '../../slices/anomalyDetectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import LeafletMap from './LeafletMap';
import LineChartComponent from './Charts/LineChartComponent';
import { RadarChart } from 'recharts';
import RadarChartComponent from './Charts/RadarChartComponent';
import BarChartComponent from './Charts/BarChartComponent';


const DashboardAnomaly = () => {

  const dispatch = useDispatch();
  const { anomalyGrowPercent, anomalyCount, reconstruction_error, anomalyList, status } = useSelector((state) => state.anomalyDetection);

  const today = new Date();
  // Add one hour to today's date
  today.setHours(today.getHours() + 2);

  // Get yesterday's date and time
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  // Format dates as ISO string (includes date and time)
  const [dateRange, setDateRange] = useState({
    startDate: yesterday.toISOString(), // Full datetime string for yesterday
    endDate: today.toISOString(),       // Full datetime string for today plus one hour
  });

  // Function to refresh data
  const refreshData = () => {
    dispatch(fetchReconstructionError(dateRange));
    dispatch(fetchanAmalyDetectionData(dateRange));
  };

  // Execute refreshData on dateRange change
  useEffect(() => {
    refreshData();
  }, [dateRange]);



  const chartStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Optional: Adjust based on your layout
  }

  const onClickRefreshButton = () => {
    console.log("refresh..")
  }


  const [isDateRangeHidden, setIsDateRangeHidden] = useState(true);

  const onChangeInputs = (event) => {
    const { name, value } = event.target;

    if (name === "startDate" || name === "endDate") {
      console.log(value)
      setDateRange((prevState) => ({
        ...prevState,
        [name]: value, // Use the actual name from the input
      }));
    } else {
      const today = new Date();
      let startDate = "";
      let endDate = "";

      if (value === "lastDay") {
        setIsDateRangeHidden(true);
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 1);
        endDate = today;
      } else if (value === "lastWeek") {
        setIsDateRangeHidden(true);
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        endDate = today;
      } else if (value === "lastMonth") {
        setIsDateRangeHidden(true);
        startDate = new Date(today);
        startDate.setMonth(today.getMonth() - 1);
        endDate = today;
      }

      if (startDate && endDate) {
        // Add one hour to both startDate and endDate
        startDate.setHours(startDate.getHours() + 2);
        endDate.setHours(endDate.getHours() + 2);


        // Format the dates to a string if needed (e.g., YYYY-MM-DD)
        const formattedStartDate = startDate.toISOString();
        const formattedEndDate = endDate.toISOString();

        setDateRange({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        });
      } else {
        setIsDateRangeHidden(false); // Show the date range inputs
      }
    }
  };



  return (
    <>
      <div className="row my-2">
        <div className="col-md-2">
          <span className="text-muted fw-light"> Anomaly/</span>Dashboard
        </div>
        <div className='col-md-10'>
          <div className='row' style={{ textAlign: "right" }}>
            <div className="col-md-5"></div>
            <div className="col-md-2">
              {!isDateRangeHidden &&

                <input className="form-control" type="datetime-local" id="issueDate" name="startDate"
                  // value={
                  //   license.issueDate
                  //     ? new Date(license.issueDate).toISOString().split("T")[0] // Convert to YYYY-MM-DD
                  //     : ""
                  // } 
                  onChange={(e) => onChangeInputs(e)}

                />
              }
            </div>
            <div className="col-md-2">
              {!isDateRangeHidden && <input className="form-control" type="datetime-local" id="issueDate" name="endDate" style={{ marginRight: "5px" }}
                // value={
                //   license.issueDate
                //     ? new Date(license.issueDate).toISOString().split("T")[0] // Convert to YYYY-MM-DD
                //     : ""
                // } 
                onChange={(e) => onChangeInputs(e)}

              />}
            </div>

            <div className="col-md-2">
              <select className={`form-control`} name="status" id="color" style={{ marginRight: "5px" }} onChange={(e) => onChangeInputs(e)} >
                <option value="lastDay">last day</option>
                <option value="lastWeek">last week</option>
                <option value="lastMonth">last month</option>
                <option value="custom">custom range</option>
              </select>
            </div>

            <div className="col-md-1">

              <button
                type="button"
                className="btn btn-primary "
                onClick={refreshData}
              >
                <i class='bx bx-refresh'></i>
              </button>
            </div>
          </div>
        </div>


      </div>

      <div className='row'>
        <div className='col-md-4' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className='row' >


            {/* <GradientChart/> */}
            {/* <LineChart /> */}
            {/* <div style={{ backgroundColor: "#233446", borderRadius: "5px", textAlign: "center", padding: "30px 0px 0px 0px" }}>
              <h3 style={{ color: "white" }}>Anomaly Percentage</h3>
              {Math.ceil(reconstruction_error * 10) + "%"}
              <GaugeChart
                id="gauge-chart6"
                animate={true}
                nrOfLevels={15}
                percent={(reconstruction_error / 10) > 1 ? 1 : (reconstruction_error / 10)}
                needleColor="#345243"
              />
            </div> */}
            <BarChartComponent />
          </div>
          <div className='row'>

            <div className="col-lg-12 p-0 mt-3">
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex align-items-start justify-content-between">
                    <div className="flex-shrink-0" style={{ border: "1px solid #eefbe7", background: "rgb(217 34 44 / 22%)", padding: "5px 10px", borderRadius: "5px" }}>
                      <i class='bx bxs-radiation' style={{ color: "rgb(217 34 44)", margin: "auto", fontSize: "20px" }}></i>
                    </div>

                  </div>
                  <span className="fw-medium d-block mb-1">Anomalies Count</span>
                  <h3 className="card-title mb-2" style={{ textAlign: "right" }} >{anomalyCount}</h3>
                  <small className="text-danger fw-medium" style={{ float: "right" }}>
                    <i className="bx bx-up-arrow-alt" ></i> {anomalyGrowPercent}%
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-8' >
          {/* <BarChartComponent /> */}
          <Example />
        </div>
      </div>

      <div className='row mt-3' >
        <div className='col-md-8 p-2' style={{ background: "white", borderRadius: "3px" }}>
          <LeafletMap anomalyList={anomalyList} />

        </div>
        <div className='col-md-4' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div className='row' style={{ background: "white", borderRadius: "3px", marginLeft: "5px" }}>
            <LineChartComponent />
          </div>
          <div className='row' style={{ background: "white", borderRadius: "3px", marginLeft: "5px", marginTop: "10px" }}>
            <RadarChartComponent />
          </div>
        </div>

      </div>

    </>
  )
}

export default DashboardAnomaly