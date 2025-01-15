import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useSelector } from 'react-redux';
import Badge from '../../components/atoms/Badges';


const Example = () => {

  const {reconstruction_error ,anomalyList, status } = useSelector((state) => state.anomalyDetection);


  const formatDate = (input) =>{

    const date = new Date(input);
    const formattedDate = date
      .toLocaleString('en-GB', { // Use 'en-GB' for day-month-year order
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Use 24-hour format
      })
      .replace(',', ''); // Remove comma if present
    
    return formattedDate;
  
  }
  //should be memoized or stable
  const tolerantError = 1;
  const columns = useMemo(
    () => [
      {
        header: 'rate',
        size: 150,
        Cell: ({ row }) => {
          return  <Badge type={ row.original.reconstructionError > row.original.tolerantError  ? 'label-danger' : 'label-success'} rounded>{ row.original.reconstructionError > row.original.tolerantError  ?  'Anomaly' : 'Normal' }</Badge>
        }
      },
      {
        header: 'Error',
        size: 150,
        Cell: ({ row }) => {
          return  <Badge type={ row.original.reconstructionError > row.original.tolerantError  ? 'label-danger' : 'label-dark'} rounded> { (Math.ceil(row.original.reconstructionError * 100) / 10)+"%" }</Badge>
        }
      },

      {
        header: 'speed',
        size: 150,
        Cell: ({ row }) => {
          return  <Badge type={ row.original.anomalies.speed > tolerantError  ? 'label-danger' : 'label-secondary'} rounded>{ row.original.position.speed  }</Badge>
        }
      },
      // {
      //   header: 'heading',
      //   size: 150,
      //   Cell: ({ row }) => {
      //     return <Badge type={ row.original.reconstructionError > row.original.tolerantError  ? 'label-danger' : 'label-secondary'} rounded>{ (Math.ceil(row.original.anomalies.heading * 10) / 10) }</Badge>
      //   }
      // },
      {
        header: 'engineTemperature',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={ row.original.anomalies["engineTemperature"]  > tolerantError  ? 'label-danger' : 'label-secondary'} rounded>{row.original.position.metrics.engineTemperature }</Badge>
        }
      },
      {
        header: 'coolantTemperature',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={ row.original.anomalies["coolantTemperature"]  > tolerantError  ? 'label-danger' : 'label-secondary'} rounded>{row.original.position.metrics.coolantTemperature }</Badge>
        }
      },
      {
        header: 'fuelLevel',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={ row.original.anomalies["fuelLevel"] > tolerantError  ? 'label-danger' : 'label-secondary'} rounded>{row.original.position.metrics.fuelLevel  }</Badge>
        }
      },
      {
        header: 'engineRPM',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={ row.original.anomalies["engineRPM"]  > tolerantError  ? 'label-danger' : 'label-secondary'} rounded>{row.original.position.metrics.engineRPM }</Badge>
        }
      },
      {
        header: 'batteryVoltage',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={ row.original.anomalies["batteryVoltage"] > tolerantError  ? 'label-danger' : 'label-secondary'} rounded>{row.original.position.metrics.batteryVoltage }</Badge>
        }
      },
      {
        header: 'oilPressure',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={ row.original.anomalies["oilPressure"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{row.original.position.metrics.oilPressure }</Badge>
        }
      },
      {
        header: 'checkEngine Light',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={ row.original.anomalies["checkEngineLight"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{ row.original.position.metrics.checkEngineLight ? "ON" : "OFF" }</Badge>
        }
      },
      {
        header: 'date',
        size: 150,
        Cell: ({ row }) => {
          return <Badge type={'label-primary'} rounded>{formatDate(row.original.positionDate) }</Badge>
        }
      },
      
    ],
    [],
  );


  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6, //customize the default page size
  });

  return <MaterialReactTable columns={columns} data={anomalyList} 
  state={{ pagination }} //pass the pagination state to the table
  onPaginationChange={setPagination} //hoist pagination state to your state when it changes internally

  />;
};

export default Example;
