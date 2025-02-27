import React, { useEffect, useState } from "react";
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
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
import { getChildOrganizationSlice } from "../../../slices/organizationSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "5px",
};

const ModalAddDriver = ({ setEntityState, entityState, isEdit }) => {
  const dispatch = useDispatch();
  const { isOpenEditModal } = useSelector((state) => state.drivers);
  const { organizationRoot,organizationListChild } = useSelector((state) => state.organization);

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

    // dispatch(getOrganizationRootSlice());
    dispatch(getChildOrganizationSlice());


  }, []);

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0]; // Get the selected file
  //   if (file) {
  //     setSelectedImage(file); // Store the file
  //     setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
  //   }
  // };


  const onChangeInputFile = (event) => {
    const { name } = event.target;

    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL
    }

    setEntityState((prevState) => ({
      ...prevState,
      [name]: event.target.files[0],
    }));
  }


  // Handle language selection
  const handleChangeSelectLang = (event) => {
    const { value } = event.target;
    if (langValues.includes(value)) {
      const newListVal = langValues
        .split("-")
        .filter((part) => part !== value)
        .join("-");
      setLangValues(newListVal);
    } else {
      const newValue = langValues.length === 0 ? value : `${langValues}-${value}`;
      setLangValues(newValue);
    }
    setEntityState((prevState) => ({
      ...prevState,
      ["language"]: langValues,
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
      "firstName",
      "lastName",
      "email",
      "organization",
      "phoneNumber",
      "address",
      "cityOfBirth",
      "birthDate",
      "status",
    ];

    requiredFields.forEach((field) => {
      if (!entityState[field] || entityState[field].trim() === "") {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required.`;
        isValid = false;
      }
    });

    // Email validation
    if (entityState.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(entityState.email)) {
      newErrors.email = "Valid email is required.";
      isValid = false;
    }

    if (
      entityState.phoneNumber &&
      !/^(?:\+212|0)([5-7])[0-9]{8}$/.test(entityState.phoneNumber)
    ) {
      newErrors.phoneNumber = "Enter a valid Moroccan phone number.";
      isValid = false;
    }


    // Language validation
    if (langValues === "") {
      newErrors.language = "At least one language must be selected.";
      isValid = false;
    }

    if (entityState.licenses && entityState.licenses.length == 0) {
      newErrors.licenses = "At least one license must be inserted.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  const handleSubmit = () => {
    if (validateForm()) {
      const languageArray = langValues.split("-").map(lang => lang.trim());
      const payload = {
        ...entityState,
        birthDate: new Date(entityState.birthDate).getTime(),
        language: languageArray,
      };

      if (isEdit) {
        // dispatch(updateVehicleSlice(payload));
        toast.success("Driver updated successfully!");
      } else {
        dispatch(addDriverSlice(payload));
        toast.success("Driver added successfully!");
      }
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  // Close modal
  const handleCloseEditModal = () => {
    dispatch(closeModalEditDriver());
  };


  const [currentPage, setCurrentPage] = useState(1)
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  const handleAddLicense = () => {
    setEntityState((prevState) => ({
      ...prevState,
      licenses: Array.isArray(prevState.licenses)
        ? [
          ...prevState.licenses,
          { id: Math.random(), licenseNumber: "", licenseClass: "", issueDate: "", expiryDate: "" }
        ]
        : [{ id: Math.random(), licenseNumber: "", licenseClass: "", issueDate: "", expiryDate: "" }]
    }));
  }

  const handleDeleteLicense = (id) => {
    setEntityState((prevState) => ({
      ...prevState,
      licenses: prevState.licenses.filter((license) => license.id !== id)
    }));
  };


  const licenseClasses = [
    { value: "A", label: "Class A - Motorcycles" },
    { value: "B", label: "Class B - Light Vehicles" },
    { value: "C", label: "Class C - Heavy Vehicles" },
    { value: "D", label: "Class D - Passenger Vehicles" },
    { value: "E", label: "Class E - Combination Vehicles" },
    { value: "F", label: "Class F - Farm Equipment" },
    { value: "M", label: "Class M - Mopeds" },
    { value: "P", label: "Class P - Learner's Permit" },
  ];


  const handleChangeLicense = (event, id) => {
    const { name, value } = event.target; // Extract name and value from the event

    console.log(name)
    setEntityState((prevState) => ({
      ...prevState,
      licenses: prevState.licenses.map((license) => {
        if (license.id === id && name != "expiryDate" && name != "issueDate") {
          return {
            ...license, // Spread existing license properties
            [name]: value // Dynamically update the field
          };
        } else if (license.id === id && (name == "expiryDate" || name == "issueDate")) {
          const timestamp = new Date(value).getTime();
          return {
            ...license, // Spread existing license properties
            [name]: timestamp // Dynamically update the field
          };
        }

        return license; // Keep other licenses unchanged
      })
    }));

    console.log(entityState)

  };


  return (
    <Modal open={isOpenEditModal} onClose={handleCloseEditModal}>
      <Box sx={style}>
        <DialogTitle
          id="dialog-title"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {isEdit ? "Edit Driver" : "Add Driver"}

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
          {currentPage === 1 && <div className="card-body">
            <div className="d-flex align-items-start align-items-sm-center gap-4">
              <img
                src={imagePreview ? imagePreview : "../assets/img/avatars/1.png"}
                // "../assets/img/avatars/1.png"
                alt="user-avatar"
                className="d-block rounded"
                height="100"
                width="100"
                aria-label="Account image"
                id="uploadedAvatar"
              />
              <div className="button-wrapper">
                <label htmlFor="profileImageUrl" className="btn btn-primary me-2 mb-4" tabIndex="0">
                  <span className="d-none d-sm-block">Upload new photo</span>
                  <i className="bx bx-upload d-block d-sm-none"></i>
                  <input
                    type="file"
                    id="profileImageUrl"
                    name="profileImageUrl"
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
                <p className="text-muted mb-0">Allowed JPG, GIF or PNG. Max size of 800K</p>
              </div>

            </div>
          </div>}

          <hr />
          {currentPage === 1 && <div className="row">
            {/* First Name */}
            <div className="mb-3 col-md-6">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                id="firstName"
                name="firstName"
                value={entityState.firstName || ""}
                onChange={handleChange}
              />
              {errors.firstName && (
                <small className="text-danger">{errors.firstName}</small>
              )}
            </div>

            {/* Last Name */}
            <div className="mb-3 col-md-6">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                className="form-control"
                type="text"
                id="lastName"
                name="lastName"
                value={entityState.lastName || ""}
                onChange={handleChange}
              />
              {errors.lastName && (
                <small className="text-danger">{errors.lastName}</small>
              )}
            </div>

            {/* Email */}
            <div className="mb-3 col-md-6">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                name="email"
                value={entityState.email || ""}
                onChange={handleChange}
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>



            {/* Phone Number */}
            <div className="mb-3 col-md-6">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                className="form-control"
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={entityState.phoneNumber || ""}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <small className="text-danger">{errors.phoneNumber}</small>
              )}
            </div>

            {/* Address */}
            <div className="mb-3 col-md-6">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                className="form-control"
                type="text"
                id="address"
                name="address"
                value={entityState.address || ""}
                onChange={handleChange}
              />
              {errors.address && (
                <small className="text-danger">{errors.address}</small>
              )}
            </div>

            {/* City of Birth */}
            <div className="mb-3 col-md-6">
              <label htmlFor="cityOfBirth" className="form-label">
                City of Birth
              </label>
              <select
                id="cityOfBirth"
                name="cityOfBirth"
                className="form-select"
                value={entityState.cityOfBirth || ""}
                onChange={handleChange}
              >
                <option value="">Select city</option>
                <option value="Rabat">Rabat</option>
                <option value="Sale">Sale</option>
              </select>

              {errors.cityOfBirth && (
                <small className="text-danger">{errors.cityOfBirth}</small>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="organization" className="form-label">Birth Date</label>
              <input className="form-control" type="date" id="birthDate" name="birthDate"
                value={entityState.birthDate || ""}
                onChange={handleChange}
              />
              {errors.birthDate && (
                <small className="text-danger">{errors.birthDate}</small>
              )}
            </div>

            {/* Status */}
            <div className="mb-3 col-md-6">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                id="status"
                name="status"
                className="form-select"
                value={entityState.status || ""}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {errors.status && (
                <small className="text-danger">{errors.status}</small>
              )}
            </div>


          </div>}


          {currentPage === 2 && <div className="row">

            {/* Language */}
            <div className="mb-3 col-md-6">
              <label htmlFor="language" className="form-label">Language</label>
              <select id="language" name="language" className="select2 form-select" onChange={handleChangeSelectLang} value={langValues} >
                <option value="">Select Language</option>
                <option value={langValues} hidden>{langValues}</option>
                {/* style={{langValues.includes("en") ? backgroud:"red"}} */}
                <option value="English"
                  style={langValues && langValues.includes("English") ? { background: "#71a6e2", color: "white" } : {}}
                >English</option>
                <option value="French"
                  style={langValues && langValues.includes("French") ? { background: "#71a6e2", color: "white" } : {}}
                >French</option>
                <option value="German"
                  style={langValues && langValues.includes("German") ? { background: "#71a6e2", color: "white" } : {}}
                >German</option>
                <option value="Portuguese"
                  style={langValues && langValues.includes("Portuguese") ? { background: "#71a6e2", color: "white" } : {}}
                >Portuguese</option>
              </select>
              {errors.language && (
                <small className="text-danger">{errors.language}</small>
              )}
            </div>

            {/* Organization */}
            <div className="mb-3 col-md-6">
              <label htmlFor="organization" className="form-label">
                Organization
              </label>

              <select
                id="organization"
                name="organization"
                className="form-select"
                value={entityState.organization || ""}
                onChange={handleChange}
              >
                <option value="">Select Organization</option>
                {/* {

                  organizations.map(org => {
                    if (keycloak.tokenParsed.realm_access.roles.includes("ADMIN") || org.name == keycloak.tokenParsed.organization) {
                      return (<option key={org.id} value={org.name}>
                        {org.name}
                      </option>)
                    }
                  })
                } */}
                {
                  organizationListChild.map(org => {
                    return (<option key={org.id} value={org.id}>
                      {org.name}
                    </option>)
                  })
                }
                {/* <option value="">Sale</option> */}
              </select>

              {errors.organization && (
                <small className="text-danger">{errors.organization}</small>
              )}
            </div>

            <div className="mb-3 col-md-6">
              <label htmlFor="language" className="form-label">Required Documents</label><br />
              {/* <input type="file" className="form-control" id="documentUrl" name="documentUrl"  onChange={onChangeInputFile}  /> */}
              <label htmlFor="documentUrl" className="btn btn-primary me-2 mb-4" tabIndex="0">
                <span className="d-none d-sm-block">Upload file</span>
                <i className="bx bx-upload d-block d-sm-none"></i>
                <input
                  type="file"
                  id="documentUrl"
                  name="documentUrl"
                  className="account-file-input"
                  hidden
                  onChange={onChangeInputFile}
                />
              </label>
            </div>

            <div className="mb-3 col-md-12" style={{ backgroundColor: "#eaf1e7", borderRadius: "5px", padding: "15px" }}>
              <div style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="btn btn-primary mb-4"
                  onClick={handleAddLicense}
                >
                  <i class='bx bx-id-card mx-2'  ></i> Add License
                </button>
              </div>

              {/* : [{  licenseNumber: Math.random(), class: "", issueDate: "", expiryDate: "",  isValid:false }] */}
              {
                entityState?.licenses?.length == 0 &&
                <div className="row">
                  <div className="mb-3 col-md-12 text-center">NO LICENSE INSERTED YET CLICK <span style={{ color: "orange", fontWeight: "bold" }}>ADD LICENSE BUTTON </span>ABOVE TO DO SO</div>
                </div>

              }

              {
                entityState?.licenses?.length > 0 && entityState?.licenses?.map((license) => {
                  return (
                    <div className="row">
                      <div className="mb-3 col-md-3">
                        <label htmlFor="organization" className="form-label">Class License</label>
                        <select
                          id="licenseClass"
                          name="licenseClass"
                          className="form-select"
                          value={license.licenseClass || ""}
                          onChange={(e) => handleChangeLicense(e, license.id)}
                        >
                          <option value="">Select License Class</option>
                          {licenseClasses?.map((license) => (
                            <option key={license.value} value={license.value}>
                              {license.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3 col-md-4">
                        <label htmlFor="organization" className="form-label">license Number</label>

                        <input
                          className="form-control"
                          type="text"
                          id="licenseNumber"
                          name="licenseNumber"
                          value={license.licenseNumber || ""}
                          onChange={(e) => handleChangeLicense(e, license.id)}

                        />
                      </div>
                      <div className="mb-3 col-md-2">
                        <label htmlFor="organization" className="form-label">issue Date</label>
                        <input className="form-control" type="date" id="issueDate" name="issueDate"
                          value={
                            license.issueDate
                              ? new Date(license.issueDate).toISOString().split("T")[0] // Convert to YYYY-MM-DD
                              : ""
                          } onChange={(e) => handleChangeLicense(e, license.id)}

                        />
                      </div>
                      <div className="mb-3 col-md-2">
                        <label htmlFor="organization" className="form-label">Expiry Date</label>
                        <input className="form-control" type="date" id="expiryDate" name="expiryDate"
                          value={
                            license.expiryDate
                              ? new Date(license.expiryDate).toISOString().split("T")[0] // Convert to YYYY-MM-DD
                              : ""
                          } onChange={(e) => handleChangeLicense(e, license.id)}
                        />
                      </div>
                      <div className="mb-3 col-md-1">
                        <label htmlFor="organization" className="form-label">Action</label>
                        <div>
                          {/* <button
                            type="button"
                            className="btn btn-success  mx-1"
                            
                            onClick={handleAddLicense}
                          >
                            <i class='bx bx-check'></i>
                          </button> */}
                          <IconButton aria-label="delete" size="xlarge" onClick={() => { handleDeleteLicense(license.id) }} sx={{ color: "red" }}>
                            <DeleteIcon />
                          </IconButton>

                        </div>

                      </div>
                    </div>

                  )
                })
              }

            </div>
            {errors.licenses && (
              <small className="text-danger">{errors.licenses}</small>
            )}

          </div>}
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

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {isEdit ? "Update" : "Submit"}
          </button>
        </DialogActions>
      </Box>
    </Modal>
  );
};

export default ModalAddDriver;
