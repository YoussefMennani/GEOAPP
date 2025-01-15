import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, DialogTitle, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeModalMenu, handleExpandMenu, saveMenuSlice } from "../../../slices/menuSlice";


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

const ModalAddMenuHeader = () => {


  const dispatch = useDispatch();
  const [isTouched, setisTouched] = useState(false)

  const [headerState, setHeaderState] = useState({
    header: "",
  });
  const { isOpenModal, menuList } = useSelector((state) => state.menu);


  const [errorsList, setErrorsList] = useState({
    header: "",
  });

  useEffect(() => {
    if (!isOpenModal) {
      setisTouched(false);
    }
  }, [isOpenModal]);

  const onChangeFormBrand = (event) => {

    if (isTouched == false)
      setisTouched(true)
    const { name, value } = event.target;

    // Update the brand state
    setHeaderState(prevState => ({
      ...prevState,
      [name]: value
    }));

  };





  const addTopMenu = () => {
    if (headerState.header != "") {

      const newMenu = {
        menuName:menuList.menuName,
        data:[
          ...menuList.data, // Spread the existing menuList array
          {
            header:headerState.header,
            items: []
          }
        ]
      } 
      dispatch(saveMenuSlice(newMenu))
      handleCloseModal()

    } else {
      toast.error("field required")
    }
  }

  const handleCloseModal = () => {
    dispatch(closeModalMenu())

  }


  return (

    <Modal
      open={isOpenModal}
      onClose={handleCloseModal}

    >
      <Box sx={style}>
        <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          Add Header Menu
          <IconButton edge="end" color="inherit" onClick={handleCloseModal} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent >
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="header" className="form-label">
                Header Name
              </label>
              <input
                type="text"
                id="header"
                name="header"
                className={`form-control ${errorsList.header ? "is-invalid" : ""}`}
                placeholder="Enter Header Name"
                value={headerState.header || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.header && (
                <div className="invalid-feedback">{errorsList.header}</div>
              )}
            </div>
          </div>

        </DialogContent>

        <DialogActions>
          <button

            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCloseModal}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={addTopMenu}
          >
            <span className="bx bx-layer-plus me-2"></span>

            Submit
          </button>



        </DialogActions>

      </Box>
    </Modal>
  );
};

export default ModalAddMenuHeader;
