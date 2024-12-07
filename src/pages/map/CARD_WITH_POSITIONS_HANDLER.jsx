import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Chip,
  Divider,
  Fab,
  IconButton,
  Snackbar,
  Tooltip,
  CardMedia,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closePanelShowVehicle } from '../../slices/mapSlice';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import TaxiAlertOutlinedIcon from '@mui/icons-material/TaxiAlertOutlined';
import RouteIcon from '@mui/icons-material/Route';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const CardVehicle = ({ mouseXY }) => {
  const dispatch = useDispatch();
  const cardRef = useRef(null); // To track the panel div
  const [open, setOpen] = useState(false);

  const { vehicleList, selectedVehicle, locationData } = useSelector((state) => state.map);

  const reelVlData = vehicleList[selectedVehicle.lastPosition.imei];

  const handleClosePannel = () => {
    dispatch(closePanelShowVehicle());
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      handleClosePannel(); // Close if clicked outside
    }
  };

  useEffect(() => {
    // Attach click listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Cleanup listener on unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = (text) => {
    setOpen(true);
    navigator.clipboard.writeText(text);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const isParked = (deviceTime) => {
    const lastPositionDate = new Date(deviceTime);
    const now = new Date();
    const differenceInMinutes = Math.floor((now - lastPositionDate) / (1000 * 60));
    return differenceInMinutes > 5;
  };

  const cardData = [
    { icon: 'bx bxs-map', label: 'Location', value: `${reelVlData.lastPosition.latitude}, ${reelVlData.lastPosition.longitude}`, copyable: true },
    { icon: 'bx bxs-hdd', label: 'IMEI', value: reelVlData.tracker.imei, copyable: true },
    { icon: 'bx bxs-tachometer', label: 'Speed', value: `${reelVlData.lastPosition.speed} Km/h`, copyable: true },
    { icon: 'bx bx-calendar', label: 'Timestamp', value: new Date(reelVlData.lastPosition.timestamp).toLocaleString(), copyable: true },
    { icon: 'bx bx-user-circle', label: 'Driver', value: 'Driver', copyable: true },
    { icon: 'bx bxs-buildings', label: 'Organization', value: 'ref Organ', copyable: true },
  ];

  return (
    <div
      ref={cardRef} // Attach the ref to the panel
      style={{
        padding: '5px',
        zIndex: '500',
        position: 'absolute',
        top: mouseXY.y,
        left: mouseXY.x,
        width: '400px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{ position: 'absolute' }}
      >
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="secondary">
          Text Copied!
        </Alert>
      </Snackbar>

      <div style={{ backgroundColor: '#e3e3e3' }}>
        <div className="card h-100">
          <div className="d-flex justify-content-between align-items-center" style={{ padding: '15px' }}>
            <Chip
              avatar={
                <div
                  className={`spinner-grow ${isParked(selectedVehicle.lastPosition.timestamp) ? 'text-danger' : 'text-success'}`}
                  role="status"
                  style={{ width: '16px', height: '16px' }}
                ></div>
              }
              label={selectedVehicle.licensePlate}
              onClick={() => handleClick(selectedVehicle.licensePlate)}
              sx={{ fontSize: '15px', fontWeight: 'bold' }}
            />
            <IconButton edge="end" color="inherit" aria-label="close">
              <SignalCellularAltIcon color="primary" />
            </IconButton>

            <IconButton edge="end" color="inherit" onClick={handleClosePannel} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>

          <div>
            <CardMedia
              component="img"
              height="150"
              image="../assets/img/vehicleImage/punto.jpeg"
              alt="Vehicle"
            />
            <div style={{ padding: '10px', position: 'absolute', top: '-100', marginTop: '-50px', left: '0' }}>
              <Fab variant="extended" size="small" color="secondary" sx={{ background: '#000000ab', fontWeight: 'bold' }}>
                {selectedVehicle.brandVehicle + ' ' + selectedVehicle.modelVehicle}
              </Fab>
            </div>
          </div>

          <div className="p-3">
            <div className="row">
              {cardData.map((item, index) => (
                <div className="col-sm-6" key={index}>
                  <div
                    className="row hover-gray"
                    onClick={() => item.copyable && handleClick(item.value)}
                    style={{ cursor: item.copyable ? 'pointer' : 'default' }}
                  >
                    <label htmlFor="html5-text-input" className="col-md-2 col-form-label">
                      <i className={item.icon}></i>
                    </label>
                    <div className="col-md-10" style={{ margin: 'auto' }}>
                      <p className="card-text">{item.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Divider>Location</Divider>
          <div className="px-3 font-weight-normal">
            <p onClick={() => handleClick(locationData ? locationData.display_name : 'Unknown')}>
              {locationData ? locationData.display_name : 'Unknown'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardVehicle;
