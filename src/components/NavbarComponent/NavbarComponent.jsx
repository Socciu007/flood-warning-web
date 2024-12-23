import React, { useState, useEffect } from "react";
import { Button, Select, Space, Popover, Badge, message } from "antd";
import {
  HomeFilled,
  UserOutlined,
  KeyOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import storageService from "../../services/storage.service";
import { clearUser, setUser } from "../../redux/slices/userSlice.ts";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "../../services/serviceNotifications";
import i18n from "../../i18n";
import viFlag from "../../assets/icons/icon-vietnam.png";
import engFlag from "../../assets/icons/icon-usa.png";
import alertIcon from "../../assets/icons/icon-alert.svg";
import logoIcon from "../../assets/icons/logo.png";
import { logoutUser } from "../../services/serviceUser";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import FormFillUser from "../ChildrenComponent/FormFillUser.jsx";
import { getBase64 } from "../../utils";
import { updateUserProfile } from "../../services/serviceUser";
const NavbarComponent = () => {
  const { t } = useTranslation();
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isRecentAlert, setIsRecentAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get all alerts
  const { data: alerts } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => getAlerts(currentUser._id),
  });

  useEffect(() => {
    if (alerts && alerts.length > 0) {
      const hasUnread = alerts.some((alert) => alert.status === "unread");
      setIsRecentAlert(hasUnread);
    }
  }, [alerts]);

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

  // Handle update user
  const handleUpdateUser = async (values) => {
    values.avatar = values?.avatar
      ? await getBase64(values?.avatar[0]?.originFileObj)
      : currentUser.avatar;
    const res = await updateUserProfile(currentUser._id, values);
    if (res.data) {
      message.success(t("Update user profile successfully"));
      dispatch(setUser(res.data));
    } else {
      message.error(t("Update user profile failed"));
    }
    return true;
  };

  const content = (
    <div className="profile-popover">
      <ModalFormComponent
        title="User profile"
        trigger={
          <p onClick={() => setIsOpenProfile(false)}>{t("User profile")}</p>
        }
        submitter={{
          searchConfig: {
            submitText: t("Save"),
            resetText: t("Close"),
          },
        }}
        handleSubmitModal={(values) => handleUpdateUser(values)}
        props={{
          width: "470px",
          wrapClassName: "profile-modal",
        }}
      >
        <FormFillUser />
      </ModalFormComponent>
      <Link style={{ color: "#000"}} to="/wishlist">
        <p>{t("My wishlist")}</p>
      </Link>
      <p onClick={handleLogout}>{t("Logout")}</p>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          <img src={logoIcon} alt="EcoVigil" />
          <span style={{ fontWeight: "700", fontSize: "18px" }}>
            AquaGuardian
          </span>
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
            <Link to="/notifications">
              <div className="notice-container">
                <Badge dot={isRecentAlert}>
                  <img
                    src={alertIcon}
                    style={{ width: 14, height: 14 }}
                    alt="Alert"
                  />
                </Badge>
                <span>{t("Notification")}</span>
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
              content={content}
            >
              <Button type="link" icon={<UserOutlined />}>
                {currentUser?.username || currentUser?.email?.split("@")[0]}
              </Button>
            </Popover>
          )}

          <Select
            defaultValue={storageService.get("language") || "eng"}
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
