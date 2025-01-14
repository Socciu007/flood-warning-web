import React, { useState, useEffect } from "react";
import "./style.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { getRegionById } from "../../services/serviceArea.js";
import { getFavoritedArea, favoritedArea } from "../../services/serviceUser";
import { getExamOfFarmArea } from "../../services/serviceExam";
import { setFarmAreaDetail } from "../../redux/slices/areaSlice.ts";
import { message } from "antd";
import { useTranslation } from "react-i18next";
import { ProFormSelect, ProForm } from "@ant-design/pro-form";
import { Tooltip as AntdTooltip, Empty } from "antd";
import {
  CodepenOutlined,
  AreaChartOutlined,
  SearchOutlined,
  StarFilled,
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
// import { Line } from "react-chartjs-2";
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

const DetailsRegionPage = () => {
  const [activeTab, setActiveTab] = useState("information");
  const [examOfFarmArea, setExamOfFarmArea] = useState([]);
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { farmAreaDetail } = useSelector((state) => state.farmArea);
  const [isFavorite, setIsFavorite] = useState([]);
  const [countWarning, setCountWarning] = useState(19);
  const [idFarmArea, setIdFarmArea] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  // Get exam of farm area
  const getExamFarm = async (farmAreaId, accessToken) => {
    const res = await getExamOfFarmArea(farmAreaId, accessToken);
    if (res.length > 0) {
      setCountWarning(Object.keys(res[0]?.numberWarning)?.length);
      setExamOfFarmArea(res);
    } else {
      setExamOfFarmArea([]);
    }
  };

  useEffect(() => {
    const initFavoriteAreas = async () => {
      if (!farmAreaDetail?.farmAreas || !currentUser?._id) return;

      try {
        const favoriteIds = await Promise.all(
          farmAreaDetail.farmAreas.map(async (farm) => {
            const res = await getFavoritedArea(
              { userId: currentUser._id, farmAreaId: farm._id },
              currentUser?.accessToken
            );
            return res?.data?.[0]?.status ? farm._id : undefined;
          })
        );
        setIsFavorite(favoriteIds.filter(Boolean));
      } catch (error) {
        console.error("Error initializing favorites:", error);
      }
    };

    initFavoriteAreas();
  }, [farmAreaDetail, currentUser]);

  // Set detail of farm area and init favorite area
  useEffect(() => {
    const fetchDataArea = async () => {
      if (!farmAreaDetail) {
        const res = await getRegionById(id);
        dispatch(setFarmAreaDetail(res.data[0]));
      }
    };
    fetchDataArea();
  }, [id, farmAreaDetail, dispatch, currentUser]);

  // Handle favorite
  const handleFavorite = async (farmId) => {
    // Check login
    if (!currentUser?._id) {
      message.warning(t("Please login to add favorites!"));
      return;
    }
    let updatedFavorites;
    let status;
    if (isFavorite.includes(farmId)) {
      // Remove farmId from isFavorite
      updatedFavorites = isFavorite.filter((id) => id !== farmId);
      status = false;
      message.success(t("Removed favorite area!"));
    } else {
      // Add farmId to isFavorite
      updatedFavorites = [...isFavorite, farmId];
      status = true;
      message.success(t("Added to favorites!"));
    }
    setIsFavorite(updatedFavorites);

    try {
      const res = await favoritedArea(
        {
          userId: currentUser?._id,
          farmAreaId: farmId,
          status: status,
        },
        currentUser?.accessToken
      );
      if (!res) {
        setIsFavorite(isFavorite);
      }
    } catch (error) {
      setIsFavorite(isFavorite);
    }
  };

  // Handle get exam of farm area
  const handleGetExamFarm = async (values) => {
    setIdFarmArea(values?.farmAreaId);
    await getExamFarm(values?.farmAreaId, currentUser?.accessToken);
  };

  const position = [farmAreaDetail?.latitude, farmAreaDetail?.longitude];
  const config = {
    percent: Number(((examOfFarmArea[0]?.numberWarning?.level)/countWarning)?.toFixed(2)),
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
                  <ProForm
                    submitter={{
                      searchConfig: {
                        submitText: "",
                      },
                      submitButtonProps: {
                        icon: <SearchOutlined />,
                      },
                      resetButtonProps: false,
                    }}
                    className="forecast-form"
                    onFinish={async (values) => await handleGetExamFarm(values)}
                  >
                    <ProFormSelect
                      options={farmAreaDetail?.farmAreas?.map((farm) => ({
                        value: farm._id,
                        label: farm.name,
                      }))}
                      name="farmAreaId"
                      placeholder={t("Choose one area")}
                      // value={idFarmArea}
                    />
                  </ProForm>
                  {idFarmArea === "" ? "" : (examOfFarmArea?.length > 0) ? (
                    <div className="forecast-chart">
                      <div className="forecast-chart-title">
                        <p>
                          {examOfFarmArea[0]?.name?.replace(" Alert ", " ")}
                        </p>
                        <span
                          style={{
                            backgroundColor:
                              examOfFarmArea[0]?.numberWarning?.level <= 4
                                ? "#87d068"
                                : examOfFarmArea[0]?.numberWarning?.level <= 8
                                ? "#ffc107"
                                : examOfFarmArea[0]?.numberWarning?.level <= 13
                                ? "orange"
                                : examOfFarmArea[0]?.numberWarning?.level <= 22
                                ? "red"
                                : "#fff",
                          }}
                        />
                      </div>
                      <p className="forecast-title">
                        A. {t("Recent status")}
                      </p>
                      {/* <AntdTooltip title={t(`Suitable growth rate of cultivated objects: ${Number(examOfFarmArea[0]?.result?.percentPos?.toFixed(2))}`)}>
                      </AntdTooltip> */}
                      <Liquid {...config} />
                      <p className="forecast-title">
                        B. {t("Data environment:")}
                      </p>
                      <div className="forecast-data-scroll">
                        <div className="forecast-title-detail">
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isDO === 1 &&
                              `• DO: ${examOfFarmArea[0]?.DO}mg/l Low DO levels can reduce the ability of aquatic species to survive.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isTemperatureRight === 1 &&
                              `• ${
                                examOfFarmArea[0]?.type === "Oyster farming"
                                  ? "Suitable temperature"
                                  : "Air temperature"
                              } : ${
                                examOfFarmArea[0]?.numberWarning?.temperatureRight
                              }°C This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isTemperature ===
                              1 &&
                              `• Temperature: ${examOfFarmArea[0]?.temperature}°C This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.ispH === 1 &&
                              `• pH: ${examOfFarmArea[0]?.pH} Low pH levels can reduce the ability of plants and aquatic animals to absorb nutrients.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isAlkalinity ===
                              1 &&
                              `• Alkalinity: ${examOfFarmArea[0]?.alkalinity}mg/l Risk of water acidification.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isAmmonia ===
                              1 &&
                              `• Ammonia: ${examOfFarmArea[0]?.ammonia}mg/l Ammonia levels reduce the quality of aquatic and plant habitats.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isBOD5 === 1 &&
                              `• BOD5: ${examOfFarmArea[0]?.BOD5}mg/l BOD5 levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isCOD === 1 &&
                              `• COD: ${examOfFarmArea[0]?.COD}mg/l COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isClarity ===
                              1 &&
                              `• Clarity: ${examOfFarmArea[0]?.clarity}mg/l Sign of pollution, organic waste or bacteria in water, posing a risk of disease outbreak.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isColiform ===
                              1 &&
                              `• Coliform: ${examOfFarmArea[0]?.coliform}CFU/100ml There is organic pollution in the aquatic environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isSalinity ===
                              1 &&
                              `• Salinity: ${examOfFarmArea[0]?.salinity}‰ Low salinity aquatic environments can affect the ability of aquatic species to sustain life. `}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isPhosPhat ===
                              1 &&
                              `• Photsphat: ${examOfFarmArea[0]?.phosPhat}mg/l Pets showing signs of Phosphate toxicity and stress.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning
                              ?.isSuspendedSolids === 1 &&
                              `• TSS: ${examOfFarmArea[0]?.suspendedSolids}mg/l TSS levels can reduce water filtration and degrade water quality in aquatic habitats.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isTotalCrom ===
                              1 &&
                              `• Total Crom: ${examOfFarmArea[0]?.totalCrom}mg/l There is chromium contamination.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isH2S === 1 &&
                              `• H₂S: ${examOfFarmArea[0]?.H2S}mg/l This level of H₂S can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isCN === 1 &&
                              `• CN: ${examOfFarmArea[0]?.CN} This level of CN can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isAs === 1 &&
                              `• As: ${examOfFarmArea[0]?.As}mg/l This level of As can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isCd === 1 &&
                              `• Cd: ${examOfFarmArea[0]?.Cd}mg/l This level of Cd can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isPb === 1 &&
                              `• Pb: ${examOfFarmArea[0]?.Pb}mg/l This level of Pb can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isCu === 1 &&
                              `• Cu: ${examOfFarmArea[0]?.Cu}mg/l This level of Cu can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isZn === 1 &&
                              `• Zn: ${examOfFarmArea[0]?.Zn}mg/l This level of Zn can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isHg === 1 &&
                              `• Hg: ${examOfFarmArea[0]?.Hg}mg/l This level of Hg can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isMn === 1 &&
                              `• Mn: ${examOfFarmArea[0]?.Mn}mg/l This level of Mn can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isFe === 1 &&
                              `• Fe: ${examOfFarmArea[0]?.Fe}mg/l This level of Fe can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isCr6 === 1 &&
                              `• Cr6+: ${examOfFarmArea[0]?.Cr6}mg/l This level of Cr6+ can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isF === 1 &&
                              `• F-: ${examOfFarmArea[0]?.F}mg/l This level of F- can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning?.isTotalPH ===
                              1 &&
                              `• Total petroleum hydrocarbons: ${examOfFarmArea[0]?.totalPH} This level of Total petroleum hydrocarbons can lead to oxygen deficiency in the environment.`}
                          </p>
                          <p>
                            {examOfFarmArea[0]?.numberWarning
                              ?.isRainfall === 1 &&
                              `• Rainfall: ${examOfFarmArea[0]?.rainfall}mm This level of rainfall can lead to oxygen deficiency in the environment.`}
                          </p>
                        </div>
                      </div>
                      {/* <Line data={data} options={options} /> */}
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
                  <p className="information-title">{`${farmAreaDetail?.name}, ${farmAreaDetail?.province}`}</p>
                </div>
                <div className="information-farm-container">
                  {farmAreaDetail?.farmAreas.map((farm) => (
                    <div className="information-farm-item" key={farm?._id}>
                      <p className="information-farm-name">
                        {farm?.name},{" "}
                        {!farm?.area
                          ? "unknown"
                          : farm?.area?.includes("ha")
                          ? farm?.area
                          : `${farm?.area} ha`}
                      </p>
                      <AntdTooltip
                        title={t(
                          "You can add areas to your wish list to receive notifications."
                        )}
                      >
                        <StarFilled
                          style={{
                            color: isFavorite.includes(farm._id)
                              ? "#FFD700"
                              : "#000",
                          }}
                          height={14}
                          width={14}
                          onClick={() => handleFavorite(farm._id)}
                        />
                      </AntdTooltip>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="details-region-map" key={farmAreaDetail?._id}>
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
                <Popup>
                  <div
                    style={{
                      fontSize: 14,
                      lineHeight: "22px",
                      textAlign: "center",
                    }}
                  >
                    {`${farmAreaDetail?.name}, ${farmAreaDetail?.province}`}
                    <br />
                    {`${t("Latitude")}: ${position[0]}, ${t("Longitude")}: ${
                      position[1]
                    }`}
                  </div>
                </Popup>
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
                  <>
                    <Circle
                      key={farm._id}
                      center={positionFarm}
                      radius={600}
                      pathOptions={{
                        color: "#3288F0",
                        fillColor: "#3288F0",
                        fillOpacity: 0.2,
                      }}
                      title={farm.name}
                    >
                      <Popup>
                        <div style={{ fontSize: 14, lineHeight: "22px" }}>
                          {`${farm.name}, ${
                            farm?.area?.includes("ha")
                              ? farm?.area
                              : `${farm?.area} ha`
                          }`}
                          <br />
                          {`${t("Type")}: ${t(farm?.type) || "Unknown"}`}
                        </div>
                      </Popup>
                      <LeafletTooltip
                        permanent
                        direction="right"
                        offset={[10, 10]}
                      >
                        <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                          {farm.name}
                        </span>
                      </LeafletTooltip>
                    </Circle>
                  </>
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
