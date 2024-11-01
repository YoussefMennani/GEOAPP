import React from "react";

const ModalAddVehicle = () => {
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
              Modal title
            </h5>
            <button
              aria-label="Click me"
              type="button"
              className="btn-close"
              style={{ backgroundColor: "#F0F0F0" }}
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col mb-3">
                <label htmlFor="nameWithTitle" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="nameWithTitle"
                  className="form-control"
                  placeholder="Enter Name"
                />
              </div>
            </div>
            <div className="row g-2">
              <div className="col mb-0">
                <label htmlFor="emailWithTitle" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="emailWithTitle"
                  className="form-control"
                  placeholder="xxxx@xxx.xx"
                />
              </div>
              <div className="col mb-0">
                <label htmlFor="dobWithTitle" className="form-label">
                  DOB
                </label>
                <input type="date" id="dobWithTitle" className="form-control" />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              aria-label="Click me"
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              aria-label="Click me"
              type="button"
              className="btn btn-primary"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddVehicle;
