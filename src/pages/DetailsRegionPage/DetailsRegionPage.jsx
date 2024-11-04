import React, { useState } from "react";
import "./style.scss";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const DetailsRegionPage = () => {
  const [activeTab, setActiveTab] = useState("information");

  // Tọa độ trung tâm Cát Hải, Hải Phòng
  const position = [20.7884, 106.8983];
  return (
    <div className="details-region-page">
      <NavbarComponent />

      <div className="details-region-container">
        <div className="tab-container">
          <button
            className={`tab-button ${activeTab === "forecast" ? "active" : ""}`}
            onClick={() => setActiveTab("forecast")}
          >
            Forecast
          </button>
          <button
            className={`tab-button ${
              activeTab === "information" ? "active" : ""
            }`}
            onClick={() => setActiveTab("information")}
          >
            Information
          </button>
        </div>
        <div className="details-region-map">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Cát Hải, Hải Phòng</Popup>
            </Marker>
            <Circle 
              center={position}
              radius={500}
              pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.2 }}
            >
              <Popup>Khu vực ảnh hưởng</Popup>
            </Circle>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default DetailsRegionPage;
