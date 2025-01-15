import React, { useEffect, useState } from "react";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  Modal,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addVehicleSlice,
  closeModalEditVehicle,
  updateVehicleSlice,
} from "../../../slices/vehicleSlice";
import { addDriverSlice, closeModalEditDriver } from "../../../slices/driverSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import organizations from "../../vehicles/data/org";
import keycloak from "../../../keycloak/keycloak";
import { closeModalAddProfilMenu, saveProfileSlice } from "../../../slices/profilSlice";
import MenuPermissions from "./MenuPermissions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  maxHeight: "80vh", // Set a maximum height relative to the viewport height
  overflowY: "auto", // Add vertical scrolling if content exceeds max height
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};


const ModalAddProfile = ({ setEntityState, entityState, isEdit }) => {
  const dispatch = useDispatch();
  const { isOpenAddModal,menuList } = useSelector((state) => state.profil);
  const [errors, setErrors] = useState({});
  const [langValues, setLangValues] = useState("");
  const [imagePreview, setImagePreview] = useState(null);  // Store the preview URL

  // Handle generic field changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setEntityState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear errors for the updated field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };



  useEffect(() => {
    console.log(langValues);
  }, [langValues]);

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate fields
    const requiredFields = [
      "name",
      "description"
    ];

    requiredFields.forEach((field) => {
      if (!entityState[field] || entityState[field].trim() === "") {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateForm()) {
   

      if (isEdit) {
        // dispatch(updateVehicleSlice(payload));
      } else {
        dispatch(saveProfileSlice({...entityState,menu:menuList}));
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  // Close modal
  const handleCloseEditModal = () => {
    dispatch(closeModalAddProfilMenu());
  };


  const [currentPage, setCurrentPage] = useState(1)
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }



  return (
    <Modal open={isOpenAddModal} onClose={handleCloseEditModal}>
      <Box sx={style}>
        <DialogTitle
          id="dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isEdit ? "Edit Profil" : "Add Profil"}

          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseEditModal}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ overflow: "unset" }}>


          {currentPage === 1 && <div className="row">
            {/* First Name */}
            <div className="mb-3 col-md-12">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                value={entityState.name || ""}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3 col-md-12">
              <label htmlFor="description" className="form-label">
                description
              </label>
              <input
                className="form-control"
                type="text"
                id="description"
                name="description"
                value={entityState.description || ""}
                onChange={handleChange}
              />
              {errors.description && (
                <small className="text-danger">{errors.description}</small>
              )}
            </div>

          </div>}


          {currentPage === 2 && <div className="row">

                <MenuPermissions/>
      

          </div>
          }
        </DialogContent>

        <DialogActions>
          {/* <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleCloseEditModal}
          >
            Cancel
          </button> */}

          {currentPage == 1 && <button
            type="button"
            className="btn btn-secondary"
            onClick={handleNextPage}
          >
            Next {currentPage}/2 <i class='bx bxs-chevron-right'></i>
          </button>}
          {currentPage == 2 && <button
            type="button"
            className="btn btn-secondary"
            onClick={handlePreviousPage}
          >
            <i class='bx bxs-chevron-left'></i> Previous {currentPage}/2

          </button>}

          {currentPage == 2 && <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {isEdit ? "Update" : "Submit"}
          </button> }
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default ModalAddProfile;
