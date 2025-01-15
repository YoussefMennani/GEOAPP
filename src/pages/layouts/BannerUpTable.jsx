import React from "react";
import { useDispatch } from "react-redux";

const BannerUpTable = ({
  parentPath,
  childPath,
  labelButton,
  imageButton,

  onClickAddButton,

}) => {

  const dispatch = useDispatch();

  
  return (
    <div class="d-flex justify-content-between  align-items-end my-3">
      <div className="fs-5">
        <span className="text-muted fw-light"> {parentPath} /</span> {childPath}
      </div>

      <div className="">

        {labelButton.length > 0 &&
        
        <button
          type="button"
          className="btn btn-primary "
          onClick={()=>{
            onClickAddButton()
            
          }}
        >
          <span className={`tf-icons bx ${imageButton} me-2`}></span> {labelButton}
        </button>
        }
        
      </div>
    </div>
  );
};

export default BannerUpTable;
