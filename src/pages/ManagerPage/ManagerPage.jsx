import React, { useState } from "react";
import { DashboardFilled, UnorderedListOutlined, BellFilled } from "@ant-design/icons";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { useTranslation } from "react-i18next";
import "./style.scss";
import locationIcon from "../../assets/icons/icon-location.svg";
// import userIcon from "../../assets/icons/icon-user.svg";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";
import ManagerComponent from "../../components/ManagerComponent/ManagerComponent";
const ManagerPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");

  // handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="manager-page">
      <NavbarComponent />
      <div className="main-container">
        <div className="navbar-content">
          <ul className="navbar-list">
            <li
              className={`navbar-item ${
                activeTab === "dashboard" ? "active" : ""
              }`}
              onClick={() => handleTabClick("dashboard")}
            >
              <DashboardFilled />
              <span>{t("Dashboard")}</span>
            </li>
            {/* <li
              className={`navbar-item ${activeTab === "users" ? "active" : ""}`}
              onClick={() => handleTabClick("users")}
            >
              <img src={userIcon} alt="user" />
              <span>{t("Users")}</span>
            </li> */}
            <li
              className={`navbar-item ${activeTab === "areas" ? "active" : ""}`}
              onClick={() => handleTabClick("areas")}
            >
              <img src={locationIcon} alt="location" width={14} height={14} />
              <span>{t("Areas List")}</span>
            </li>
            <li
              className={`navbar-item ${
                activeTab === "examinations" ? "active" : ""
              }`}
              onClick={() => handleTabClick("examinations")}
            >
              <UnorderedListOutlined />
              <span>{t("Examination List")}</span>
            </li>
            <li
              className={`navbar-item ${
                activeTab === "notification" ? "active" : ""
              }`}
              onClick={() => handleTabClick("notification")}
            >
              <BellFilled />
              <span>{t("Notification")}</span>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <div className="main-content-container">
            {activeTab === "dashboard" ? (
              <DashboardComponent />
            ) : (
              <ManagerComponent activeTab={activeTab} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
