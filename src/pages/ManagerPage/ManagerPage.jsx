import React from "react";
import {
  DashboardFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { useTranslation } from "react-i18next";
import "./style.scss";
import locationIcon from "../../assets/icons/icon-location.svg";
import userIcon from "../../assets/icons/icon-user.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../../redux/slices/userSlice.ts";
// import storageService from "../../services/storage.service";
// import { useEffect } from "react";

const ManagerPage = () => {
  const { t } = useTranslation();
  // const dispatch = useDispatch();
  // const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   // Thêm effect này để khôi phục thông tin user từ localStorage
  //   const savedUser = storageService.get("user");
  //   const savedToken = storageService.get("accessToken");

  //   if (savedUser && savedToken && !currentUser) {
  //     dispatch(
  //       setUser({
  //         ...JSON.parse(savedUser),
  //         accessToken: savedToken,
  //       })
  //     );
  //   }
  // }, []);

  return (
    <div className="manager-page">
      <NavbarComponent />
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
            <img src={userIcon} alt="user"/>
            <span>{t("Users")}</span>
          </li>
        </ul>
      </div>
      <div className="main-content">
        <div className="main-content-header"></div>
        <div className="main-content-body"></div>
      </div>
    </div>
  );
};

export default ManagerPage;
