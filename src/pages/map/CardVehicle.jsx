import { Alert, Button, CardMedia, Chip, Divider, Fab, IconButton, Snackbar, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { closePanelShowVehicle } from '../../slices/mapSlice';
import CheckIcon from '@mui/icons-material/Check';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import TaxiAlertOutlinedIcon from '@mui/icons-material/TaxiAlertOutlined';
import RouteIcon from '@mui/icons-material/Route';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { NavLink } from 'react-router-dom';
const CardVehicle = () => {

    const dispatch = useDispatch();

    const handleClosePannel = () => {
        dispatch(closePanelShowVehicle())

    }

    const { vehicleList, selectedVehicle, locationData } = useSelector((state) => state.map)

    const reelVlData = vehicleList[selectedVehicle.lastPosition.imei];

    const [open, setOpen] = useState(false);

    const handleClick = (text) => {
        setOpen(true);
        navigator.clipboard.writeText(text)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    // dispatch(handleGetAdresseLocation())

    const isParked = (deviceTime) => {
        // Assuming `selectedVehicle.lastPosition.timestamp` is in milliseconds
        const lastPositionDate = new Date(deviceTime);

        // Get the current date
        const now = new Date();

        // Calculate the difference in milliseconds
        const differenceInMillis = now - lastPositionDate;

        // Convert the difference to minutes
        const differenceInMinutes = Math.floor(differenceInMillis / (1000 * 60));

        console.log(`Difference: ${differenceInMinutes} minutes`);

        return differenceInMinutes > 5 ? true : false;

    }


    const handleClickTracking = () => {
        console.log(" +++++++++++++++++++++++++++++++++++ TRACKING ++++++++++++++++++++++++++++++++++++++ ")
        console.log(selectedVehicle)
    }

    const cardData = [
        { icon: 'bx bxs-map', label: 'Location', value: `${reelVlData.lastPosition.latitude}, ${reelVlData.lastPosition.longitude}`, copyable: true },
        { icon: 'bx bxs-hdd', label: 'IMEI', value: reelVlData.tracker.imei, copyable: true },
        { icon: 'bx bxs-tachometer', label: 'Speed', value: `${reelVlData.lastPosition.speed} Km/h`, copyable: true },
        { icon: 'bx bx-calendar', label: 'Timestamp', value: new Date(reelVlData.lastPosition.timestamp).toLocaleString(), copyable: true },
        { icon: 'bx bx-user-circle', label: 'Driver', value: 'Driver', copyable: true },
        { icon: 'bx bxs-buildings', label: 'Organization', value: 'ref Organ', copyable: true },
        // { icon: 'bx bxs-car', label: 'model', value: 'Fiat Punto', copyable: true },
        // { icon: 'bx bxs-thermometer', label: 'model', value: 'Fiat Punto', copyable: true },
    ];

    return (
        <div
            style={{
                // background: "red",
                padding: '5px',
                zIndex: '500',
                position: 'absolute',
                top: '100px',
                right: '0px',
                width: "400px",
                boxShadow: 1
            }}
        >

            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}
                anchorOrigin={{
                    vertical: "buttom",
                    horizontal: "center",
                }}
                sx={{ position: "absolute" }}
            >
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="secondary">
                    Text Copied !
                </Alert>
            </Snackbar>


                <div className="card h-100">

                    {/* <div>
                    <h5 className="card-title">Card title</h5>
                    <IconButton edge="end" color="inherit" onClick={handleCloseDeleteModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </div> */}
                    <div className=" d-flex justify-content-between align-items-center" style={{ padding: "15px" }}>
                        {console.log("result =============== " + isParked(selectedVehicle.lastPosition.timestamp))}
                        <Chip avatar={<div className={`spinner-grow ` + (isParked(selectedVehicle.lastPosition.timestamp) === true ? "text-danger" : "text-success")} role="status" style={{ width: "16px", height: "16px" }}></div>}

                            label={selectedVehicle.licensePlate} onClick={() => handleClick(selectedVehicle.licensePlate)} sx={{ fontSize: '15px', fontWeight: "bold" }} />
                        <IconButton edge="end" color="inherit" aria-label="close">
                            <SignalCellularAltIcon color='primary' />
                        </IconButton>


                        <IconButton edge="end" color="inherit" onClick={handleClosePannel} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </div>


                    {/* <h6 className="card-subtitle text-muted">Support card subtitle</h6> */}
                    <div >

                        <CardMedia
                            component="img"
                            height="150"
                            image="../assets/img/vehicleImage/punto.jpeg"
                            alt="green iguana"
                        />
                        {/* <img aria-label='card image'
          
                     className="img-fluid" src="../assets/img/elements/13.jpg" alt="Card image cap" /> */}
                        {/* <Fab variant="extended" size="small" color="primary" 
                            style={{position:"absolute",top:"-100"}}
                        >
                            <CloseIcon sx={{ mr: 1 }} />
                            Extended
                        </Fab> */}
                        <div style={{ padding: "10px", position: "absolute", top: "-100", marginTop: "-50px", left: "0" }}>
                            <Fab variant="extended" size="small" color="secondary" sx={{ mr: 1, background: "#000000ab", fontWeight: "bold" }} >
                                {selectedVehicle.brandVehicle + " " + selectedVehicle.modelVehicle}
                            </Fab>
                        </div>
                        <div style={{ padding: "10px", position: "absolute", top: "-100", marginTop: "-50px", right: "0" }}>
                            <Tooltip title="97">
                                <Fab variant="extended" size="small" color="primary" sx={{ mr: 1 }} >

                                    <DeviceThermostatOutlinedIcon />
                                </Fab>

                            </Tooltip>
                            <Tooltip title="off">
                                <Fab variant="extended" size="small" color="inherit" sx={{ mr: 1 }}>
                                    <TaxiAlertOutlinedIcon />
                                </Fab>
                            </Tooltip>

                            <button aria-label='Click me'
                                type="button"
                                className="btn btn-primary btn-icon rounded-pill dropdown-toggle hide-arrow"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i className="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end" style={{ background: "#f6f6f6" }}>
                                <li>
                                    <span aria-label="dropdown action link" className="dropdown-item" onClick={handleClickTracking}>
                                        <NavLink
                                            to={"history/"+selectedVehicle.licensePlate}
                                            className="menu-link"
                                            target='_blank'
                                        ><GpsFixedIcon /> History</NavLink>
                                        </span></li>
                                <li><a aria-label="dropdown action link" className="dropdown-item" href="#">   <RouteIcon /> Tracking</a></li>
                                <li><a aria-label="dropdown action link" className="dropdown-item" href="#">Something else here</a></li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li><a aria-label="dropdown action link" className="dropdown-item" href="#">Separated link</a></li>
                            </ul>

                        </div>
                    </div>




                  
                        <div className="row p-3">
                            {cardData.map((item, index) => (
                                <div className="col-sm-6" key={index}>
                                    <div
                                        className="row hover-gray"
                                        onClick={() => item.copyable && handleClick(item.value)} // Copy only if `copyable` is true
                                        style={{ cursor: item.copyable ? 'pointer' : 'default' }} // Show pointer cursor if copyable
                                    >
                                        <label htmlFor="html5-text-input" className="col-md-2 col-form-label">
                                            <i className={item.icon}></i>
                                        </label>
                                        <div className="col-md-10" style={{ margin: 'auto' }}>
                                           {item.value}
                                        </div>
                                    </div>
                                </div>
                            ))}


                        </div>
                    



                    <Divider>Location</Divider>
                    <div class="px-3 font-weight-normal">
                        <p onClick={() => handleClick(locationData ? locationData.display_name : 'Unknown')} >{locationData ? locationData.display_name : 'Unknown'}</p>
                    </div>

                </div>
            </div>
   

    )
}

export default CardVehicle