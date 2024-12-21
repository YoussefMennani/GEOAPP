import { Box, DialogActions, DialogContent, DialogTitle, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalDeleteBrand, closeModalDeleteModel, closeModalDeleteTracker, deleteBrandSlice, deleteModelSlice, deleteTrackerSlice } from '../../../slices/brandSlice';
import { closeModalAssignVehicle, closeModalDeleteVehicle, deleteVehicleSlice } from '../../../slices/vehicleSlice';
import TableDriver from './TableDriver';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
    border: 'none',
    borderRadius: '5px'
};

const ModalAssignVehicle = ({ entity }) => {

    console.log(entity)
    const dispatch = useDispatch();

    
    const { isOpenAssignVlModal } = useSelector((state) => state.vehicles);
    
    const handleCloseModal = ()=>{
        dispatch(closeModalAssignVehicle())
    }
    

    console.log(entity)
    return (

        <Modal
            open={isOpenAssignVlModal}
            onClose={handleCloseModal}
            fullWidth
        >
            <Box sx={style}>
                <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',padding:"0px 10px 0px 10px" }} >
                    Assign Vehicle
                    <IconButton edge="end" color="inherit" onClick={handleCloseModal} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <hr/>
                <DialogContent style={{padding:"0px"}}>
                    <TableDriver vehicleId={entity.id}/>
                </DialogContent>

    

            </Box>
        </Modal>


    )
}

export default ModalAssignVehicle