import React from "react";
import Button from "../../components/atoms/Buttons";

const BannerUpTable = ({
  parentPath,
  childPath,
  labelButton,
  imageButton,
  data_bs_toggle,
  data_bs_target,
}) => {
  return (
    <div class="d-flex justify-content-between  align-items-end my-3">
      <div className="fs-5">
        <span className="text-muted fw-light"> {parentPath} /</span> {childPath}
      </div>

      <div className="">
        {/* <Button type="primary" className="btn btn-primary" rounded  data-bs-toggle={data_bs_toggle}  data-bs-target={data_bs_target} >
            <span className={`tf-icons bx ${imageButton} me-2`}></span>{labelButton}
          </Button> */}

        <button
          type="button"
          className="btn btn-primary "
          data-bs-toggle={data_bs_toggle}  data-bs-target={data_bs_target}
        >
          <span className={`tf-icons bx ${imageButton} me-2`}></span> {labelButton}
        </button>
      </div>
    </div>
  );
};

export default BannerUpTable;
