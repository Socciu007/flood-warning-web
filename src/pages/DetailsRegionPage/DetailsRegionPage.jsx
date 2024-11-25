import React, { useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { getRegionById } from "../../services/serviceRegion";
import { setFarmAreaDetail } from "../../redux/slices/areaSlice.ts";
import { CodepenOutlined, AreaChartOutlined, StarOutlined } from "@ant-design/icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
} from "react-leaflet";
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
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { farmAreaDetail } = useSelector((state) => state.farmArea);

  useEffect(() => {
    const fetchDataArea = async () => {
      if (!farmAreaDetail) {
        const res = await getRegionById(id);
        dispatch(setFarmAreaDetail(res.data[0]));
      }
    };
    fetchDataArea();
  }, [id, farmAreaDetail, dispatch]);

  const position = [farmAreaDetail?.latitude, farmAreaDetail?.longitude];
  return (
    <div className="details-region-page">
      <NavbarComponent />

      <div className="details-region-container">
        <div className="tab-container">
          <div className="tab-button-container">
            <button
              className={`tab-button ${
                activeTab === "forecast" ? "active" : ""
              }`}
              onClick={() => setActiveTab("forecast")}
            >
              <AreaChartOutlined />
              {t("Forecast")}
            </button>
            <button
              className={`tab-button ${
                activeTab === "information" ? "active" : ""
              }`}
              onClick={() => setActiveTab("information")}
            >
              <CodepenOutlined />
              {t("Information")}
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "forecast" && <div>Forecast</div>}
            {activeTab === "information" && (
              <div className="information-container">
                <p className="information-title">{`${farmAreaDetail?.name}, ${farmAreaDetail?.province}`}</p>
                <div className="information-farm-container">
                  {farmAreaDetail?.farmAreas.map((farm) => (
                    <div className="information-farm-item" key={farm._id}>
                      <p className="information-farm-name">{farm.name}</p>
                      <StarOutlined height={14} width={14} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="details-region-map">
          {farmAreaDetail && (
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "500px", width: "100%" }}
              zoomControl={false}
            >
              <ZoomControl position="bottomleft" />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={position}>
                <Popup>{`${farmAreaDetail?.name}, ${farmAreaDetail?.province}`}</Popup>
              </Marker>
              {farmAreaDetail?.farmAreas.map((farm, index) => {
                const RADIUS = 0.02;
                const totalFarm = farmAreaDetail?.farmAreas.length;
                const angle = (1.7 * Math.PI * index) / totalFarm;
                const positionFarm = [
                  position[0] - RADIUS * Math.cos(angle),
                  position[1] - RADIUS * Math.sin(angle),
                ];
                return (
                  <Circle
                    key={farm._id}
                    center={positionFarm}
                    radius={700}
                    pathOptions={{
                      color: "#3288F0",
                      fillColor: "#3288F0",
                      fillOpacity: 0.2,
                    }}
                  >
                    <Popup>{farm.name}</Popup>
                  </Circle>
                );
              })}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsRegionPage;
