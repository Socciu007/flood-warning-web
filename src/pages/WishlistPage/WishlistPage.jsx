import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./style.scss";
import { Link } from "react-router-dom";
import {
  CaretLeftOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getWishlistByUserID } from "../../services/serviceUser";

const WishlistPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("favorite");
  const [favoriteList, setFavoriteList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const { data: wishlist } = useQuery({
    queryKey: ["wishlist", currentUser?.id],
    queryFn: () =>
      getWishlistByUserID(currentUser?._id, currentUser?.accessToken),
  });

  // Set favorite list
  useEffect(() => {
    if (wishlist) {
      const favoriteList = wishlist?.data;
      setFavoriteList(() => favoriteList);
    }
  }, [wishlist]);

  // Handle tab click
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  // Handle choose item
  const handleChooseItem = (itemId) => {
    if (selectedItem.includes(itemId)) {  
      setSelectedItem((o) => o.filter((id) => id !== itemId));
    } else {
      setSelectedItem((o) => [...o, itemId]);
    }
  };

  console.log("favoriteList", favoriteList);

  return (
    <div className="wishlist-page">
      <NavbarComponent />
      <div className="main-container">
        <div className="navbar-content">
          <Link to="/">
            <CaretLeftOutlined />
          </Link>
          <h1>{t("My wishlist")}</h1>
        </div>
        <div className="wishlist-container">
          <div className="wishlist-container-list">
            <div className="wishlist-container-list-nav">
              <div
                className={`wishlist-container-list-nav-title ${
                  activeTab === "favorite" ? "active" : ""
                }`}
                onClick={() => handleTabClick("favorite")}
              >
                {t("Favorite area")}
              </div>
              <div
                className={`wishlist-container-list-nav-title ${
                  activeTab === "formerly" ? "active" : ""
                }`}
                onClick={() => handleTabClick("formerly")}
              >
                {t("Formerly favorite area")}
              </div>
            </div>
            <div className="wishlist-container-list-content">
              {favoriteList?.map((item) => {
                return item?.status && activeTab === "favorite" ? (
                  <div
                    key={item?._id}
                    className="wishlist-container-list-content-item"
                  >
                    <div
                      className="wishlist-container-list-content-item-name"
                      onClick={() => handleChooseItem(item._id)}
                    >
                      {`${item?.farmAreaId?.name}, ${item?.region?.name}, ${item?.region?.province}`}
                      {selectedItem.includes(item?._id) ? (
                        <CaretDownOutlined />
                      ) : (
                        <CaretRightOutlined />
                      )}
                    </div>
                    {/* Infomation of favourite area */}
                    {selectedItem.includes(item?._id) && (
                      <div className="wishlist-container-list-content-item-info">
                        {`Type: ${item?.farmAreaId?.type}, Area: ${
                          item?.farmAreaId?.area?.split(" ")[0] || "Unknown"
                        } ha`}
                      </div>
                    )}
                  </div>
                ) : !item?.status && activeTab === "formerly" ? (
                  <div
                    key={item?._id}
                    className="wishlist-container-list-content-item"
                  >
                    <div
                      className="wishlist-container-list-content-item-name"
                      onClick={() => handleChooseItem(item?._id)}
                    >
                      {`${item?.farmAreaId?.name}, ${item?.region?.name}, ${item?.region?.province}`}
                      {selectedItem.includes(item?._id) ? (
                        <CaretDownOutlined />
                      ) : (
                        <CaretRightOutlined />
                      )}
                    </div>
                    {/* Infomation of favourite area */}
                    {selectedItem.includes(item?._id) && (
                      <div className="wishlist-container-list-content-item-info">
                        {`Type: ${item?.farmAreaId?.type}, Area: ${
                          item?.farmAreaId?.area?.split(" ")[0] || "Unknown"
                        } ha`}
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
