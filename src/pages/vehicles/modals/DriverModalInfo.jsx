import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalShowDriverInfo, unassignDriverSlice } from '../../../slices/vehicleSlice';
import { Avatar, DialogActions, DialogContent, DialogTitle, IconButton, Modal } from '@mui/material';
import Badge from '../../../components/atoms/Badges';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import LinkOffIcon from '@mui/icons-material/LinkOff';

function DriverModalInfo({ driverInfo,vehicleId }) {

    console.log(" driver info ", driverInfo)
    const dispatch = useDispatch();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '40%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 2,
        border: 'none',
        borderRadius: '5px'
    };

    const { isOpenShowDriverInfo } = useSelector((state) => state.vehicles);

    const handleCloseModal = () => {
        dispatch(closeModalShowDriverInfo())
    }

    const rateFunc = (rate) => {
        // Access the `rate` value
        const maxStars = 5; // Define the maximum number of stars

        // Generate star icons
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {[...Array(maxStars)].map((_, index) => (
                    <span key={index}>
                        {index < rate ? (
                            <StarIcon style={{ color: 'gold' }} />
                        ) : (
                            <StarOutlineIcon style={{ color: 'gold' }} />
                        )}
                    </span>
                ))}
            </div>
        );
    }

    const cardData = [
        { icon: 'bx bx-user-circle', label: 'Full name', value: `${driverInfo.firstName}, ${driverInfo.lastName}`, copyable: true },
        { icon: 'bx bxs-envelope', label: 'email', value: driverInfo.email, copyable: true },
        { icon: 'bx bxs-buildings', label: 'organization', value: `${driverInfo.organization}`, copyable: true },
        { icon: 'bx bxs-phone-call', label: 'phoneNumber', value: `${driverInfo.phoneNumber}`, copyable: true },
        { icon: 'bx bxs-location-plus', label: 'address', value: `${driverInfo.address}`, copyable: true },
        { icon: 'bx bxs-buildings', label: 'Organization', value: `${driverInfo.organization}`, copyable: true },
        { icon: 'bx bx-calendar', label: 'birthDate', value: new Date(driverInfo.birthDate).toLocaleString(), copyable: true },
        { icon: 'bx bxs-star-half', label: 'rate', value: rateFunc(driverInfo.rate), copyable: true },

        {
            icon: 'bx bxs-user-voice', label: 'license', value:
                driverInfo.licenses?.map((license) => {
                    return (
                        <Badge type="label-primary" rounded ><span style={{ fontSize: "14px" }}>{license.licenseClass}</span></Badge>

                    )
                })
            , copyable: true
        },
        {
            icon: 'bx bxs-user-voice', label: 'language', value: driverInfo.language?.map((language) => {
                return (
                    <Badge type="label-dark" rounded ><span style={{ fontSize: "14px" }}>{language}</span></Badge>

                )
            }), copyable: true
        },
    ];


    const unassignDriverFromVehicle = async (vehicleId, driverId) => {
        console.log(vehicleId+"  =========>  "+driverId)
        // setEntityState((prevState) => ({
        //     ...prevState,
        //     id: vehicleId,
        //     licensePlate: licensePlate,
        // }));
        await dispatch(unassignDriverSlice({vehicleId,driverId}));
    };

    return (
        <Modal
            open={isOpenShowDriverInfo}
            onClose={handleCloseModal}

        >
            <Box sx={style}>
                <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Avatar
                            alt="Remy Sharp"
                            src="../assets/img/avatars/1.png"
                            sx={{ width: 56, height: 56 }}
                        />
                    <IconButton edge="end" color="inherit" onClick={handleCloseModal} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent >
                    <div className="row p-3">
                        <div className="col-sm-12">
                        
                        </div>
                        {cardData.map((item, index) => (
                            <div className="col-sm-6 my-1 text-break" key={index}>
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
                </DialogContent>

                <DialogActions>
                    {/* <button

                        type="button"
                        className="btn btn-outline-secondary"

                    >
                        Cancel
                    </button> */}

                    <button
                        className="btn btn-danger" 
                        onClick={()=>unassignDriverFromVehicle(vehicleId,driverInfo.id)}
                        >
                        <LinkOffIcon/>
                        UnLink
                    </button>
                </DialogActions>

            </Box>
        </Modal>
    )
}

export default DriverModalInfo