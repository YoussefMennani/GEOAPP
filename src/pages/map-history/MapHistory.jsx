import { MapContainer, TileLayer, Marker, useMap, LayersControl, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import MarkerExporter from "./MarkerExporter";
import 'leaflet-fullscreen/dist/leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'


import { FormControl } from "@mui/material";
// import Test from "./test";
const { BaseLayer } = LayersControl;
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FlagIcon from '@mui/icons-material/Flag';


// import SockJS from 'sockjs-client';

import CardVehicle from "./CardVehicle";
import { fetchVehicleLocation, getAllVehiclesMapSlice, handleSelectVehicle, handleUpdateListVlState, openPanelShowVehicle } from "../../slices/mapSlice";
import { useParams } from "react-router-dom";
import { getVehicleByLicensePlateMapSlice } from "../../slices/vehicleSlice";
import { Icon } from "leaflet";
import PopUpMarkerVl from "./PopUpMarkerVl";

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};





const MapHistory = () => {
  const [searchListVl, setSearchListVl] = useState([])
  const dispatch = useDispatch();

  const { vehicleLicensePlate } = useParams();

  const [vehiclePath, setvehiclePath] = useState([])
  const [positionList, setPositionList] = useState([])

  const { selectedVehicle, isOpenShowVehiclePanel, status, vehicleList, mapSettings } = useSelector((state) => state.map);
  const { targetVehicle } = useSelector((state) => state.vehicles);


  useEffect(() => {
    if (status === 'idle') {
      //dispatch(getAllTrackersSlice());
      dispatch(getVehicleByLicensePlateMapSlice(vehicleLicensePlate))
      dispatch(openPanelShowVehicle())
      // dispatch(getAllBrandsSlice());
      // dispatch(getAllModelsSlice());

    }
  }, [status, dispatch]);





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



  const positionCenter = [33.1463, -6.7676];



  const [mouseXY, setMouseXY] = useState({})


  useEffect(() => {
    console.log(" use Effect path", vehiclePath)
  }, [vehiclePath])



  const start = new Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/pushpin/grn-pushpin.png",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const normal = new Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/pal4/icon54.png",
    // iconUrl: "https://mapicons.mapsmarker.com/wp-content/uploads/mapicons/shape-default/color-09e609/shapecolor-color/shadow-1/border-dark/symbolstyle-white/symbolshadowstyle-dark/gradient-no/sportscar.png",
    // https://maps.google.com/mapfiles/kml/pal4/icon7.png
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const warning = new Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/pal3/icon34.png",
    // https://maps.google.com/mapfiles/kml/pal4/icon7.png
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const end = new Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const imgMarker = (vlData, idx) => {
    if (vlData.speed > 126 || vlData?.metrics?.coolantTemperature > 97 || vlData?.metrics?.checkEngineLight) {
      return warning;
    } else {
      // Determine the icon based on the position in the array
      if (idx === 0) {
        return start;
      } else if (idx === vehiclePath.length - 1) {
        return end;
      } else {
        return normal;
      }
    }
  };



  return (
    <>

      <MapContainer
        style={{
          height: "100%",
          width: "100%",
        }}
        // center={positionCenter}
        center={positionCenter}
        attributionControl={true}
        zoom={6}
        minZoom={3}
        scrollWheelZoom={true}
        fullscreenControl={true}
      >


        <CardVehicle setvehiclePath={setvehiclePath} setPositionList={setPositionList} />
        <Polyline
          positions={positionList}
          color="blue" />



        <LayersControl>
          <BaseLayer name="OpenStreetMap" checked>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>


          <BaseLayer name="OpenTopoMap">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              maxNativeZoom={8}
            />
          </BaseLayer>



        </LayersControl>
        {/* <ComponentResize /> */}


        {/* {
          targetVehicle.lastPosition && 
          <Marker position={[targetVehicle?.lastPosition?.latitude, targetVehicle?.lastPosition?.longitude]} icon={MarkerExporter("car")}></Marker>
        } */}

        {vehiclePath?.map((pos, idx) => {
          return (
            <Marker key={idx} position={[pos.latitude, pos.longitude]}
              icon={imgMarker(pos, idx)}
            >
              <Popup minWidth={400}>
                {/* {`Point ${idx + 1}`} */}
                <PopUpMarkerVl reelVlData={pos} />
              </Popup>
            </Marker>
          )
        }

        )}



      </MapContainer>
    </>
  );
};

export default MapHistory;
