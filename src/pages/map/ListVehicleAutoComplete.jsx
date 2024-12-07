import React, { useEffect, useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from "react-redux";
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import { handleDisableVehicle } from "../../slices/mapSlice";

export default function ListVehicleAutoComplete({ isVlListHidden }) {
  const [checked, setChecked] = useState([1]);
  const { vehicleList } = useSelector((state) => state.map)
const dispatch = useDispatch();

  const handleToggle = (imei) => {
    dispatch(handleDisableVehicle(imei))
  };


  return (
    <List dense sx={{
      width: '100%', bgcolor: '#ffffffab',
      display: isVlListHidden ? 'none' : 'block', // Show or hide based on isVlListHidden
      maxHeight: 300, // Set max height to enable scrolling
      overflowY: 'auto', // Enable vertical scrolling when content exceeds max height
     
    }}>

{Object.entries(vehicleList).map(([imei, vehicle]) => {

        console.log("=====================", vehicle
        )
        const labelId = `checkbox-list-secondary-label-${vehicle?.licensePlate}`;
        return (
          <ListItem
            key={vehicle?.licensePlate}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={()=>handleToggle(imei)}
                checked={vehicle?.disabled == false}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <TimeToLeaveIcon />
                </Avatar>

              </ListItemAvatar>
              <ListItemText id={labelId}
                primary={vehicle?.licensePlate}
                // secondary="Jan 9, 2014"
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
