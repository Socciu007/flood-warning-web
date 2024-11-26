import React, { useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { getRegionById } from "../../services/serviceArea.js";
import { getFavoritedArea, favoritedArea } from "../../services/serviceUser";
import { setFarmAreaDetail } from "../../redux/slices/areaSlice.ts";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import {
  CodepenOutlined,
  AreaChartOutlined,
  StarFilled,
} from "@ant-design/icons";
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
  const [isFavorite, setIsFavorite] = useState();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { farmAreaDetail } = useSelector((state) => state.farmArea);
  const { currentUser } = useSelector((state) => state.user);

  // Get favorited area
  const getFavoriteArea = async (data, accessToken) => {
    const res = await getFavoritedArea(data, accessToken);
    if (res?.data && !!res?.data?.length) {
      setIsFavorite(res?.data[0]?.status);
    } else {
      setIsFavorite(false);
    }
  };

  useEffect(() => {
    getFavoriteArea(
      { userId: currentUser?._id, regionId: id },
      currentUser?.accessToken
    );
  }, [currentUser, id]);

  useEffect(() => {
    const fetchDataArea = async () => {
      if (!farmAreaDetail) {
        const res = await getRegionById(id);
        dispatch(setFarmAreaDetail(res.data[0]));
      }
    };
    fetchDataArea();
  }, [id, farmAreaDetail, dispatch]);

  useEffect(() => {
    const addFavoriteArea = async () => {
      await favoritedArea(
        { userId: currentUser?._id, regionId: id, status: isFavorite },
        currentUser?.accessToken
      );
    };
    addFavoriteArea();
  }, [isFavorite]);

  // Handle favorite
  const handleFavorite = () => {
    setIsFavorite((prev) => !prev);
    if (!isFavorite) {
      message.info(t("Added to favorites!"));
    } else {
      message.info(t("Removed favorite area!"));
    }
  };

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
              style={{ flex: 1 }}
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
                <div className="information-title-container">
                  <p className="information-title">{`${farmAreaDetail?.name}, ${farmAreaDetail?.province}`}</p>
                  <StarFilled
                    style={{ color: isFavorite ? "#FFD700" : "#000" }}
                    height={14}
                    width={14}
                    onClick={handleFavorite}
                  />
                </div>
                <div className="information-farm-container">
                  {farmAreaDetail?.farmAreas.map((farm) => (
                    <div className="information-farm-item" key={farm._id}>
                      <p className="information-farm-name">{farm.name}</p>
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
