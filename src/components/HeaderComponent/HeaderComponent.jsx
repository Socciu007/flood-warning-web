import React, { useEffect, useState } from "react";
import { Badge, Col, Popover, Upload } from "antd";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "./style";
import {
  PopupSignupShop,
  WrapperContentPopup,
  WrapperHeader,
  WrapperHeaderAccount,
  WrapperLanguage,
  WrapperLogoHeader,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
} from "./style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoShop from "../../assets/pictures/logoshop1.png";
import mallIcon from "../../assets/icons/icon-shopmall.png";
import globalIcon from "../../assets/icons/icon-global.png";
import notiIcon from "../../assets/icons/icon-notification.png";
import logoutIcon from "../../assets/icons/icon-logout.png";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slices/userSlice";
import { searchProduct } from "../../redux/slices/productSlice";
import Loading from "../LoadingComponent/Loading";
import InputComponent from "../InputComponent/InputComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import bannerGoTech from "../../assets/pictures/gotech-banner-big-sale.png";
import usaIcon from "../../assets/icons/icon-usa.png";
import vietnamIcon from "../../assets/icons/icon-vietnam.png";
import blogIcon from "../../assets/icons/icon-blog1.png";
import upIcon from "../../assets/icons/icon-up.svg";
import downIcon from "../../assets/icons/icon-down.svg";
import i18n from "../../i18n/index";
import { useTranslation } from "react-i18next";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupLanguageOpen, setIsPopupLanguageOpen] = useState(false);
  const [isVietnamese, setIsVietnamese] = useState(true);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigateOrder = () => {
    navigate("/order");
  };
  const handleNavigateBlog = () => {
    navigate("/blog");
  };
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    setLoading(false);
  };

  const changeLanguage = (lang) => {
    if (lang === "eng") {
      setIsVietnamese(false);
      // i18n.changeLanguage(lang);
    } else {
      setIsVietnamese(true);
    }
    i18n.changeLanguage(lang);
    setIsPopupLanguageOpen(false);
  };

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-orders") {
      navigate("/my-orders", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else {
      handleLogout();
    }
    setIsPopupOpen(false);
  };

  const content = (
    <div style={{ fontSize: "15px", fontWeight: 400, lineHeight: "30px" }}>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        {t("User information")}
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          {t("System management")}
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate("my-orders")}>
        {t("My orders")}
      </WrapperContentPopup>
      <WrapperContentPopup
        onClick={() => {
          setIsOpenModal(true);
          setIsPopupOpen(false);
        }}
      >
        {t("Sell with Go Tech")}
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        {t("Log out")}
      </WrapperContentPopup>
    </div>
  );

  const contentLanguage = (
    <div
      style={{
        fontSize: "15px",
        fontWeight: 400,
        lineHeight: "30px",
        height: "fit-content",
        width: "fit-content",
      }}
    >
      <WrapperLanguage onClick={() => changeLanguage("eng")}>
        <div
          style={{
            background: `url(${usaIcon}) center/cover`,
            width: "15px",
            height: "15px",
          }}
        ></div>
        <div>{t("English")}</div>
      </WrapperLanguage>
      <WrapperLanguage onClick={() => changeLanguage("vie")}>
        <div
          style={{
            background: `url(${vietnamIcon}) center/cover`,
            width: "15px",
            height: "15px",
          }}
        ></div>
        <div>{t("Vietnamese")}</div>
      </WrapperLanguage>
    </div>
  );

  const onSearch = (e) => {
    setSearch(e.target.value);
    // dispatch(searchProduct(search));
  };
  const handleSearch = () => {
    // console.log("search", search);
    dispatch(searchProduct(search));
  };
  return (
    <div
      style={{
        width: "100%",
        background: "rgb(243 15 18 / 50%)",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: (isHiddenSearch || isHiddenCart) && "none" }}>
        <img
          src={bannerGoTech}
          alt="img-banner-gotech"
          style={{
            background: "linear-gradient(90deg, #ed3600, #ffd325)",
            width: "100%",
            maxHeight: "80px",
          }}
        ></img>
      </div>
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col
          span={4}
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <WrapperLogoHeader src={logoShop} preview={false}></WrapperLogoHeader>
          <WrapperTextHeader>Go Tech</WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              placeholder={t("What do you need...")}
              textButton={t("Search")}
              bordered={false}
              onChange={onSearch}
              clicked={() => handleSearch()}
              // onClick={onSearch}
            />
          </Col>
        )}
        <Col span={8}>
          <Loading isLoading={loading}>
            <WrapperHeaderAccount>
              {userAvatar ? (
                <img
                  style={{ height: "32px", width: "32px", borderRadius: "50%" }}
                  src={userAvatar}
                  alt="avatar"
                />
              ) : (
                <UserOutlined />
              )}
              {user?.access_token ? (
                <>
                  <div>
                    {userName ||
                      user?.email?.substring(0, user?.email?.indexOf("@")) ||
                      "User"}
                  </div>
                  <Popover
                    open={isPopupOpen}
                    onOpenChange={() => setIsPopupOpen(false)}
                    content={content}
                    trigger="click"
                    placement={"bottomRight"}
                    arrow={false}
                  >
                    <CaretDownOutlined
                      onClick={() => setIsPopupOpen(true)}
                      style={{ marginTop: "2px", marginLeft: "-7px" }}
                    />
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    {t("Sign in")}
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall style={{ marginRight: "5px" }}>
                      {t("Account")}
                    </WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          <div onClick={handleNavigateOrder}>
            {!isHiddenCart && (
              <WrapperHeaderAccount>
                <Badge count={order?.orderItems?.length} size="small">
                  <ShoppingCartOutlined />
                </Badge>
                <WrapperTextHeaderSmall>{t("Cart")}</WrapperTextHeaderSmall>
              </WrapperHeaderAccount>
            )}
          </div>
          <div
            onClick={handleNavigateBlog}
            style={{
              background: `url(${blogIcon}) center/cover`,
              height: "24px",
              width: "24px",
              cursor: "pointer",
            }}
          ></div>
          {isHiddenSearch && isHiddenCart && (
            <div
              onClick={handleNavigateBlog}
              style={{
                background: `url(${notiIcon}) center/cover`,
                height: "24px",
                width: "24px",
                cursor: "pointer",
              }}
            ></div>
          )}
          <div style={{ display: "flex", gap: "6px", color: "#fff" }}>
            {isVietnamese ? (
              <>
                <div
                  style={{
                    background: `url(${vietnamIcon}) center/cover`,
                    width: "15px",
                    height: "15px",
                  }}
                ></div>
                <div> Vi</div>
              </>
            ) : (
              <>
                <div
                  style={{
                    background: `url(${usaIcon}) center/cover`,
                    width: "15px",
                    height: "15px",
                  }}
                ></div>
                <div> En</div>
              </>
            )}
            <Popover
              open={isPopupLanguageOpen}
              onOpenChange={() => setIsPopupLanguageOpen(false)}
              content={contentLanguage}
              trigger="click"
              placement={"bottomRight"}
              arrow={false}
            >
              {isPopupLanguageOpen ? (
                <img
                  src={upIcon}
                  alt="icon-up"
                  onClick={() => setIsPopupLanguageOpen(true)}
                />
              ) : (
                <img
                  src={downIcon}
                  alt="down-up"
                  onClick={() => setIsPopupLanguageOpen(true)}
                  style={{ cursor: "pointer" }}
                />
              )}
            </Popover>
          </div>
          {isHiddenSearch && isHiddenCart && (
            <div
              onClick={() => handleClickNavigate()}
              style={{
                background: `url(${logoutIcon}) center/cover`,
                height: "24px",
                width: "24px",
                cursor: "pointer",
              }}
            ></div>
          )}
        </Col>
      </WrapperHeader>
      <PopupSignupShop
        forceRender
        title={t("Sign up as a Go Tech Seller")}
        open={isModalOpen}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
        // closeIcon={false}
        // onOk={handleDeleteUser}
      >
        <div>
          <div className="col-shop">
            <div className="col-shop__name">{t("Shop Name")}:</div>
            <InputComponent bordered={"none"} />
          </div>
          <div className="col-shop" style={{ alignItems: "flex-start" }}>
            <div className="col-shop__name">Logo:</div>
            <Upload
              // onChange={handleOnChangeAvatar}
              listType="picture-card"
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{t("Upload")}</div>
              </div>
            </Upload>
          </div>
          <div className="col-shop">
            <div className="col-shop__name">Email:</div>
            <InputComponent placeholder={"Nhập email"}></InputComponent>
          </div>
          <div className="verify">
            <span className="checkbox">
              <input type="checkbox"></input>
            </span>
            <span>
              {t("By signing up, you have read and agreed to")}{" "}
              <p onClick={() => navigate("/term-of-services")}>
                {t("the Terms, Conditions")}
              </p>{" "}
              {t("and")}{" "}
              <p onClick={() => navigate("/privacy-policy")}>
                {t("Privacy Policy of Go Tech")}
              </p>
            </span>
          </div>
          <ButtonComponent
            textButton={t("Send OTP via Email")}
            styleButton={{ background: "#2A86FF" }}
          />
          <div className="more-shop">
            <img
              src={mallIcon}
              alt="icon-mall"
              style={{ height: 18, width: 18 }}
            ></img>
            <div>{t("Register GoMall Store")}</div>
          </div>
          <div className="more-shop">
            <img
              src={globalIcon}
              alt="icon-global"
              style={{ height: 18, width: 18 }}
            ></img>
            <div>{t("Register International Store")}</div>
          </div>
        </div>
      </PopupSignupShop>
    </div>
  );
};

export default HeaderComponent;
