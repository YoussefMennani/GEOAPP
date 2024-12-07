import React from "react";
import Badge from "../../components/atoms/Badges";
import Button from "../../components/atoms/Buttons";
import { Popup } from "react-leaflet";

const PopupMarker = ({imei}) => {
  return (
    <Popup maxWidth="auto" maxHeight="auto">
      <div className="popup-content">
        <p className="text-center fs-5">
          <Badge type="primary">14587-A-87</Badge>
        </p>

        <div className="text-left px-2">
          <p className="">
            <b>imei :</b> {imei}
          </p>
          <p className="">
            <b>Marque :</b> 14587-A-87
          </p>
          <p className="">
            <b>Marque :</b> 14587-A-87
          </p>
          <p className="">
            <b>Marque :</b> 14587-A-87
          </p>
        </div>

        <div className="d-flex justify-content-between mt-3">
          <Button type="dark" className="me-2">
            <i className="bx bx-ruler mx-1"></i>Tracker
          </Button>
          <Button type="dark" className="me-2">
            <i className="bx bx-ruler mx-1"></i>History
          </Button>
          <Button type="dark">
            <i className="bx bx-ruler mx-1"></i>Kilométrage
          </Button>
        </div>
      </div>
    </Popup>
  );
};

export default PopupMarker;
