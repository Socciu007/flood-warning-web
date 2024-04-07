import React, { useState } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import OrderManagementCategory from "../../components/OrderManagementCategory/OrderManagementCategory";

const ReturnPage = () => {
  const { t } = useTranslation();
  const [option, setOption] = useState("orders");

  const handleSelectOption = (key) => {
    setOption(key);
  };
  return (
    <div className="layoutOrderManagement">
      <div className="orderTitle">{t("Order management")}</div>
      <div className="orderType">
        <div
          className="orderOption"
          style={{ background: option === "orders" ? "red" : "#fff" }}
          onClick={() => handleSelectOption("orders")}
        >
          {t("Orders")}
        </div>
        <div
          className="orderOption"
          style={{ background: option === "transports" ? "red" : "#fff" }}
          onClick={() => handleSelectOption("transports")}
        >
          {t("Transports")}
        </div>
        <div
          className="orderOption"
          style={{ background: option === "returns" ? "red" : "#fff" }}
          onClick={() => handleSelectOption("returns")}
        >
          {t("Return Orders")}
        </div>
        <div
          className="orderOption"
          style={{ background: option === "reviews" ? "red" : "#fff" }}
          onClick={() => handleSelectOption("reviews")}
        >
          {t("Reviews")}
        </div>
      </div>
      <OrderManagementCategory option={option} />
    </div>
  );
};

export default ReturnPage;
