import { Box, DialogActions, DialogContent, DialogTitle, IconButton, Modal, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { closeModalDeleteBrand, closeModalDeleteModel, closeModalDeleteTracker, deleteBrandSlice, deleteModelSlice, deleteTrackerSlice } from '../../../slices/brandSlice';
import { closeModalDeleteVehicle, deleteVehicleSlice } from '../../../slices/vehicleSlice';

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

const ModalConfirmProfilDeletion = ({ entity }) => {

    const dispatch = useDispatch();

    const { isOpenDeleteModal } = useSelector((state) => state.vehicles);
    
    const handleCloseDeleteModal = ()=>{
        dispatch(closeModalDeleteVehicle())
    }
    
    const onClickDelete = () =>{
        dispatch(deleteVehicleSlice(entity.id))
    }

    return (

        <Modal
            open={isOpenDeleteModal}
            onClose={handleCloseDeleteModal}

        >
            <Box sx={style}>
                <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                    Confirm Deletion
                    <IconButton edge="end" color="inherit" onClick={handleCloseDeleteModal} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent >
                    <Typography id="dialog-description">
                        Are you sure you want to delete the vehicle with license plate <strong> {entity.licensePlate}</strong>?
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <button

                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCloseDeleteModal}
                    >
                        Cancel
                    </button>

                    <button
                        className="btn btn-danger" onClick={onClickDelete}>
                        <span className="bx bx-trash  me-2"></span>
                        Delete
                    </button>
                </DialogActions>

            </Box>
        </Modal>


    )
}

export default ModalConfirmProfilDeletion