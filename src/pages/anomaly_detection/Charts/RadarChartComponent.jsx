import React from 'react';
import { useSelector } from 'react-redux';
import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Legend,
    ResponsiveContainer,

} from 'recharts';

function RadarChartComponent() {

    const { radarPlotData, status } = useSelector((state) => state.anomalyDetection);


    const data = [
        {
            "subject": "Speed",
            "A": radarPlotData.speed,
            // "B": 110,
            "fullMark": 100
        },
        {
            "subject": "engine Temperature",
            "A": radarPlotData.engineTemperature,
            // "B": 130,
            "fullMark": 100
        },
        {
            "subject": "coolant Temperature",
            "A": radarPlotData.coolantTemperature,
            // "B": 130,
            "fullMark": 100
        },
        {
            "subject": "engine RPM",
            "A": radarPlotData.engineRPM,
            // "B": 100,
            "fullMark": 100
        },
        {
            "subject": "check Engine Light",
            "A": radarPlotData.checkEngineLight,
            // "B": 90,
            "fullMark": 100
        },
        {
            "subject": "oilPressure",
            "A":  radarPlotData.oilPressure,
            // "B": 85,
            "fullMark": 100
        },
        
    ]

    return (
        <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
        <RadarChart outerRadius={90} width='100%' height={250} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
            <Legend />
        </RadarChart>
        </ResponsiveContainer>
        </div>)
}

export default RadarChartComponent