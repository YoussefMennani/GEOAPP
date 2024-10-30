import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "../../components/atoms/Buttons";
import PopupMarker from "./PopupMarker";
import { Icon } from "leaflet";
import MarkerExporter from "./MarkerExporter";

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};

const Map = () => {


  const position = [36.0339, 1.6596];

  return (
    <>
      <div class="">
        <div class="row">
        <div class="col-sm ">
        <span className="" style={{fontSize: "1.375rem"}}> Map</span> 
        </div>
          <div class="col-sm ">
            <Button type="primary">
              <i class="bx bx-ruler"></i>
            </Button>
            <Button type="primary">
              <span className="tf-icons bx bx-shape-triangle"></span>
            </Button>
            <Button type="primary">
              <span className="tf-icons bx bx-map-pin"></span>
            </Button>
          </div>
          {/* <div class="col-sm">One of three columns</div> */}
          <div class="col-sm">
            <div className="mb-3">
              <input
                className="form-control"
                list="datalistOptions"
                id="exampleDataList"
                placeholder="Type to search..."
              />
              <datalist id="datalistOptions">
                <option value="San Francisco"></option>
                <option value="New York"></option>
                <option value="Seattle"></option>
                <option value="Los Angeles"></option>
                <option value="Chicago"></option>
              </datalist>
            </div>
          </div>
        </div>
      </div>

      <MapContainer
        style={{
          height: "96%",
          width: "100%",
        }}
        center={position}
        attributionControl={true}
        zoom={8}
        minZoom={3}
        scrollWheelZoom={true}
      >
        <ComponentResize />
        <TileLayer
          // className={'ion-hide'}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position}>
          
            <PopupMarker/>
       
        </Marker> */}

        
        <Marker position={position} icon={MarkerExporter("car")} >
          
          <PopupMarker/>
     
      </Marker>
      
        
      </MapContainer>
    </>
  );
};

export default Map;
