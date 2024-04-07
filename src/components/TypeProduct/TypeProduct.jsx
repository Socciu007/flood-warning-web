import React from "react";
import { useNavigate } from "react-router-dom";
import smartPhone from "../../assets/icons/icon-phone.png";
import laptop from "../../assets/icons/icon-laptop.png";
import headPhones from "../../assets/icons/icon-access.png";
import watch from "../../assets/icons/icon-watch.png";
import smartWatch from "../../assets/icons/icon-smartwatch.png";
import tablet from "../../assets/icons/icon-tablet.png";
import fastService from "../../assets/icons/icon-fastservice.png";
import { useTranslation } from "react-i18next";

const TypeProduct = ({ name }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleNavigateType = (type) => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "-")
        ?.toLowerCase()}`,
      { state: type }
    );
  };
  return (
    <div
      style={{
        padding: "0 10px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
      onClick={() => handleNavigateType(name)}
    >
      {name === "Smart Phone" && (
        <img
          src={smartPhone}
          alt="icon-phone"
          style={{ width: "18px", height: "18px" }}
        ></img>
      )}
      {name === "Laptop" && (
        <img
          src={laptop}
          alt="icon-laptop"
          style={{ width: "18px", height: "18px" }}
        ></img>
      )}

      {name === "Tablet" && (
        <img
          src={tablet}
          alt="icon-tablet"
          style={{ width: "18px", height: "18px" }}
        ></img>
      )}
      {name === "Accessories" && (
        <img
          src={headPhones}
          alt="icon-headPhones"
          style={{ width: "18px", height: "18px" }}
        ></img>
      )}
      {name === "Watch" && (
        <img
          src={watch}
          alt="icon-watch"
          style={{ width: "18px", height: "18px" }}
        ></img>
      )}
      {name === "Smart Watch" && (
        <img
          src={smartWatch}
          alt="icon-smartWatch"
          style={{ width: "18px", height: "18px" }}
        ></img>
      )}
      {name === "Utility Services" && (
        <img
          src={fastService}
          alt="icon-fastService"
          style={{ width: "18px", height: "18px" }}
        ></img>
      )}
      {t(name)}
    </div>
  );
};

export default TypeProduct;
