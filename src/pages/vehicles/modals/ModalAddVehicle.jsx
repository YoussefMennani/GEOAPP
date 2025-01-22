import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addBrandSlice, addModelSlice, addTrackerSlice, closeModalEditBrand, closeModalEditModel, closeModalEditTracker, getAllTrackersSlice, updateBrandSlice, updateModelSlice, updateTrackerAssociation, updateTrackerSlice } from "../../../slices/brandSlice";

import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Badge from "../../../components/atoms/Badges";
import { addVehicleSlice, closeModalEditVehicle, updateVehicleSlice } from "../../../slices/vehicleSlice";
import brands from "../data/brands";
import models from "../data/models";
import organizations from "../data/org";
import keycloak from "../../../keycloak/keycloak";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
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


const ModalAddVehicle = ({ setEntityState, entityState, isEdit }) => {

  console.log("##################   MODEL STATE", entityState)
  const dispatch = useDispatch();

  const { isOpenEditModal } = useSelector((state) => state.vehicles);
  const { listBrand } = useSelector((state) => state.trackers.brand);
  // const { listModel } = useSelector((state) => state.trackers.model);
  const { listTrackers, status } = useSelector((state) => state.trackers);
  const { organizationRoot } = useSelector((state) => state.organization);


  const [modelSelector, setModelSelector] = useState(models)

  const [isTouched, setisTouched] = useState(false)

  const [errorsList, setErrorsList] = useState({

    licensePlate: "",
    modelVehicle: "",
    brandVehicle: "",
    year: "",
    color: "",
    fuelType: "",
    status: "",
    // currentDriver: "",
    // lastPosition: "",
    tracker: "",
    organization: ""
  });


  useEffect(() => {
    const newListModel = models.filter((model) => model.nameBrand == entityState.brandVehicle)
    setModelSelector(newListModel)
    console.log("model selected", newListModel)

  }, [entityState.brandVehicle])


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


    if (name == "brandVehicle") {
      setFilteredModels(models.filter(model => model.nameBrand === value));
    }

    // Clear errors for the field that was changed
    setErrorsList(prevErrors => ({
      ...prevErrors,
      [name]: ""
    }));

  };

  const validateForm = () => {
    let isValid = true;
    let errors = {
      licensePlate: "",
      modelVehicle: "",
      brandVehicle: "",
      year: "",
      color: "",
      fuelType: "",
      status: "",
      tracker: "",
      organization: ""
    };

    // License Plate
    if (!entityState.licensePlate || entityState.licensePlate.trim() === "") {
      errors.licensePlate = "License plate should not be blank";
      isValid = false;
    }

    // Model Vehicle
    if (!entityState.modelVehicle || entityState.modelVehicle.trim() === "") {
      errors.modelVehicle = "Model of the vehicle should not be blank";
      isValid = false;
    }

    // Brand Vehicle
    if (!entityState.brandVehicle || entityState.brandVehicle.trim() === "") {
      errors.brandVehicle = "Brand of the vehicle should not be blank";
      isValid = false;
    }

    // Year with range validation (between 1886 and 2100)
    if (!entityState.year) {
      errors.year = "Year is required";
      isValid = false;
    } else {
      const year = parseInt(entityState.year);
      if (isNaN(year) || year < 1886 || year > 2100) {
        errors.year = "Year should be between 1886 and 2100";
        isValid = false;
      }
    }

    // Color
    if (!entityState.color || entityState.color.trim() === "") {
      errors.color = "Color should not be blank";
      isValid = false;
    }

    // Fuel Type with specific values
    if (!entityState.fuelType || entityState.fuelType.trim() === "") {
      errors.fuelType = "Fuel type should not be blank";
      isValid = false;
    } else if (!["essence", "diesel", "electric", "hybrid"].includes(entityState.fuelType.toLowerCase())) {
      errors.fuelType = "Fuel type must be one of: essence, diesel, electric, or hybrid";
      isValid = false;
    }

    // Status with specific values
    if (!entityState.status || entityState.status.trim() === "") {
      errors.status = "Status should not be blank";
      isValid = false;
    } else if (!["moving", "stopped", "in_maintenance", "decommissioned"].includes(entityState.status.toLowerCase())) {
      errors.status = "Status must be one of: moving, stopped, in_maintenance, decommissioned";
      isValid = false;
    }

    // Tracker (should not be null)
    if (!entityState.tracker) {
      errors.tracker = "Tracker information is required";
      isValid = false;
    }
    // Organization
    if (!entityState.organization) {
      errors.organization = "Organization is required";
      isValid = false;
    }

    setErrorsList(errors); // Update errors state
    return isValid;
  };

  const onClickSubmitBrand = () => {
    console.log("----------- onClickSubmitBrand -------------");

    if (validateForm()) {
      const fullTrackerData = listTrackers.filter((tracker) => tracker.id == entityState.tracker)[0]
      console.log("...........fullTrackerData", fullTrackerData)

      dispatch(addVehicleSlice({
        ...entityState,
        tracker: {
          trackerId: fullTrackerData.id,
          imei: fullTrackerData.imei
        }
      }
      ))

      const newTrackersList = listTrackers.map((tracker) => {
        console.log(" ++++++++++++ test +++++++++++++++")
        console.log(fullTrackerData.id)
        console.log(tracker)
        if (fullTrackerData.id === tracker.id) {
          return { ...tracker, vehicleAssociated: true }
        }
        return tracker;

      })

      dispatch(updateTrackerAssociation(newTrackersList))
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
      const fullTrackerData = listTrackers.filter((tracker) => tracker.id == entityState.tracker)[0]
      console.log("...........fullTrackerData", fullTrackerData)
      console.log("on change input img ", entityState)

      dispatch(updateVehicleSlice({
        ...entityState,
        tracker: {
          trackerId: fullTrackerData.id,
          imei: fullTrackerData.imei
        }
      }))
      // dispatch(updateVehicleSlice(entityState))

    } else {
      toast.error("Please fix the errors in the form.");
    }
  };



  // Reset isTouched on modal close

  const handleCloseEditModal = () => {

    dispatch(closeModalEditVehicle())
  }




  const onChangeInputFile = (event) => {
    const { name } = event.target;
    setisTouched(true)
    // const file = event.target.files[0]; // Get the selected file
    // if (file) {
    //     setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    // }

    setEntityState((prevState) => ({
      ...prevState,
      [name]: event.target.files[0],
    }));

  }



  return (

    <Modal
      open={isOpenEditModal}
      onClose={handleCloseEditModal}

    >


      <Box sx={style}>
        <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          {isEdit ? "Edit Vehicle" : "Add Vehicle"}
          <IconButton edge="end" color="inherit" onClick={handleCloseEditModal} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }} >
          <div className="row">
            <div className="mb-3 col-sm">
              <label htmlFor="imei" className="form-label">
                License Plate
              </label>
              <input
                type="text" f
                id="licensePlate"
                name="licensePlate"
                className={`form-control ${errorsList.licensePlate ? "is-invalid" : ""}`}
                placeholder="Enter licensePlate"
                value={entityState.licensePlate || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.licensePlate && (
                <div className="invalid-feedback">{errorsList.licensePlate}</div>
              )}
            </div>

            <div className="mb-3 col-sm">
              <label htmlFor="exampleFormControlSelect1" className="form-label">Tracker</label>
              <select value={entityState.tracker} className={`form-control ${errorsList.tracker ? "is-invalid" : ""}`} onChange={onChangeFormBrand} name="tracker" id="tracker" defaultValue="" >
                <option value="">Select Tracker</option>
                {listTrackers.map(tracker => {

                  return (
                    !tracker.vehicleAssociated && <option key={tracker.id} value={tracker.id}>
                      {tracker.imei}
                    </option>)

                }

                )}
              </select>
              {errorsList.tracker && (
                <div className="invalid-feedback">{errorsList.tracker}</div>
              )}
            </div>

          </div>


          {/* 
 

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

          <div className="row ">


            <div className="mb-3 col-sm">
              <label htmlFor="brand" className="form-label">Brand Vehicle</label>
              <select
                // value={entityState.brandVehicle} 
                className={`form-control ${errorsList.brandVehicle ? "is-invalid" : ""}`}
                // onChange={onChangeFormBrand} 
                onChange={onChangeFormBrand} value={entityState.brandVehicle}
                name="brandVehicle" id="brandVehicle" >
                <option value="">Select brand Vehicle</option>
                {brands.map(brand => (
                  <option key={brand.idBrand} value={brand.nameBrand}>
                    {brand.nameBrand}
                  </option>
                ))}
              </select>
              {errorsList.brandVehicle && (
                <div className="invalid-feedback">{errorsList.brandVehicle}</div>
              )}
            </div>

            <div className="mb-3 col-sm">
              <label htmlFor="exampleFormControlSelect1" className="form-label">Model Vehicle</label>
              {/* disabled={entityState.brandVehicle.trim() === ""} */}
              <select value={entityState.modelVehicle} className={`form-control ${errorsList.modelVehicle ? "is-invalid" : ""}`} onChange={onChangeFormBrand} name="modelVehicle" id="modelVehicle"  >
                <option value="">Select Model</option>
                {modelSelector.map(model => (
                  <option key={model.id} value={model.nameModel}>
                    {model.nameModel}
                  </option>
                ))}
              </select>
              {errorsList.modelVehicle && (
                <div className="invalid-feedback">{errorsList.modelVehicle}</div>
              )}
            </div>
          </div>


          <div className="row">
            <div className="mb-3 col-sm">
              <label htmlFor="status" className="form-label">
                Year
              </label>
              <input
                type="number"
                id="year"
                name="year"
                className={`form-control ${errorsList.year ? "is-invalid" : ""}`}
                placeholder="Year"
                value={entityState.year || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.year && (
                <div className="invalid-feedback">{errorsList.year}</div>
              )}
            </div>

            <div className="mb-3 col-sm">
              <label htmlFor="status" className="form-label">Color</label>
              <input className={`form-control ${errorsList.color ? "is-invalid" : ""}`} name="color" type="color" value={entityState.color || ""} id="color" onChange={onChangeFormBrand} />

              {errorsList.color && (
                <div className="invalid-feedback">{errorsList.color}</div>
              )}
            </div>
          </div>




          <div className="row">
            <div className="mb-3 col-sm">
              <label htmlFor="status" className="form-label">Fuel Type</label>
              <select value={entityState.fuelType} className={`form-control ${errorsList.fuelType ? "is-invalid" : ""}`} onChange={onChangeFormBrand} name="fuelType" id="fuelType" >

                <option value="">Select Fuel Type</option>
                <option value="essence">Essence</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>

              </select>
              {errorsList.fuelType && (
                <div className="invalid-feedback">{errorsList.fuelType}</div>
              )}
            </div>

            <div className="mb-3 col-sm">
              <label htmlFor="status" className="form-label">Status</label>
              <select value={entityState.status} className={`form-control ${errorsList.status ? "is-invalid" : ""}`} onChange={onChangeFormBrand} name="status" id="color" >
                <option value="">Select Status</option>
                <option value="moving">moving</option>
                <option value="stopped">stopped</option>
                <option value="in_maintenance">in_maintenance</option>
                <option value="decommissioned">decommissioned</option>

              </select>
              {errorsList.status && (
                <div className="invalid-feedback">{errorsList.status}</div>
              )}
            </div>


          </div>
          <div className="row">

            <div className="mb-3 col-sm-6">
              <label htmlFor="status" className="form-label">Organization</label>
              <select
                // value={entityState.brandVehicle} 
                className={`form-control ${errorsList.organization ? "is-invalid" : ""}`}
                // onChange={onChangeFormBrand} 
                onChange={onChangeFormBrand} value={entityState.organization}
                name="organization" id="organization" >
                <option value="">Select Organization</option>
                {
                  organizationRoot.map(org => {
                    return (<option key={org.id} value={org.id}>
                      {org.name}
                    </option>)
                  })
                }
              </select>
              {errorsList.organization && (
                <div className="invalid-feedback">{errorsList.organization}</div>
              )}
            </div>

            <div className="mb-3 col-sm-6">
              <label htmlFor="status" className="form-label">Photo</label>

              <div className="button-wrapper">
                <label htmlFor="imgPath" className="btn btn-primary me-2 mb-4" tabIndex="0">
                  <span className="d-none d-sm-block">Upload new photo</span>
                  <i className="bx bx-upload d-block d-sm-none"></i>
                  <input
                    type="file"
                    id="imgPath"
                    name="imgPath"
                    className="account-file-input"
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={onChangeInputFile}
                  />
                </label>
                <button aria-label='Click me' type="button" className="btn btn-outline-secondary account-image-reset mb-4">
                  <i className="bx bx-reset d-block d-sm-none"></i>
                  <span className="d-none d-sm-block">Reset</span>
                </button>
              </div>

            </div>
          </div>
          <div className="row g-2">

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

export default ModalAddVehicle;
