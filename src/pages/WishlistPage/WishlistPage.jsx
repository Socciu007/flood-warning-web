import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import "./style.scss";
import { Link } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getWishlistByUserID } from "../../services/serviceUser";

const WishlistPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);

  const { data: wishlist } = useQuery({
    queryKey: ["wishlist", currentUser?.id],
    queryFn: () => getWishlistByUserID(currentUser?._id, currentUser?.accessToken),
  });
  console.log("wishlist", wishlist);

  return (
    <div className="details-alert-page">
      <NavbarComponent />
      <div className="main-container">
        <div className="navbar-content">
          <Link to="/notifications">
            <CaretLeftOutlined />
          </Link>
          <h1>{t("My wishlist")}</h1>
        </div>
        <div className="content-container">
          <div className="content-detail">
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;
