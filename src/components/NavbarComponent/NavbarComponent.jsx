import React, { useState } from "react";
import { Button, Select, Space, Popover, Badge } from "antd";
import {
  HomeFilled,
  UserOutlined,
  KeyOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import storageService from "../../services/storage.service";
import { clearUser } from "../../redux/slices/userSlice.ts";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import i18n from "../../i18n";
import viFlag from "../../assets/icons/icon-vietnam.png";
import engFlag from "../../assets/icons/icon-usa.png";
import alertIcon from "../../assets/icons/icon-alert.svg";
import { logoutUser } from "../../services/serviceUser";

const NavbarComponent = () => {
  const { t } = useTranslation();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle change language
  const handleChangeLanguage = (value) => {
    i18n.changeLanguage(value);
    storageService.set("language", value);
  };

  // Handle open profile
  const handleOpenProfile = (open) => {
    setIsOpenProfile(open);
  };

  // Handle logout
  const handleLogout = async () => {
    dispatch(clearUser());
    storageService.remove("accessToken");
    storageService.remove("refreshToken");
    storageService.remove("user");
    await logoutUser();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src="#" alt="Argon" />
          <span>argon</span>
        </Link>
      </div>

      <div className="navbar-right">
        <Space size="middle">
          <Link to="/">
            <Button type="link" icon={<HomeFilled />}>
              {t("Home")}
            </Button>
          </Link>

          {!isAuthenticated && (
            <Link to="/register">
              <Button type="link" icon={<UserAddOutlined />}>
                {t("Register")}
              </Button>
            </Link>
          )}

          {!isAuthenticated && (
            <Link to="/login">
              <Button type="link" icon={<KeyOutlined />}>
                {t("Login")}
              </Button>
            </Link>
          )}

          {isAuthenticated && (
            <Link to="/">
              <div className="notice-container">
                <Badge dot={true}>
                  <img
                    src={alertIcon}
                    style={{ width: 14, height: 14 }}
                    alt="Alert"
                  />
                </Badge>
                <span>{t("Notice")}</span>
              </div>
            </Link>
          )}

          {isAuthenticated && (
            <Popover
              placement="bottomLeft"
              title={false}
              trigger="click"
              open={isOpenProfile}
              arrow={false}
              onOpenChange={handleOpenProfile}
              content={
                <div className="profile-popover">
                  <p>{t("User profile")}</p>
                  <p onClick={handleLogout}>{t("Logout")}</p>
                </div>
              }
            >
              <Button type="link" icon={<UserOutlined />}>
                {currentUser.username || currentUser.email.split("@")[0]}
              </Button>
            </Popover>
          )}

          <Select
            defaultValue={"eng"}
            style={{ width: 120 }}
            onChange={handleChangeLanguage}
            options={[
              {
                value: "vie",
                label: (
                  <Space>
                    <img src={viFlag} alt="Vietnamese" />
                    <span>Vie</span>
                  </Space>
                ),
              },
              {
                value: "eng",
                label: (
                  <Space>
                    <img src={engFlag} alt="English" />
                    <span>Eng</span>
                  </Space>
                ),
              },
            ]}
          />
        </Space>
      </div>
    </nav>
  );
};

export default NavbarComponent;
