import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addBrandSlice, addModelSlice, closeModalEditBrand, closeModalEditModel, updateBrandSlice, updateModelSlice } from "../../../../slices/brandSlice";

import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

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

const features = [
  'Real-Time Tracking',
  'Geo-Fencing Alerts',
  'Speed Monitoring',
  'Battery Level Indicator',
  'Engine Cut-Off',
  'Route History Playback',
  'SOS Button',
  'Movement Detection',
  'Tamper Alert',
  'Fuel Monitoring',
];


const ModalAddModel = ({ setModelState, modelState, isEdit }) => {

  console.log("##################   MODEL STATE",modelState)
  const dispatch = useDispatch();

  const { isOpenEditModal } = useSelector((state) => state.trackers.model);
  const { listBrand } = useSelector((state) => state.trackers.brand);


  const [isTouched, setisTouched] = useState(false)

  const [errorsList, setErrorsList] = useState({
    modelName: "",
    features: "",
    batteryLife: "",
    networkType: "",
    brand: "",
  });

  useEffect(() => {
    if (!isOpenEditModal) {
      setisTouched(false);
    }
  }, [isOpenEditModal]);

  const onChangeFormBrand = (event) => {

    if (isTouched == false)
      setisTouched(true)
    const { name, value } = event.target;

    // Update the brand state
    setModelState(prevState => ({
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
    console.log(modelState)
    let isValid = true;
    let errors = { modelName: "", features: "", batteryLife: "", networkType: "", brand: "" };

    if (!modelState.modelName || modelState.modelName.trim() === "") {
      errors.brandName = "Brand name is required.";
      isValid = false;
    }

    if (!modelState.batteryLife || modelState.batteryLife.trim() === "") {
      errors.batteryLife = "batteryLife is required.";
      isValid = false;
    }

    if (!modelState.networkType || modelState.networkType.trim() === "") {
      errors.networkType = "networkType is required.";
      isValid = false;
    }

    if (!modelState.brand || modelState.brand.trim() === "") {
      errors.brand = "brand is required.";
      isValid = false;
    }

    // Validate origin country
    if (!modelState.features || modelState.features.length == 0) {
      errors.features = "features is required.";
      isValid = false;
    }

    setErrorsList(errors); // Update errors state
    return isValid;
  };

  const onClickSubmitBrand = () => {
    console.log("----------- onClickSubmitBrand -------------");

    if (validateForm()) {
      //toast.success("Form submitted successfully!");
      // Here you can add the logic to submit the data
      dispatch(addModelSlice(modelState))

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
      dispatch(updateModelSlice(modelState))

    } else {
      toast.error("Please fix the errors in the form.");
    }
  };



  // Reset isTouched on modal close

  const handleCloseEditModal = () => {

    dispatch(closeModalEditModel())
  }

  // const [personName, setPersonName] = useState([]);
  const handleChange = (event) => {
    if (isTouched == false)
    setisTouched(true)
    
    const {
      target: { value },
    } = event;
    // setPersonName(
    //   // On autofill we get a stringified value.
    //   typeof value === 'string' ? value.split(',') : value,
    // );

    setModelState(prevState => ({
      ...prevState,
      features: typeof value === 'string' ? value.split(',') : value,
    }));

  };


  return (

    <Modal
      open={isOpenEditModal}
      onClose={handleCloseEditModal}

    >
      <Box sx={style}>
        <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          {isEdit ? "Edit Model" : "Add Model"}
          <IconButton edge="end" color="inherit" onClick={handleCloseEditModal} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent >
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="modelName" className="form-label">
                Model Name
              </label>
              <input
                type="text"
                id="modelName"
                name="modelName"
                className={`form-control ${errorsList.modelName ? "is-invalid" : ""}`}
                placeholder="Enter Model Name"
                value={modelState.modelName || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.modelName && (
                <div className="invalid-feedback">{errorsList.modelName}</div>
              )}
            </div>

          </div>



          <div className="row">
            <div className="col mb-3">
              <label htmlFor="batteryLife" className="form-label">
                Battery Life
              </label>
              <input
                type="number"
                id="batteryLife"
                name="batteryLife"
                className={`form-control ${errorsList.batteryLife ? "is-invalid" : ""}`}
                placeholder="Enter Battery Life (Hour)"
                value={modelState.batteryLife || ""}
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
                value={modelState.networkType || ""}
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
          </div>

          <div className="row g-2">
            <div className="mb-3">
              <label htmlFor="exampleFormControlSelect1" className="form-label">Brand</label>
              <select value={modelState.brand} className="form-select" onChange={onChangeFormBrand} name="brand" id="brand" defaultValue="" aria-label="Default select example">
                <option value="">Select brand</option>
                {listBrand.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.brandName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col mb-3">
              <label htmlFor="modelName" className="form-label">
                features
              </label>
              <div >
                <FormControl sx={{ m: 0, width: 1 }}>
                  {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                  <Select
                    className="form-control"
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    sx={{ m: 0, p: 0, border: 0, }}
                    value={modelState.features || []}
                    onChange={handleChange}
                    // input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {features.map((feature) => (
                      <MenuItem key={feature} value={feature}>
                        <Checkbox checked={(modelState.features)?.includes(feature)} />
                        <ListItemText primary={feature} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {errorsList.brandName && (
                <div className="invalid-feedback">{errorsList.brandName}</div>
              )}
            </div>

          </div>

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

export default ModalAddModel;
