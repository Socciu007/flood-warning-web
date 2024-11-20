import React from "react";
import { CheckCard } from "@ant-design/pro-components";
import { useTranslation } from "react-i18next";
import "./style.scss";

const CardComponent = ({ title, srcImg, count, backgroundColor }) => {
  const { t } = useTranslation();
  return (
    <CheckCard
      className="card-component"
      disabled={true}
      title={
        <div className="card-component-title">
          <span>{t(`${title}`)}</span>
          <span className="card-component-count">{count}</span>
        </div>
      }
      extra={
        <div
          className="card-component-extra"
          style={{ backgroundColor: backgroundColor }}
        >
          <img src={srcImg} alt={`icon-${srcImg}`} />
        </div>
      }
    />
  );
};

export default CardComponent;
