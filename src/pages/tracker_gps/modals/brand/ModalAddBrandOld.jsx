import React, { useState } from "react";
import { toast } from "react-toastify";

const ModalAddBrand = ({ setBrandState, brandState, isEdit }) => {
  
  const [errorsList, setErrorsList] = useState({
    originCountry: "",
    brandName: ""
  });

  const onChangeFormBrand = (event) => {
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
      toast.success("Form submitted successfully!");
      // Here you can add the logic to submit the data
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };

  const onClickUpdateBrand = () => {
    console.log("----------- onClickUpdateBrand -------------");
    if (validateForm()) {
      toast.success("Form updated successfully!");
      // Here you can add the logic to update the data
    } else {
      toast.error("Please fix the errors in the form.");
    }
  };


  const resetErrors = ()=>{
    
      setErrorsList({
        originCountry: "",
        brandName: ""
      })
    
  }

  return (
    <div
      className="modal fade"
      id="modalCenter"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalCenterTitle">
              {isEdit ? "Edit Brand" : "Add Brand"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: "#F0F0F0" }}
              onClick={resetErrors}
            ></button>
          </div>
          <div className="modal-body">
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
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              onClick={resetErrors}
            >
              Close
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddBrand;
