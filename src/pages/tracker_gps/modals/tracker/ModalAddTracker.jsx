import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addBrandSlice, addModelSlice, addTrackerSlice, closeModalEditBrand, closeModalEditModel, closeModalEditTracker, updateBrandSlice, updateModelSlice, updateTrackerSlice } from "../../../../slices/brandSlice";

import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Badge from "../../../../components/atoms/Badges";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const ModalAddTracker = ({ setEntityState, entityState, isEdit }) => {

  console.log("##################   MODEL STATE", entityState)
  const dispatch = useDispatch();

  const { isOpenEditModal } = useSelector((state) => state.trackers);
  const { listBrand } = useSelector((state) => state.trackers.brand);
  const { listModel } = useSelector((state) => state.trackers.model);
  const [modelSelector, setModelSelector] = useState([])

  const [isTouched, setisTouched] = useState(false)

  const [errorsList, setErrorsList] = useState({
    imei: "",
    model: "",
    brand: "",
    simSerialNumber: "",
    simNumber: "",
    status: "",
  });


  useEffect(() => {
    const newListModel = listModel.filter((model) => model.brand.id == entityState.brand)
    setModelSelector(newListModel)

  }, [entityState.brand])


  useEffect(() => {
    if (!isOpenEditModal) {
      setisTouched(false);
    }
  }, [isOpenEditModal]);

  const onChangeFormBrand = (event) => {
      console.log(entityState)
    if (isTouched == false)
      setisTouched(true)
    const { name, value } = event.target;

    // Update the brand state
    setEntityState(prevState => ({
      ...prevState,
      [name]: value
    }));

    // Clear errors for the field that was changed
    setErrorsList(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));



  };

  const validateForm = () => {
    console.log(entityState)
    let isValid = true;
    let errors = { imei: "", model: "", brand: "", simSerialNumber: "", simNumber: "", status: "" };

    if (!entityState.imei || entityState.imei.trim() === "") {
      errors.imei = "IMEI is required.";
      isValid = false;
    }

    if (entityState.imei.trim() != "" && entityState.imei.length != 15 && (!/^\d{15}$/.test(entityState.imei))) {
      errors.imei = "IMEI must contain exactly 15 digits.";
      isValid = false;
    }

    // if (!entityState.status || entityState.status.trim() === "") {
    //   errors.status = "status is required.";
    //   isValid = false;
    // }

    if (!entityState.model || entityState.model.trim() === "") {
      errors.model = "model is required.";
      isValid = false;
    }

    if (!entityState.model || entityState.model.trim() === "") {
      errors.model = "model is required.";
      isValid = false;
    }

    if (!entityState.brand || entityState.brand.trim() === "") {
      errors.brand = "brand is required.";
      isValid = false;
    }

    if (!entityState.status || entityState.status.trim() === "") {
      errors.status = "status is required.";
      isValid = false;
    }


    if (!entityState.simSerialNumber || entityState.simSerialNumber.length == 0) {
      errors.simSerialNumber = "sim serial number is required.";
      isValid = false;
    }

    // Sim Serial Number: Must be 19-20 characters (digits or letters allowed)
    if (entityState.simSerialNumber.trim() !== "" && !(entityState.simSerialNumber.length >= 19 && entityState.simSerialNumber.length <= 20)) {
      errors.simSerialNumber = "Sim Serial Number must contain 19-20 characters.";
      isValid = false;
    }

    if (!entityState.simNumber || entityState.simNumber.length == 0) {
      errors.simNumber = "sim number is required.";
      isValid = false;
    }

    // Sim Number: Must be exactly 10 digits
    if (entityState.simNumber.trim() !== "" && !/^\d{10}$/.test(entityState.simNumber)) {
      errors.simNumber = "Sim Number must contain exactly 10 digits.";
      isValid = false;
    }

    setErrorsList(errors); // Update errors state
    return isValid;
  };

  const onClickSubmitBrand = () => {
    console.log("----------- onClickSubmitBrand -------------");

    if (validateForm()) {
      dispatch(addTrackerSlice(entityState))
    } else {
      toast.error("Please fix the errors in the form.");
      console.log(errorsList)
    }
  };

  const onClickUpdateBrand = () => {
    console.log("----------- onClickUpdateBrand -------------");
    if (!isTouched) {
      toast.info("Nothing was updated as no changes were detected.");
      return;
    }


    if (validateForm()) {
      //toast.success("Form updated successfully!");
      // Here you can add the logic to update the data
      dispatch(updateTrackerSlice(entityState))

    } else {
      toast.error("Please fix the errors in the form.");
    }
  };



  // Reset isTouched on modal close

  const handleCloseEditModal = () => {

    dispatch(closeModalEditTracker())
  }

  // const handleChange = (event) => {
  //   if (isTouched == false)
  //     setisTouched(true)

  //   const {
  //     target: { value },
  //   } = event;
  //   // setPersonName(
  //   //   // On autofill we get a stringified value.
  //   //   typeof value === 'string' ? value.split(',') : value,
  //   // );

  //   setEntityState(prevState => ({
  //     ...prevState,
  //     features: typeof value === 'string' ? value.split(',') : value,
  //   }));

  // };


  return (

    <Modal
      open={isOpenEditModal}
      onClose={handleCloseEditModal}

    >
      <Box sx={style}>
        <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          {isEdit ? "Edit Tracker" : "Add Tracker"}
          <IconButton edge="end" color="inherit" onClick={handleCloseEditModal} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent >
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="imei" className="form-label">
                imei <Badge type="label-primary" >{entityState.imei.length}</Badge>

              </label>
              <input
                type="text" f
                id="imei"
                name="imei"
                className={`form-control ${errorsList.imei ? "is-invalid" : ""}`}
                placeholder="Enter imei"
                value={entityState.imei || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.imei && (
                <div className="invalid-feedback">{errorsList.imei}</div>
              )}
            </div>

          </div>


          {/* <div className="row">
            <div className="col mb-3">
              <label htmlFor="status" className="form-label">
              status
              </label>
              <input
                type="number"
                id="status"
                name="status"
                className={`form-control ${errorsList.batteryLife ? "is-invalid" : ""}`}
                placeholder="status"
                value={entityState.batteryLife || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.batteryLife && (
                <div className="invalid-feedback">{errorsList.batteryLife}</div>
              )}
            </div>

          </div>
          <div className="row g-2">
            <div className="mb-3">
              <label htmlFor="networkType" className="form-label">Network Type</label>
              <input
                className={`form-control ${errorsList.networkType ? "is-invalid" : ""}`}
                list="datalistOptions"
                id="networkType"
                name="networkType"
                placeholder="Type to search..."
                value={entityState.networkType || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.networkType && (
                <div className="invalid-feedback">{errorsList.networkType}</div>
              )}
              <datalist id="datalistOptions">
                <option value="5G" />
                <option value="4G" />
                <option value="3G" />
                <option value="2G" />
              </datalist>
            </div>
          </div> */}

          <div className="row g-2">
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">Brand</label>
              <select value={entityState.brand} className={`form-control ${errorsList.brand ? "is-invalid" : ""}`} onChange={onChangeFormBrand} name="brand" id="brand" defaultValue="" aria-label="Default select example">
                <option value="">Select brand</option>
                {listBrand.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
              {errorsList.brand && (
                <div className="invalid-feedback">{errorsList.brand}</div>
              )}
            </div>
          </div>

          <div className="row g-2">
            <div className="mb-3">
              <label htmlFor="exampleFormControlSelect1" className="form-label">Model</label>
              <select value={entityState.model} className={`form-control ${errorsList.model ? "is-invalid" : ""}`} onChange={onChangeFormBrand} name="model" id="model" defaultValue="" >
                <option value="">Select Model</option>
                {modelSelector.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.modelName}
                  </option>
                ))}
              </select>
              {errorsList.model && (
                <div className="invalid-feedback">{errorsList.model}</div>
              )}
            </div>
          </div>

          <div className="row g-2">
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select value={entityState.status} className={`form-control ${errorsList.status ? "is-invalid" : ""}`} onChange={onChangeFormBrand} name="status" id="status" defaultValue="INACTIVE" >
              <option value="">Select Status</option>
                <option value="INACTIVE">INACTIVE</option>
                <option value="EN_PANNE">EN PANNE</option>
                <option value="WORKING">WORKING</option>

              </select>
              {errorsList.status && (
                <div className="invalid-feedback">{errorsList.status}</div>
              )}
            </div>
          </div>


          <div className="row">
            <div className="col mb-3">
              <label htmlFor="simSerialNumber" className="form-label">
                Sim Serial Number <Badge type="label-primary" >{entityState?.simSerialNumber?.length || 0}</Badge>
              </label>
              <input
                type="text"
                id="simSerialNumber"
                name="simSerialNumber"
                className={`form-control ${errorsList.simSerialNumber ? "is-invalid" : ""}`}
                placeholder="Enter sim serial number"
                value={entityState.simSerialNumber || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.simSerialNumber && (
                <div className="invalid-feedback">{errorsList.simSerialNumber}</div>
              )}
            </div>

          </div>


          <div className="row">
            <div className="col mb-3">
              <label htmlFor="simNumber" className="form-label">
                Sim Number  <Badge type="label-primary" >{entityState.simNumber.length}</Badge>
              </label>
              <input
                type="text"
                id="simNumber"
                name="simNumber"
                className={`form-control ${errorsList.simNumber ? "is-invalid" : ""}`}
                placeholder="Enter Sim Number"
                value={entityState.simNumber || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.simNumber && (
                <div className="invalid-feedback">{errorsList.simNumber}</div>
              )}
            </div>

          </div>
          {/* <div className="row">
            <div className="col mb-3">
              <label htmlFor="modelName" className="form-label">
                features
              </label>
              <div >
                <FormControl sx={{ m: 0, width: 1 }}>
                  <Select
                    className="form-control"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    sx={{ m: 0, p: 0, border: 0, }}
                    value={entityState.features || []}
                    onChange={handleChange}
                     renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={(entityState.features)?.includes(name)} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {errorsList.brandName && (
                <div className="invalid-feedback">{errorsList.brandName}</div>
              )}
            </div>

          </div> */}

        </DialogContent>

        <DialogActions>
          <button

            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCloseEditModal}
          >
            Cancel
          </button>

          {isEdit ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickUpdateBrand}
            >
              <span className="bx bx-pencil me-2"></span>

              Update
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickSubmitBrand}
            >
              <span className="bx bx-layer-plus me-2"></span>

              Submit
            </button>




          )}
        </DialogActions>

      </Box>
    </Modal>
  );
};

export default ModalAddTracker;
