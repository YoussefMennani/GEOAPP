import React from 'react'
import { useSelector } from 'react-redux';
import {
    BarChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Bar,Legend, ResponsiveContainer

  } from 'recharts';


function BarChartComponent() {

    const { anomalyGroupedByDriver, status } = useSelector((state) => state.anomalyDetection);

    const anomalyGroupedByDriverData = anomalyGroupedByDriver.map((item) => {

      return (
        {
          name: item.vehicle, anomaly: item.countAnomaly, normal: item.countNormal
        }
      )
    })
    
  return (
    <div style={{ width: '100%', height: '350px',background: "white", borderRadius: "3px" }}>
    <ResponsiveContainer>
                                  
      <BarChart data={anomalyGroupedByDriverData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="anomaly" fill="rgb(255 62 29)" />
        <Bar dataKey="normal" fill="#82ca9d" />
      </BarChart>
      </ResponsiveContainer>
      </div>
  )
}

export default BarChartComponent