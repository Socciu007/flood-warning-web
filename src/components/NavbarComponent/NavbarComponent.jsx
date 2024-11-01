import React from "react";
import { Button, Select, Space } from "antd";
import {
  HomeFilled,
  UserOutlined,
  KeyOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./style.scss";
import storageService from "../../services/storage.service";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import viFlag from "../../assets/icons/icon-vietnam.png";
import engFlag from "../../assets/icons/icon-usa.png";

const NavbarComponent = () => {
  const { t } = useTranslation();

  // Handle change language
  const handleChangeLanguage = (value) => {
    i18n.changeLanguage(value);
    storageService.set("language", value);
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
          <Link to="/dashboard">
            <Button type="link" icon={<HomeFilled />}>
              {t("Home")}
            </Button>
          </Link>

          <Link to="/register">
            <Button type="link" icon={<UserAddOutlined />}>
              {t("Register")}
            </Button>
          </Link>

          <Link to="/login">
            <Button type="link" icon={<KeyOutlined />}>
              {t("Login")}
            </Button>
          </Link>

          <Link to="/profile">
            <Button type="link" icon={<UserOutlined />}>
              {t("Profile")}
            </Button>
          </Link>

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
