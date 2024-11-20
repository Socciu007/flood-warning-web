import React from "react";
import { DashboardFilled, UnorderedListOutlined } from "@ant-design/icons";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { useTranslation } from "react-i18next";
import "./style.scss";
import locationIcon from "../../assets/icons/icon-location.svg";
import userIcon from "../../assets/icons/icon-user.svg";
import DashboardComponent from "../../components/DashboardComponent/DashboardComponent";

const ManagerPage = () => {
  const { t } = useTranslation();

  return (
    <div className="manager-page">
      <NavbarComponent />
      <div className="main-container">
        <div className="navbar-content">
          <ul className="navbar-list">
            <li className="navbar-item">
              <DashboardFilled />
              <span>{t("Dashboard")}</span>
            </li>
            <li className="navbar-item">
              <img src={locationIcon} alt="location" width={14} height={14} />
              <span>{t("Areas List")}</span>
            </li>
            <li className="navbar-item">
              <UnorderedListOutlined />
              <span>{t("Examination List")}</span>
            </li>
            <li className="navbar-item">
              <img src={userIcon} alt="user" />
              <span>{t("Users")}</span>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <div className="main-content-container">
            <DashboardComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPage;
