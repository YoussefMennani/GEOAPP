import { Icon } from "leaflet";
import React from "react";

const MarkerExporter = (vlType) => {
  const car = new Icon({
    iconUrl: "./assets/img/svg/car.svg",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const truck = new Icon({
    iconUrl: "./assets/img/svg/truck.svg",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const moto = new Icon({
    iconUrl: "./assets/img/svg/moto.svg",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const man = new Icon({
    iconUrl: "./assets/img/svg/man.svg",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  const ship = new Icon({
    iconUrl: "./assets/img/svg/ship.svg",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });


  const other = new Icon({
    iconUrl: "./assets/img/svg/marker.svg",
    iconSize: [35, 35], // size of the icon
    // iconAnchor : [22,94], // point of the icon which will correspond to marker's location
    // popupAnchor : [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  switch (vlType) {
    case "car":
      return car;
    case "truck":
      return truck;
    case "moto":
      return moto;
    case "man":
      return man;
    case "ship":
      return ship;
    default:
      return other;
  }
};

export default MarkerExporter;
