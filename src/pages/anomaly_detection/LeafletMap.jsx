import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Icon } from 'leaflet';

// Fix the default marker icon issues
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import Badge from '../../components/atoms/Badges';
import TextDivider from '../../components/atoms/TextDivider';

// Setting up the marker icon
const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

const warning = new Icon({
    iconUrl: "https://maps.google.com/mapfiles/kml/pal3/icon34.png",
    // https://maps.google.com/mapfiles/kml/pal4/icon7.png
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const tolerantError = 1;

const LeafletMap = ({ anomalyList }) => {
    const position = [34.11, -6.58]; // Default position (latitude, longitude)

    return (
        <div style={{ height: '100%', width: '100%' }}>
            <MapContainer center={position} zoom={6} style={{ height: '100%', width: '100%' }} fullscreenControl={true}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {
                    anomalyList.map((anomaly) => {
                        console.log(anomaly)
                        return (
                            anomaly.reconstructionError > anomaly.tolerantError && <Marker position={[anomaly.position.latitude, anomaly.position.longitude]} icon={warning}>
              <Popup minWidth={400}>
                                    <div className='row'>

                                        <div className='col-md-6'> <Badge type={'label-primary'} rounded>
                                            <b>Driver :</b> {anomaly.position.driver.firstName + " " + anomaly.position.driver.lastName}
                                        </Badge></div>
                                        <div className='col-md-6'><Badge type={anomaly.reconstructionError > anomaly.tolerantError ? 'label-danger' : 'label-success'} rounded>{anomaly.reconstructionError > anomaly.tolerantError ? 'Anomaly' : 'Normal'}</Badge>
                                        <Badge type={anomaly.reconstructionError > anomaly.tolerantError ? 'label-danger' : 'label-dark'} rounded> {"Err : " + (Math.ceil(anomaly.reconstructionError * 100) / 10) + "%"}</Badge>
                                       
                                        </div>
                                         <TextDivider text="Metrics" />
                                        <div className='col-md-6'><Badge type={anomaly.anomalies.speed > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"speed : " + anomaly.position.speed}</Badge>
                                        </div>
                                        <div className='col-md-6'><Badge type={anomaly.anomalies["engineTemperature"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"engineTemperature : " + anomaly.position.metrics.engineTemperature}</Badge>
                                        </div>
                                        <div className='col-md-6'><Badge type={anomaly.anomalies["coolantTemperature"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"coolantTemperature : " + anomaly.position.metrics.coolantTemperature}</Badge>
                                        </div>
                                        <div className='col-md-6'><Badge type={anomaly.anomalies["fuelLevel"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"fuelLevel : " + anomaly.position.metrics.fuelLevel}</Badge>
                                        </div>
                                        <div className='col-md-6'><Badge type={anomaly.anomalies["engineRPM"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"engineRPM : " + anomaly.position.metrics.engineRPM}</Badge>
                                        </div>
                                        <div className='col-md-6'><Badge type={anomaly.anomalies["batteryVoltage"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"batteryVoltage : " + anomaly.position.metrics.batteryVoltage}</Badge>
                                        </div>
                                        <div className='col-md-6'><Badge type={anomaly.anomalies["oilPressure"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"oilPressure : " + anomaly.position.metrics.oilPressure}</Badge>
                                        </div>
                                        <div className='col-md-6'><Badge type={anomaly.anomalies["checkEngineLight"] > tolerantError ? 'label-danger' : 'label-secondary'} rounded>{"checkEngineLight : " + (anomaly.position.metrics.checkEngineLight ? "ON" : "OFF")}</Badge>
                                        </div>
                                    </div>
                                    <p>



                                    </p>
                                </Popup>
                            </Marker>)
                    })
                }

            </MapContainer>
        </div>
    );
};

export default LeafletMap;
