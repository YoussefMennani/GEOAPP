import React, { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Stack } from '@mui/system';
import { Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '../../components/atoms/Buttons';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CheckboxListSecondary from './ListVehicleAutoComplete';
import ListVehicleAutoComplete from "./ListVehicleAutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { handleDisableVehicle } from "../../slices/mapSlice";







export default function SearchVehicleAutoComplete() {

  const dispatch = useDispatch();
  const [isVlListHidden, setIsVlListHidden] = useState(true)
  const {vehicleList} = useSelector((state)=>state.map)

  const handleMenuVlMap = () => {
    setIsVlListHidden(prev => !prev)
  }


  const handleDelete = (imei) => {
    dispatch(handleDisableVehicle(imei))
  };



  return (
    <div style={{ padding: 5, padding: 5, background: '#ffffffab', width: '600px', borderRadius: 4 }}>
      <div className="input-group input-group-merge">
        <span className="input-group-text" id="basic-addon-search31"><i className="bx bx-search"></i></span>
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          aria-label="Search..."
          aria-describedby="basic-addon-search31"
          style={{background:"#ffffffab"}}
          />
        <span className="input-group-text" id="basic-addon-search31" onClick={handleMenuVlMap}>
          <i className="bx bxs-down-arrow"></i>
        </span>

      </div>
      <div style={{ overflow: 'auto', height: 90, padding: 10, borderBottom: "1px solid #E8E8E8", display: isVlListHidden ? "none" : "block" }}>
        <Stack direction="row" spacing={1} >
          {
          
           Object.entries(vehicleList).map(([imei, vehicle]) => (

                !vehicle.disabled && <Chip
                key={imei}
                label={vehicle.licensePlate}  // You can customize this based on your array structure
                onDelete={()=> handleDelete(imei)}
                style={{ margin: '4px' }}
              />
           )
            )
          }
        </Stack>
      </div>
      <ListVehicleAutoComplete isVlListHidden={isVlListHidden} />

    </div>
  );
}

