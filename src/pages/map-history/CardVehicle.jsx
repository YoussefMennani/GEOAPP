import { Alert, Button, CardMedia, Chip, Divider, Fab, IconButton, Snackbar, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { closePanelShowVehicle, fetchHistoryVehicle, openPanelShowVehicle } from '../../slices/mapSlice';
import CheckIcon from '@mui/icons-material/Check';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DeviceThermostatOutlinedIcon from '@mui/icons-material/DeviceThermostatOutlined';
import TaxiAlertOutlinedIcon from '@mui/icons-material/TaxiAlertOutlined';
import RouteIcon from '@mui/icons-material/Route';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { NavLink } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useMap } from 'react-leaflet';
import keycloak from '../../keycloak/keycloak';


const CardVehicle = ({ setvehiclePath, setPositionList }) => {

    const dispatch = useDispatch();
    const map = useMap();


    const { vehicleList, selectedVehicle, locationData, isOpenShowVehiclePanel } = useSelector((state) => state.map)
    const { targetVehicle } = useSelector((state) => state.vehicles);

    const { pathCorrection } = useSelector((state) => state.map.mapSettings)

    const handleClosePannel = () => {
        if (isOpenShowVehiclePanel) {
            dispatch(closePanelShowVehicle())
        } else {
            dispatch(openPanelShowVehicle())

        }

    }

    const reelVlData = targetVehicle;

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

    const [trackForm, seTrackForm] = useState({
        vehicleID: "",
        startDateTime: "",
        endDateTime: ""
    });

    const onChangeTrackForm = (event) => {
        const { name, value } = event.target;

        // Update the brand state
        seTrackForm(prevState => ({
            ...prevState,
            [name]: value
        }));

    }

    const [imageUrl, setImageUrl] = useState('../../assets/img/vehicleImage/car_pic.jpg'); // Default avatar

    const fetchFileUrl = async (filePath) => {
        try {
            // Make a GET request to the Spring Boot API
            const response = await axios.get(`http://localhost:8222/minio/retrieve-presigned-url/${filePath}`,{
              headers: { 'Authorization': `Bearer ${keycloak.token}` }
            });
            console.log(response.data)
            return response.data; // Set the pre-signed URL
        } catch (error) {
            console.error('Error fetching file URL:', error);
        }
    };

    useEffect(() => {
        console.log(targetVehicle)
        if (targetVehicle.imgPath) {
            fetchFileUrl(targetVehicle.imgPath).then((url) => {
                if (url) setImageUrl(url); // Update image URL once resolved
            });
        }
    }, [targetVehicle]);

    
    const onClickSubmitTrack = async () => {
        try {
            if (trackForm.startDateTime !== "" && trackForm.endDateTime !== "") {
                const res = await axios.get(
                    `http://localhost:8222/api/v1/vehicles/history?vehicleID=${targetVehicle.id}&startDateTime=${trackForm.startDateTime}&endDateTime=${trackForm.endDateTime}`, {
                    headers: { 'Authorization': `Bearer ${keycloak.token}` }
                }
                );
                if (res.status === 200) {
                    console.log("Response from history", res.data);
                    const response = res.data.data.positionList;
                    if(response.length > 0 ){

                   
                    // Set map view to the first position in the response
                    map.setView([response[0].latitude, response[0].longitude], 16);

                    // Map response into new coordinates array
                    const newResponse = response.map((point) => [point.latitude, point.longitude]);

                    if (pathCorrection) {
                        console.log("Path correction is enabled. Generating wave-like path using OSRM...");
                        // Perform wave-like path generation
                        const wavePath = await generateWavePath(newResponse);

                        if (wavePath && wavePath.length > 0) {
                            setPositionList(wavePath); // Use wave-like path
                            console.log("Wave-like corrected path:", wavePath);
                        } else {
                            console.warn("Wave path generation failed. Falling back to raw path.");
                            setPositionList(newResponse); // Use raw path as fallback
                        }
                    } else {
                        console.log("Path correction is disabled. Using raw path.");
                        setPositionList(newResponse); // Use uncorrected path
                    }

                    setvehiclePath(response); // Set raw vehicle path
                }else{
                    toast.info("No positions history found");
                }
                } else {
                    toast.error("Failed to fetch History data.");
                }
            } else {
                toast.error("Both date fields are required!");
            }
        } catch (error) {
            toast.error("Failed to fetch History data.");
            console.error("Error fetching history:", error);
        }
    };

    // Function to generate wave-like path
    const generateWavePath = async (path) => {
        try {
            const coordinates = path.map((point) => `${point[1]},${point[0]}`).join(";");

            console.log("Sending coordinates to OSRM /route API for wave-like path:", coordinates);

            const res = await axios.get(
                `http://localhost:5001/route/v1/driving/${coordinates}?geometries=geojson&overview=full`
            );

            if (res.status === 200 && res.data.routes.length > 0) {
                // Extract wave-like path from response
                const wavePath = res.data.routes[0].geometry.coordinates.map(
                    ([longitude, latitude]) => [latitude, longitude]
                );
                console.log("Received wave-like path from OSRM:", wavePath);
                return wavePath;
            } else {
                toast.error("Wave path generation failed: No valid routes returned.");
                console.warn("OSRM response data:", res.data);
                return path; // Return original path if route generation fails
            }
        } catch (error) {
            toast.error("Wave path generation failed.");
            console.error("Error during wave path generation:", error);
            return path; // Return original path if an error occurs
        }
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

    return (
        <>
            <div style={{
                // background: "red",
                textAlign: "right",
                padding: '5px',
                zIndex: '500',
                position: 'absolute',
                top: '100px',
                right: '10px',
                width: "80px",
                boxShadow: 1
            }}
            >
                <Button edge="end" color="info" variant="contained" onClick={handleClosePannel} aria-label="close" >
                    <RouteIcon />
                </Button>
            </div>

            <div
                style={{
                    // background: "red",
                    padding: '5px',
                    zIndex: '500',
                    position: 'absolute',
                    top: '150px',
                    right: '0px',
                    width: "500px",
                    boxShadow: 1,
                    display: isOpenShowVehiclePanel ? "block" : "none"
                }}
            >


                <div style={{ backgroundColor: "#e3e3e3" }} >
                    <div className="card h-100">


                        <div style={{ display: "block" }}>
                            <div className=" d-flex justify-content-between align-items-center" style={{ padding: "15px" }}>
                                {console.log("result =============== " + isParked(targetVehicle?.lastPosition?.timestamp))}
                                <Chip avatar={<div className={`spinner-grow ` + (isParked(targetVehicle?.lastPosition?.timestamp) === true ? "text-danger" : "text-success")} role="status" style={{ width: "16px", height: "16px" }}></div>}

                                    label={targetVehicle?.licensePlate} onClick={() => handleClick(targetVehicle?.licensePlate)} sx={{ fontSize: '15px', fontWeight: "bold" }} />
                                <IconButton edge="end" color="inherit" aria-label="close">
                                    <SignalCellularAltIcon color='primary' />
                                </IconButton>


                                <IconButton edge="end" color="inherit" onClick={handleClosePannel} aria-label="close">
                                    <CloseIcon />
                                </IconButton>
                            </div>


                            <div >

                                <CardMedia
                                    component="img"
                                    height="150"
                                    image={imageUrl}
                                    alt="green iguana"
                                />

                                <div style={{ padding: "10px", position: "absolute", top: "-100", marginTop: "-50px", left: "0" }}>
                                    <Fab variant="extended" size="small" color="secondary" sx={{ mr: 1, background: "#000000ab", fontWeight: "bold" }} >
                                        {targetVehicle.brandVehicle + " " + targetVehicle.modelVehicle}
                                    </Fab>
                                </div>
                                <div style={{ padding: "10px", position: "absolute", top: "-100", marginTop: "-50px", right: "0" }}>
                                    <Tooltip title={targetVehicle?.lastPosition?.metrics?.engineTemperature}>
                                        <Fab variant="extended" size="small" color={targetVehicle?.lastPosition?.metrics?.engineTemperature < 100 ? "primary" : "error"} sx={{ mr: 1 }} >
                                            <DeviceThermostatOutlinedIcon />
                                        </Fab>

                                    </Tooltip>
                                    <Tooltip title={targetVehicle?.lastPosition?.metrics.checkEngineLight ? "ON" : "OFF"}>
                                        <Fab variant="extended" size="small" color={targetVehicle?.lastPosition?.metrics?.checkEngineLight ? "warning" : "inherit"} sx={{ mr: 1 }}>
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
                                                    to="/tracking"
                                                    className="menu-link"
                                                    target='_blank'
                                                ><GpsFixedIcon /> Tracking</NavLink>
                                            </span></li>
                                        <li><a aria-label="dropdown action link" className="dropdown-item" href="#">   <RouteIcon /> History</a></li>
                                        <li><a aria-label="dropdown action link" className="dropdown-item" href="#">Something else here</a></li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li><a aria-label="dropdown action link" className="dropdown-item" href="#">Separated link</a></li>
                                    </ul>

                                </div>
                            </div>




                            {/* <div className="p-3">
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
                                                <div className="col-md-10" style={{ margin: 'auto' }}>
                                                    <p className="card-text">{item.value}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                </div>
                            </div> */}

                            <div className="p-3">
                                <div className="mb-3 row">
                                    <label htmlFor="html5-datetime-local-input" className="col-md-3 col-form-label">Start Date</label>
                                    <div className="col-md-9">
                                        <input
                                            name='startDateTime'
                                            className="form-control"
                                            type="datetime-local"
                                            value={trackForm.startDateTime}
                                            onChange={onChangeTrackForm}
                                            id="html5-datetime-local-input" />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="html5-datetime-local-input" className="col-md-3 col-form-label">End Date</label>
                                    <div className="col-md-9">
                                        <input
                                            name='endDateTime'
                                            className="form-control"
                                            type="datetime-local"
                                            value={trackForm.endDateTime}
                                            onChange={onChangeTrackForm}
                                            id="html5-datetime-local-input" />
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <div className="col-md-4">
                                        {/* <button
                                            type="button"
                                            className="btn btn-primary " >
                                            <span className={`tf-icons bx bx-search-alt-2 me-2`}></span> Chercher
                                        </button> */}
                                    </div>

                                    <div className="col-md-4">
                                        {/* <button
                                            type="button"
                                            className="btn btn-primary " >
                                            <span className={`tf-icons bx bx-search-alt-2 me-2`}></span> Chercher
                                        </button> */}
                                    </div>

                                    <div className="col-md-4">
                                        <button
                                            onClick={onClickSubmitTrack}
                                            type="button"
                                            className="btn btn-primary " >
                                            <span className={`tf-icons bx bx-search-alt-2 me-2`}></span> Chercher
                                        </button>
                                    </div>
                                </div>

                            </div>




                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardVehicle