import { Alert, Button, CardMedia, Chip, Divider, Fab, IconButton, Snackbar, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import axios from 'axios';
import Badge from '../../components/atoms/Badges';
const PopUpMarkerVl = ({ reelVlData }) => {

    const dispatch = useDispatch();

    const handleClosePannel = () => {
        dispatch(closePanelShowVehicle())


    }

    const [locationVl, setlocationVl] = useState("")

    const fetchLocation = async (latitude, longitude) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            if (res.status === 200) {
                setlocationVl(res.data.display_name); // Return geocoding data
            } else {
                toast.error("Failed to fetch location data.");
            }
        } catch (error) {
            toast.error("Error fetching location data.");
        }
    }


    useEffect(() => {
        fetchLocation(reelVlData.latitude, reelVlData.longitude);
    }, [])


    const { vehicleList, selectedVehicle, locationData } = useSelector((state) => state.map)
    const { targetVehicle } = useSelector((state) => state.vehicles)

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
        console.log(targetVehicle)
    }

    const cardData = [
        { icon: 'bx bxs-map', label: 'Location', value: `${reelVlData.latitude}, ${reelVlData.longitude}`, copyable: true },
        { icon: 'bx bxs-hdd', label: 'IMEI', value: reelVlData.imei, copyable: true },
        { icon: 'bx bx-calendar', label: 'Timestamp', value: new Date(reelVlData.timestamp).toLocaleString(), copyable: true },
        { icon: 'bx bx-user-circle', label: 'Driver', value: 'Driver', copyable: true },
        { icon: 'bx bxs-buildings', label: 'Organization', value: 'ref Organ', copyable: true },

        { icon: 'bx bx-car', label: 'Brand', value: targetVehicle.brandVehicle, copyable: true },
        { icon: 'bx bx-car', label: 'Model', value: targetVehicle.modelVehicle, copyable: true },

        // { icon: 'bx bxs-car', label: 'model', value: 'Fiat Punto', copyable: true },
        // { icon: 'bx bxs-thermometer', label: 'model', value: 'Fiat Punto', copyable: true },
    ];

    return (
        <div
            style={{
                // background: "red",
                // padding: '5px',


                // top: '100px',
                // right: '0px',
                // width: "100%",
                // boxShadow: 1
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

            <div >

                {/* <div>
                    <h5 className="card-title">Card title</h5>
                    <IconButton edge="end" color="inherit" onClick={handleCloseDeleteModal} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </div> */}
                <div className=" d-flex justify-content-between align-items-center" style={{ padding: "15px" }}>

                    <Chip avatar={<div className={`spinner-grow ` + (isParked(reelVlData.metrics.isEngineRunning) === true ? "text-danger" : "text-success")} role="status" style={{ width: "16px", height: "16px" }}></div>}

                        label={targetVehicle.licensePlate} onClick={() => handleClick(targetVehicle.licensePlate)} sx={{ fontSize: '15px', fontWeight: "bold" }} />
                    <IconButton edge="end" color="inherit" aria-label="close">
                        <SignalCellularAltIcon color='primary' />
                    </IconButton>



                </div>


                {/* <h6 className="card-subtitle text-muted">Support card subtitle</h6> */}
                <div >

                    {/* <CardMedia
                            component="img"
                            height="150"
                            image="../assets/img/vehicleImage/punto.jpeg"
                            alt="green iguana"
                        /> */}
                    {/* <img aria-label='card image'
          
                     className="img-fluid" src="../assets/img/elements/13.jpg" alt="Card image cap" /> */}
                    {/* <Fab variant="extended" size="small" color="primary" 
                            style={{position:"absolute",top:"-100"}}
                        >
                            <CloseIcon sx={{ mr: 1 }} />
                            Extended
                        </Fab> */}
                    {/* <div style={{ padding: "10px", position: "absolute", top: "-100", marginTop: "-50px", left: "0" }}>
                            <Fab variant="extended" size="small" color="secondary" sx={{ mr: 1, background: "#000000ab", fontWeight: "bold" }} >
                                {targetVehicle.brandVehicle + " " + targetVehicle.modelVehicle}
                            </Fab>
                        </div> */}

                </div>




                <div className="row">
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
                                <div className="col-md-10" style={{ margin: "auto" }}>
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    ))}


                    {/* { icon: 'bx bxs-thermometer', label: 'Temp', value: reelVlData?.metrics?.coolantTemperature, copyable: true },
        { icon: 'bx bxs-car-mechanic', label: 'Check Engine', value: (reelVlData?.metrics?.checkEngineLight ? "ON" : "OFF"), copyable: true }, */}


                    <div className="col-sm-6" >
                        <div
                            className="row hover-gray"
                            onClick={() => handleClick(reelVlData?.metrics?.coolantTemperature)} // Copy only if `copyable` is true
                            style={{ cursor: 'pointer' }} // Show pointer cursor if copyable
                        >
                            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">
                                <i className="bx bxs-tachometer"></i>
                            </label>
                            <div className="col-md-10" style={{ margin: "auto" }}>
                                {/* ['label-primary', 'label-secondary', 'label-success', 'label-danger', 'label-warning', 'label-info', 'label-dark'] */}
                                <Badge type={reelVlData.speed > 126 ? "label-danger" : "label-success"} >{reelVlData.speed+" Km/h"} </Badge>

                            </div>
                        </div>
                    </div>


                    <div className="col-sm-6" >
                        <div
                            className="row hover-gray"
                            onClick={() => handleClick(reelVlData?.metrics?.coolantTemperature)} // Copy only if `copyable` is true
                            style={{ cursor: 'pointer' }} // Show pointer cursor if copyable
                        >
                            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">
                                <i className="bx bxs-thermometer"></i>
                            </label>
                            <div className="col-md-10" style={{ margin: "auto" }}>
                                {/* ['label-primary', 'label-secondary', 'label-success', 'label-danger', 'label-warning', 'label-info', 'label-dark'] */}
                                <Badge type={reelVlData?.metrics?.coolantTemperature > 97 ? "label-danger" : "label-success"} >{reelVlData?.metrics?.coolantTemperature + " *C"}</Badge>

                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6" >
                        <div
                            className="row hover-gray"
                            onClick={() => handleClick(reelVlData?.metrics?.coolantTemperature)} // Copy only if `copyable` is true
                            style={{ cursor: 'pointer' }} // Show pointer cursor if copyable
                        >
                            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">
                                <i className="bx bxs-car-mechanic"></i>
                            </label>
                            <div className="col-md-10" style={{ margin: "auto" }}>
                                {/* ['label-primary', 'label-secondary', 'label-success', 'label-danger', 'label-warning', 'label-info', 'label-dark'] */}
                                <Badge type={reelVlData?.metrics?.checkEngineLight ? "label-danger" : "label-dark"} >{reelVlData?.metrics?.checkEngineLight ? "ON" : "OFF"}</Badge>

                            </div>
                        </div>
                    </div>

                </div>




                <Divider>Location</Divider>
                <div class="py-3 font-weight-normal" onClick={() => handleClick(locationVl)} >
                    {locationVl || 'Unknown'}
                </div>

            </div>
        </div>

    )
}

export default PopUpMarkerVl