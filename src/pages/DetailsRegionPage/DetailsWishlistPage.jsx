import React, { useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { getFarmAreaWishlist } from "../../services/serviceFarmArea";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
import {
  CodepenOutlined,
  AreaChartOutlined
} from "@ant-design/icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  ZoomControl,
  Tooltip as LeafletTooltip,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
import { Liquid } from "@ant-design/plots";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register plugin Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DetailsWishlistPage = () => {
  const [activeTab, setActiveTab] = useState("forecast");
  const [wishlistData, setWishlistData] = useState({});
  const [countWarning, setCountWarning] = useState(16);
  const { t } = useTranslation();
  const { id } = useParams();

  // Fetch wishlist farm area
  const fetchFarmAreaWishlist = async (farmAreaId) => {
    const res = await getFarmAreaWishlist(farmAreaId);
    if (res) {
      setWishlistData(res);
      setCountWarning(Object.keys(res?.examination?.numberWarning)?.length - 1);
    }
  };

  // Set detail of farm area and init favorite area
  useEffect(() => {
    fetchFarmAreaWishlist(id);
  }, [id]);
  console.log("wishlistData", wishlistData);

  const position = [wishlistData?.regionId?.latitude, wishlistData?.regionId?.longitude];
  const config = {
    percent: Number(((wishlistData?.examination?.numberWarning?.level/countWarning))?.toFixed(2)),
    style: {
      outlineBorder: 3,
      outlineDistance: 8,
      waveLength: 128,
      backgroundFill: "pink",
    },
    width: 180,
    height: 180,
    className: "liquid-chart",
  };

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
              {t("Data")}
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
            {activeTab === "forecast" && (
              <div className="forecast-container">
                <div className="forecast-sub-container">
                  {wishlistData ? (
                    <div className="forecast-chart">
                      <div className="forecast-chart-title">
                        <p>
                          {wishlistData?.examination?.name?.replace(" Alert ", " ")}
                        </p>
                        <span
                          style={{
                            backgroundColor:
                              wishlistData?.examination?.numberWarning?.level <= 4
                                ? "#87d068"
                                : wishlistData?.examination?.numberWarning?.level <= 8
                                ? "#ffc107"
                                : wishlistData?.examination?.numberWarning?.level <= 13
                                ? "orange"
                                : wishlistData?.examination?.numberWarning?.level <= 22
                                ? "red"
                                : "#fff",
                          }}
                        />
                      </div>
                      <p className="forecast-title">
                        A. {t("Recent status")}
                      </p>
                      <Liquid {...config} />
                      <p className="forecast-title">
                        B. {t("Data environment:")}
                      </p>
                      <div className="forecast-data-scroll">
                        <div className="forecast-title-detail">
                          <p>
                            {wishlistData?.examination?.numberWarning?.isDO === 1 &&
                              `• DO: ${wishlistData?.examination?.DO}mg/l Low DO levels can reduce the ability of aquatic species to survive.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning
                              ?.isTemperatureRight === 1 &&
                              `• ${
                                wishlistData?.type === "Oyster farming"
                                  ? "Suitable temperature"
                                  : "Air temperature"
                              } : ${
                                wishlistData?.examination?.temperatureRight
                              }°C This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isTemperature ===
                              1 &&
                              `• Temperature: ${wishlistData?.examination?.temperature}°C This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.ispH === 1 &&
                              `• pH: ${wishlistData?.examination?.pH} Low pH levels can reduce the ability of plants and aquatic animals to absorb nutrients.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isAlkalinity ===
                              1 &&
                              `• Alkalinity: ${wishlistData?.examination?.alkalinity}mg/l Risk of water acidification.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isAmmonia ===
                              1 &&
                              `• Ammonia: ${wishlistData?.examination?.ammonia}mg/l Ammonia levels reduce the quality of aquatic and plant habitats.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isBOD5 === 1 &&
                              `• BOD5: ${wishlistData?.examination?.BOD5}mg/l BOD5 levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isCOD === 1 &&
                              `• COD: ${wishlistData?.examination?.COD}mg/l COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isClarity ===
                              1 &&
                              `• Clarity: ${wishlistData?.examination?.clarity}mg/l Sign of pollution, organic waste or bacteria in water, posing a risk of disease outbreak.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isColiform ===
                              1 &&
                              `• Coliform: ${wishlistData?.examination?.coliform}CFU/100ml There is organic pollution in the aquatic environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isSalinity ===
                              1 &&
                              `• Salinity: ${wishlistData?.examination?.salinity}‰ Low salinity aquatic environments can affect the ability of aquatic species to sustain life. `}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isPhosPhat ===
                              1 &&
                              `• Photsphat: ${wishlistData?.examination?.phosPhat}mg/l Pets showing signs of Phosphate toxicity and stress.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning
                              ?.isSuspendedSolids === 1 &&
                              `• TSS: ${wishlistData?.examination?.suspendedSolids}mg/l TSS levels can reduce water filtration and degrade water quality in aquatic habitats.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning
                              ?.isTotalCrom === 1 &&
                              `• Total Crom: ${wishlistData?.examination?.totalCrom}mg/l There is chromium contamination.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isH2S === 1 &&
                              `• H₂S: ${wishlistData?.examination?.H2S}mg/l This level of H₂S can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isCN === 1 &&
                              `• CN: ${wishlistData?.examination?.CN} This level of CN can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isAs === 1 &&
                              `• As: ${wishlistData?.examination?.As}mg/l This level of As can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isCd === 1 &&
                              `• Cd: ${wishlistData?.examination?.Cd}mg/l This level of Cd can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isPb === 1 &&
                              `• Pb: ${wishlistData?.examination?.Pb}mg/l This level of Pb can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isCu === 1 &&
                              `• Cu: ${wishlistData?.examination?.Cu}mg/l This level of Cu can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isZn === 1 &&
                              `• Zn: ${wishlistData?.examination?.Zn}mg/l This level of Zn can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isHg === 1 &&
                              `• Hg: ${wishlistData?.examination?.Hg}mg/l This level of Hg can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isMn === 1 &&
                              `• Mn: ${wishlistData?.examination?.Mn}mg/l This level of Mn can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isFe === 1 &&
                              `• Fe: ${wishlistData?.examination?.Fe}mg/l This level of Fe can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isCr6 === 1 &&
                              `• Cr6+: ${wishlistData?.examination?.Cr6}mg/l This level of Cr6+ can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isF === 1 &&
                              `• F-: ${wishlistData?.examination?.F}mg/l This level of F- can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isTotalPH ===
                              1 &&
                              `• Total petroleum hydrocarbons: ${wishlistData?.examination?.totalPH} This level of Total petroleum hydrocarbons can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {wishlistData?.examination?.numberWarning?.isRainfall ===
                              1 &&
                              `• Rainfall: ${wishlistData?.examination?.rainfall}mm This level of Rainfall can lead to oxygen deficiency in the environment.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={t("This area has no information!")}
                    />
                  )}
                </div>
              </div>
            )}
            {activeTab === "information" && (
              <div className="information-container">
                <div className="information-title-container">
                  <p className="information-title">{`${wishlistData?.name}, ${wishlistData?.regionId?.name}, ${wishlistData?.regionId?.province}`}</p>
                </div>
                <div className="information-farm-container">
                  <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: "4px" }}>
                    <p className="information-farm-name">
                      {t("Area")}:{" "}
                      {!wishlistData?.area
                        ? "unknown"
                        : wishlistData?.area?.includes("ha")
                        ? wishlistData?.area
                        : `${wishlistData?.area} ha`}
                    </p>
                    <p className="information-farm-name">
                      {t("Type")}:{" "}
                      {!wishlistData?.type
                        ? "unknown"
                        : t(`${wishlistData?.type}`)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="details-region-map" key={wishlistData?._id}>
          {wishlistData?.regionId?.latitude !== undefined && wishlistData?.regionId?.longitude !== undefined ? (
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
                <Popup>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: "22px",
                      textAlign: "center",
                    }}
                  >
                    {`${wishlistData?.name}, ${wishlistData?.province}`}
                    <br />
                    {`${t("Latitude")}: ${position[0]}, ${t("Longitude")}: ${
                      position[1]
                    }`}
                  </div>
                </Popup>
              </Marker>
              <Circle
                center={[position[0] - 0.01, position[1] - 0.01]}
                radius={600}
                pathOptions={{
                  color: "#3288F0",
                  fillColor: "#3288F0",
                  fillOpacity: 0.2,
                }}
                title={wishlistData?.name}
              >
                <Popup>
                  <div style={{ fontSize: 14, lineHeight: "22px" }}>
                    {`${wishlistData?.name}, ${
                      wishlistData?.area?.includes("ha")
                        ? wishlistData?.area
                        : `${wishlistData?.area} ha`
                    }`}
                    <br />
                    {`${t("Type")}: ${t(wishlistData?.type) || "Unknown"}`}
                  </div>
                </Popup>
                <LeafletTooltip
                  permanent
                  direction="right"
                  offset={[10, 10]}
                >
                  <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                    {wishlistData?.name}
                  </span>
                </LeafletTooltip>
              </Circle>
            </MapContainer>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t("Map not found!")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsWishlistPage;
