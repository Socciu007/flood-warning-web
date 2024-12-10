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
import { formatDateTime } from "../../utils";
import { Progress, Tooltip as AntdTooltip } from "antd";
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
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
import { Line } from "react-chartjs-2";
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
  const { currentUser } = useSelector((state) => state.user);

  // Get exam of farm area
  const getExamFarm = async (farmAreaId, accessToken) => {
    const res = await getExamOfFarmArea(farmAreaId, accessToken);
    setExamOfFarmArea(res);
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
      message.info(t("Removed favorite area!"));
    } else {
      // Add farmId to isFavorite
      updatedFavorites = [...isFavorite, farmId];
      status = true;
      message.info(t("Added to favorites!"));
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
    await getExamFarm(values?.farmAreaId, currentUser?.accessToken);
  };

  const position = [farmAreaDetail?.latitude, farmAreaDetail?.longitude];
  const data = {
    labels: examOfFarmArea?.map((item) =>
      formatDateTime(item?.updatedAt).split(" ")[1].slice(0, 5)
    ), // Labels for chart
    datasets: [
      {
        data: examOfFarmArea
          ?.slice()
          ?.reverse()
          ?.map((item) => (item?.result?.percentPos * 1).toFixed(2)), // Data for chart
        fill: true, // No fill color under the line
        backgroundColor: "#1d8cf8",
        borderColor: "#1d8cf8", // Color of the line
        borderWidth: 1,
        tension: 0.2, // Curve of the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed.y * 100}%`,
        },
      },
    },
    interaction: {},
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: {
            size: 10,
          },
          color: "#525f7f",
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.25,
          color: "#525f7f",
          font: {
            size: 10,
          },
        },
        grid: { display: false },
      },
    },
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
                      placeholder={t("Enter the farming area")}
                    />
                  </ProForm>
                  {examOfFarmArea?.length > 0 && (
                    <div className="forecast-chart">
                      <h2 className="forecast-title">
                        {t("Latest predictions")}
                      </h2>
                      <Progress
                        type="dashboard"
                        steps={3}
                        percent={(
                          examOfFarmArea[0]?.result?.percentPos * 100
                        ).toFixed(0)}
                        trailColor="rgba(0, 0, 0, 0.06)"
                        strokeWidth={10}
                        gapDegree={180}
                        strokeColor={
                          examOfFarmArea[0]?.result?.percentPos > 0.5
                            ? "#87d068"
                            : "red"
                        }
                      />
                      <h2 className="forecast-title">
                        {t("Recent forecast chart")}
                      </h2>
                      <Line data={data} options={options} />
                    </div>
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
                    <div className="information-farm-item" key={farm._id}>
                      <p className="information-farm-name">
                        {farm.name}, {farm?.area || "500 ha"}
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
                    <Popup>
                      <div style={{ fontSize: 14, lineHeight: "22px" }}>
                        {`${farm.name}, ${farm.area || "500 ha"}`}
                        <br />
                        {`${t("Type")}: ${t(farm?.type) || "Unknown"}`}
                      </div>
                    </Popup>
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
