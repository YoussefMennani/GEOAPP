import { MapContainer, TileLayer, Marker, Popup, useMap, LayersControl, FeatureGroup, GeoJSON, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "../../components/atoms/Buttons";
import PopupMarker from "./PopupMarker";
import { Icon } from "leaflet";
import MarkerExporter from "./MarkerExporter";
import 'leaflet-fullscreen/dist/leaflet.fullscreen.js'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'

import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import Box from '@mui/material/Box';
import Divider, { dividerClasses } from '@mui/material/Divider';
import { Card, CardMedia, Checkbox, FormControl, IconButton, ListItemText, MenuItem, Select } from "@mui/material";
// import Test from "./test";
import { EditControl } from "react-leaflet-draw";
const { BaseLayer } = LayersControl;
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useEffect, useState } from "react";
import GoogleMaps from "./SearchVehicleAutoComplete";
import CheckboxesTags from "./SearchVehicleAutoComplete";
import SearchVehicleAutoComplete from "./SearchVehicleAutoComplete";
import { useDispatch, useSelector } from 'react-redux';



// import SockJS from 'sockjs-client';
import sockjs from "sockjs-client/dist/sockjs"
import { Client, Stomp } from '@stomp/stompjs';
import CardVehicle from "./CardVehicle";
import { addPolygone, fetchVehicleLocation, getAllVehiclesMapSlice, getPolygone, handleSelectVehicle, handleUpdateListVlState, openPanelShowVehicle } from "../../slices/mapSlice";
import { getAllVehiclesSlice } from "../../slices/vehicleSlice";

const ComponentResize = () => {
  const map = useMap();

  setTimeout(() => {
    map.invalidateSize();
  }, 0);

  return null;
};


const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];



const Map = () => {
  const [searchListVl, setSearchListVl] = useState([])
  const dispatch = useDispatch();

  const { selectedVehicle,isOpenShowVehiclePanel,status,vehicleList,mapSettings,listPolygon } = useSelector((state) => state.map);

  useEffect(() => {
    if (status === 'idle') {
      //dispatch(getAllTrackersSlice());
      dispatch(getAllVehiclesMapSlice())
      // dispatch(getAllBrandsSlice());
      // dispatch(getAllModelsSlice());
      dispatch(getPolygone())

    }
  }, [status, dispatch]);



  const _onEdited = e => {
    let numEdited = 0;
    e.layers.eachLayer(layer => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);

    _onChange();
  };

  const _onCreated = e => {
    let type = e.layerType;

    if (type === "marker") {
      // Do marker specific actions
      console.log("_onCreated: marker created", e);
     
    } else {
      console.log("_onCreated: something else created:", type, e);
      let poylygone = e.layer.getLatLngs();
      dispatch(addPolygone(poylygone));
      
    }
    // Do whatever else you need to. (save to db; etc)

    _onChange();
  };

  const _onDeleted = e => {
    let numDeleted = 0;
    e.layers.eachLayer(layer => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    _onChange();
  };

  const _onMounted = drawControl => {
    console.log("_onMounted", drawControl);
  };

  const _onEditStart = e => {
    console.log("_onEditStart", e);
  };

  const _onEditStop = e => {
    console.log("_onEditStop", e);
  };

  const _onDeleteStart = e => {
    console.log("_onDeleteStart", e);
  };

  const _onDeleteStop = e => {
    console.log("_onDeleteStop", e);
  };

  const getGeoJson = () => {
    return {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: [
              [-122.47979164123535, 37.830124319877235],
              [-122.47721672058105, 37.809377088502615]
            ]
          }
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [-122.46923446655273, 37.80293476836673]
          }
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [-122.48399734497069, 37.83466623607849]
          }
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [-122.47867584228514, 37.81893781173967]
          }
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-122.48069286346434, 37.800637436707525],
                [-122.48069286346434, 37.803104310307276],
                [-122.47950196266174, 37.803104310307276],
                [-122.47950196266174, 37.800637436707525],
                [-122.48069286346434, 37.800637436707525]
              ]
            ]
          }
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-122.48103886842728, 37.833075326166274],
                [-122.48065531253813, 37.832558431940114],
                [-122.4799284338951, 37.8322660885204],
                [-122.47963070869446, 37.83231693093747],
                [-122.47948586940764, 37.832467339549524],
                [-122.47945636510849, 37.83273426112019],
                [-122.47959315776825, 37.83289737938241],
                [-122.48004108667372, 37.833109220743104],
                [-122.48058557510376, 37.83328293020496],
                [-122.48080283403395, 37.83332529830436],
                [-122.48091548681259, 37.83322785163939],
                [-122.48103886842728, 37.833075326166274]
              ]
            ]
          }
        },
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [-122.48043537139893, 37.82564992009924],
                [-122.48129367828368, 37.82629397920697],
                [-122.48240947723389, 37.82544653184479],
                [-122.48373985290527, 37.82632787689904],
                [-122.48425483703613, 37.82680244295304],
                [-122.48605728149415, 37.82639567223645],
                [-122.4898338317871, 37.82663295542695],
                [-122.4930953979492, 37.82415839321614],
                [-122.49700069427489, 37.821887146654376],
                [-122.4991464614868, 37.82171764783966],
                [-122.49850273132326, 37.81798857543524],
                [-122.50923156738281, 37.82090404811055],
                [-122.51232147216798, 37.823344820392535],
                [-122.50150680541992, 37.8271414168374],
                [-122.48743057250977, 37.83093781796035],
                [-122.48313903808594, 37.82822612280363],
                [-122.48043537139893, 37.82564992009924]
              ]
            ]
          }
        }
      ]
    };
  }

  let _editableFG = null;

  // Function to load GeoJSON into FeatureGroup
  const _onFeatureGroupReady = (reactFGref) => {
    if (!reactFGref || !reactFGref.leafletElement) return;

    // Create a new GeoJSON layer and add it to the FeatureGroup
    const leafletGeoJSON = new L.GeoJSON(getGeoJson());
    leafletGeoJSON.eachLayer((layer) => {
      reactFGref.leafletElement.addLayer(layer);
    });

    _editableFG = reactFGref;

  };

  const _onChange = () => {
    // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API



    if (!_editableFG || !onChange) {
      return;
    }

    const geojsonData = this._editableFG.leafletElement.toGeoJSON();
    onChange(geojsonData);
  };

  const handleChange = (event) => {
    // if (isTouched == false)
    //   setisTouched(true)

    // const {
    //   target: { value },
    // } = event;
    // // setPersonName(
    // //   // On autofill we get a stringified value.
    // //   typeof value === 'string' ? value.split(',') : value,
    // // );

    // setEntityState(prevState => ({
    //   ...prevState,
    //   features: typeof value === 'string' ? value.split(',') : value,
    // }));

  };

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

  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });


  const initialState = {
    "516702315483683": {
      imei: "516702315483683",
      longitude: -5.5505, // Coordinates for Rabat
      latitude: 34.020882,
      speed: 60,
      timestamp: 1731799289888,
      altitude: 75.5,
      heading: 90,
    },
    "516702315483684": {
      imei: "516702315483684",
      longitude: -8.0089, // Coordinates for Marrakech
      latitude: 31.634166,
      speed: 45,
      timestamp: 1731799289999,
      altitude: 100.0,
      heading: 180,
    },
    "516702315483685": {
      imei: "516702315483685",
      longitude: -7.6208, // Coordinates for Casablanca
      latitude: 33.573110,
      speed: 50,
      timestamp: 1731799290000,
      altitude: 55.0,
      heading: 270,
    },
    "516702315483686": {
      imei: "516702315483686",
      longitude: -6.8498, // Coordinates for Fez
      latitude: 34.033333,
      speed: 70,
      timestamp: 1731799290111,
      altitude: 120.5,
      heading: 360,
    },
    "516702315483687": {
      imei: "516702315483687",
      longitude: -5.8180, // Coordinates for Meknes
      latitude: 33.896911,
      speed: 40,
      timestamp: 1731799290222,
      altitude: 95.0,
      heading: 45,
    },
  };



  const [positionList, setPositionList] = useState([])

  useEffect(() => {
    if (mapSettings.reelTimeTracking) {
      // Set up WebSocket connection
      const socket = new sockjs('http://localhost:8099/ws'); // Replace with your WebSocket URL
      const stompClient = new Client({
        webSocketFactory: () => socket,
        onConnect: () => {
          stompClient.subscribe('/topic/positions', (message) => {
            try {
              const newData = JSON.parse(message.body);
              console.log(newData);
  
              // Dispatch to update vehicle state
              dispatch(handleUpdateListVlState(newData));
              if(selectedVehicle.lastPosition && selectedVehicle.lastPosition.imei == newData.imei){
                console.log("fetch send for posi")
                dispatch(fetchVehicleLocation(newData));
              }
            } catch (error) {
              console.error('Error parsing message:', error);
            }
          });
        },
        onStompError: (frame) => {
          console.error('STOMP error:', frame.headers['message']);
        },
      });
  
      stompClient.activate();
  
      // Cleanup WebSocket connection
      return () => {
        stompClient.deactivate();
      };
    }
  }, [mapSettings.reelTimeTracking, dispatch, handleUpdateListVlState]);

  const positionsArray = Object.values(positionList);


  // const { listVehicles } = useSelector((state) => state.vehicles);

  const [mouseXY, setMouseXY] = useState({})

  return (
    <>
      {/* <div class="">
        <div class="row">
          <div class="col-sm ">
            <span className="" style={{ fontSize: "1.375rem" }}> Map</span>
          </div>


          <div className="col-sm text">
      

            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                color: 'text.secondary',
                '& svg': {
                  m: 1,
                },
                [`& .${dividerClasses.root}`]: {
                  mx: 0.5,
                },
              }}
            >
              <FormatAlignLeftIcon onClick={() => console.log("hello")} />
              <Divider orientation="vertical" variant="middle" flexItem />

              <FormatAlignCenterIcon />
              <Divider orientation="vertical" variant="middle" flexItem />

              <FormatAlignRightIcon />
              <Divider orientation="vertical" variant="middle" flexItem />
              <FormatBoldIcon />
            </Card>

          </div>



          <div className="col-sm">
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
      </div> */}

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

        {/* Draw polygone */}
        
        {
          listPolygon.map((polygoneData)=>{
            console.log(" polygone draw ",polygoneData)
            return (<Polygon positions={polygoneData.locations} color="blue" />)

          })
        }

        
        <div style={{
          // background: 'red',
          padding: '5px',
          zIndex: '500',
          position: 'relative',
          top: '11px',
          left: '0',
          textAlign: 'center'
        }}>


          <FormControl sx={{ m: 0 }}>
            <SearchVehicleAutoComplete />
          </FormControl>

        </div>


        { isOpenShowVehiclePanel && <CardVehicle mouseXY={mouseXY} />}


        <LayersControl>
          <BaseLayer name="OpenStreetMap" checked>
            <TileLayer
              // className={'ion-hide'}
              // https://leaflet-extras.github.io/leaflet-providers/preview/
              // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={position}>
          
            <PopupMarker/>
       
            </Marker> */}
          </BaseLayer>


          <BaseLayer name="OpenTopoMap">
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              // attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              maxNativeZoom={8}
            />
          </BaseLayer>



        </LayersControl>
        {/* <ComponentResize /> */}


        <FeatureGroup
          ref={reactFGref => {
            _onFeatureGroupReady(reactFGref);
          }}
        >
          <EditControl
            position="topleft"
            onEdited={_onEdited}
            onCreated={_onCreated}
            onDeleted={_onDeleted}
            onMounted={_onMounted}
            onEditStart={_onEditStart}
            onEditStop={_onEditStop}
            onDeleteStart={_onDeleteStart}
            onDeleteStop={_onDeleteStop}
            draw={{
              rectangle: false
            }}
          />
        </FeatureGroup>
        {
        
        
        Object.keys(vehicleList).length > 0 && Object.values(vehicleList).map((pos)=> (
          
          !pos.disabled && <Marker position={[pos?.lastPosition?.latitude, pos?.lastPosition?.longitude]} icon={MarkerExporter("car")}
          
            eventHandlers={{
              click: (event) => {
                
                console.log("Mouse Coordinates:", event.containerPoint); // Log x and y coordinates
                console.log(event)
                setMouseXY(event.containerPoint)
                if(!isOpenShowVehiclePanel){
                   dispatch(openPanelShowVehicle())     
                }
                dispatch(handleSelectVehicle(pos))
                const { latitude, longitude } = pos.lastPosition;
                dispatch(fetchVehicleLocation({ latitude, longitude }));           
                  console.log("Marker data:", pos); // Log the data of the clicked marker
              },
            }}
          >

            {/* <PopupMarker imei={pos.imei} /> */}

          </Marker>
        ))}

      </MapContainer>
    </>
  );
};

export default Map;
