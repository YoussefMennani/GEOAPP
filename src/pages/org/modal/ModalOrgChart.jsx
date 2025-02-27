import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, DialogTitle, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeModalMenu, handleExpandMenu, saveMenuSlice } from "../../../slices/menuSlice";
import { addOrganizationSlice, closeModalAddOrganizationHeader, closeModalOrgChart, getOrganizationByIdSlice, getOrganizationDataForChart, getOrganizationRootSlice, saveChnagesOrganization, saveChnagesTargetOrg, saveOrganizationSlice } from "../../../slices/organizationSlice";
import OrgChartOrganization from "../OrgChartOrganization";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
  border: 'none',
  borderRadius: '5px',
  backgroundColor:"#f5f5f5"
};

const ModalOrgChart = ({idOrg}) => {


  const dispatch = useDispatch();
  const [isTouched, setisTouched] = useState(false)

  const [headerState, setHeaderState] = useState({
    header: "",
  }); 
  const { isOpenModalOrgChart,targetOrgChart,orgChartData } = useSelector((state) => state.organization)


  useEffect(() => {
    if (isOpenModalOrgChart) {
      dispatch(getOrganizationDataForChart(targetOrgChart))
    }
  }, [isOpenModalOrgChart,targetOrgChart]);
  

  const handleCloseModal = () => {
    dispatch(closeModalOrgChart())

  }


  return (

    <Modal
      open={isOpenModalOrgChart}
      onClose={handleCloseModal}

    >
      <Box sx={style}>
        <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          <p style={{backgroundColor:"#cfcfcf",padding:"6px",borderRadius:"4px",borderColor:"gray"}}> Organigramme <b>{orgChartData.name}</b></p>
          <IconButton edge="end" color="inherit" onClick={handleCloseModal} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <OrgChartOrganization/>
        </DialogContent>

      </Box>
    </Modal>
  );
};

export default ModalOrgChart;
