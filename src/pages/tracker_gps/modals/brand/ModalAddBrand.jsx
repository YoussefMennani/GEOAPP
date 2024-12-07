import React, { useEffect, useState } from "react";
import { Box, DialogActions, DialogContent, DialogTitle, IconButton, Modal, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addBrandSlice, closeModalEditBrand, updateBrandSlice } from "../../../../slices/brandSlice";


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

const ModalAddBrand = ({ setBrandState, brandState, isEdit }) => {

  
  const dispatch = useDispatch();
  const { isOpenEditModal } = useSelector((state) => state.trackers.brand);
  const [isTouched, setisTouched] = useState(false)

  const [errorsList, setErrorsList] = useState({
    originCountry: "",
    brandName: ""
  });
  
  useEffect(() => {
    if (!isOpenEditModal) {
      setisTouched(false);
    }
  }, [isOpenEditModal]);

  const onChangeFormBrand = (event) => {

    if(isTouched == false)
      setisTouched(true)  
    const { name, value } = event.target;

    // Update the brand state
    setBrandState(prevState => ({
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
    let isValid = true;
    let errors = { originCountry: "", brandName: "" };

    // Validate brand name
    if (!brandState.brandName || brandState.brandName.trim() === "") {
      errors.brandName = "Brand name is required.";
      isValid = false;
    }

    // Validate origin country
    if (!brandState.originCountry || brandState.originCountry.trim() === "") {
      errors.originCountry = "Origin country is required.";
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
      dispatch(addBrandSlice(brandState))
    
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const onClickUpdateBrand = () => {
    console.log("----------- onClickUpdateBrand -------------");
    if(!isTouched){
      toast.info("Nothing was updated as no changes were detected.");
      return;
    }


    if (validateForm()) {
      //toast.success("Form updated successfully!");
      // Here you can add the logic to update the data
      dispatch(updateBrandSlice(brandState))

    } else {
      toast.error("Please fix the errors in the form.");
    }
  };


  const resetErrors = () => {

    setErrorsList({
      originCountry: "",
      brandName: ""
    })

  }

    // Reset isTouched on modal close
 
  const handleCloseEditModal = ()=>{
    
    dispatch(closeModalEditBrand())
  }
  return (
    // <div
    //   className="modal fade"
    //   id="modalCenter"
    //   tabIndex="-1"
    //   aria-hidden="true"
    // >
    //   <div className="modal-dialog modal-dialog-centered" role="document">
    //     <div className="modal-content">
    //       <div className="modal-header">
    //         <h5 className="modal-title" id="modalCenterTitle">
    //           {isEdit ? "Edit Brand" : "Add Brand"}
    //         </h5>
    //         <button
    //           type="button"
    //           className="btn-close"
    //           data-bs-dismiss="modal"
    //           aria-label="Close"
    //           style={{ backgroundColor: "#F0F0F0" }}
    //           onClick={resetErrors}
    //         ></button>
    //       </div>
    //       <div className="modal-body">
    //         <div className="row">
    //           <div className="col mb-3">
    //             <label htmlFor="brandName" className="form-label">
    //               Brand Name
    //             </label>
    //             <input
    //               type="text"
    //               id="brandName"
    //               name="brandName"
    //               className={`form-control ${errorsList.brandName ? "is-invalid" : ""}`}
    //               placeholder="Enter Brand Name"
    //               value={brandState.brandName || ""}
    //               onChange={onChangeFormBrand}
    //             />
    //             {errorsList.brandName && (
    //               <div className="invalid-feedback">{errorsList.brandName}</div>
    //             )}
    //           </div>
    //         </div>
    //         <div className="row g-2">
    //           <div className="mb-3">
    //             <label htmlFor="originCountry" className="form-label">Brand Origin Country</label>
    //             <input
    //               className={`form-control ${errorsList.originCountry ? "is-invalid" : ""}`}
    //               list="datalistOptions"
    //               id="originCountry"
    //               name="originCountry"
    //               placeholder="Type to search..."
    //               value={brandState.originCountry || ""}
    //               onChange={onChangeFormBrand}
    //             />
    //             {errorsList.originCountry && (
    //               <div className="invalid-feedback">{errorsList.originCountry}</div>
    //             )}
    //             <datalist id="datalistOptions">
    //               <option value="United States" />
    //               <option value="China" />
    //               <option value="Germany" />
    //               <option value="Japan" />
    //               <option value="South Korea" />
    //               <option value="United Kingdom" />
    //               <option value="France" />
    //               <option value="Canada" />
    //               <option value="Sweden" />
    //               <option value="Taiwan" />
    //               <option value="Switzerland" />
    //               <option value="India" />
    //               <option value="Israel" />
    //               <option value="Russia" />
    //               <option value="Finland" />
    //             </datalist>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="modal-footer">
    //         <button
    //           type="button"
    //           className="btn btn-outline-secondary"
    //           data-bs-dismiss="modal"
    //           onClick={resetErrors}
    //         >
    //           Close
    //         </button>
    //         {isEdit ? (
    //           <button
    //             type="button"
    //             className="btn btn-primary"
    //             onClick={onClickUpdateBrand}
    //           >
    //                             <span className="bx bx-pencil me-2"></span> 

    //             Update
    //           </button>
    //         ) : (
    //           <button
    //             type="button"
    //             className="btn btn-primary"
    //             onClick={onClickSubmitBrand}
    //           >
    //             <span className="bx bx-layer-plus me-2"></span> 

    //             Submit
    //           </button>




    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Modal
      open={isOpenEditModal}
      onClose={handleCloseEditModal}

    >
      <Box sx={style}>
        <DialogTitle id="dialog-title" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
          {isEdit ? "Edit Brand" : "Add Brand"}
          <IconButton edge="end" color="inherit" onClick={handleCloseEditModal} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent >
          <div className="row">
            <div className="col mb-3">
              <label htmlFor="brandName" className="form-label">
                Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                className={`form-control ${errorsList.brandName ? "is-invalid" : ""}`}
                placeholder="Enter Brand Name"
                value={brandState.brandName || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.brandName && (
                <div className="invalid-feedback">{errorsList.brandName}</div>
              )}
            </div>
          </div>
          <div className="row g-2">
            <div className="mb-3">
              <label htmlFor="originCountry" className="form-label">Brand Origin Country</label>
              <input
                className={`form-control ${errorsList.originCountry ? "is-invalid" : ""}`}
                list="datalistOptions"
                id="originCountry"
                name="originCountry"
                placeholder="Type to search..."
                value={brandState.originCountry || ""}
                onChange={onChangeFormBrand}
              />
              {errorsList.originCountry && (
                <div className="invalid-feedback">{errorsList.originCountry}</div>
              )}
              <datalist id="datalistOptions">
                <option value="United States" />
                <option value="China" />
                <option value="Germany" />
                <option value="Japan" />
                <option value="South Korea" />
                <option value="United Kingdom" />
                <option value="France" />
                <option value="Canada" />
                <option value="Sweden" />
                <option value="Taiwan" />
                <option value="Switzerland" />
                <option value="India" />
                <option value="Israel" />
                <option value="Russia" />
                <option value="Finland" />
              </datalist>
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

export default ModalAddBrand;
