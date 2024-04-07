import React from "react";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
import { useNavigate, useParams } from "react-router-dom";
import "./style.scss";
import { useTranslation } from "react-i18next";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleHomePage = () => {
    navigate("/");
  };
  return (
    <div className="layout-product-details-page">
      <h5>
        <span style={{ cursor: "pointer" }} onClick={handleHomePage}>
          {t("Home")}
        </span>{" "}
        - {t("Product Detail")}
      </h5>
      <ProductDetailsComponent idProduct={id} />
    </div>
  );
};

export default ProductDetailsPage;
