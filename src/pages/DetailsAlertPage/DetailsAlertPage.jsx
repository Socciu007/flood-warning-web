import React, { useEffect, useState } from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { useTranslation } from "react-i18next";
import { getDetailAlert } from "../../services/serviceNotifications";
import { formatDateTime } from "../../utils";
import "./style.scss";
import { Link } from "react-router-dom";
import { CaretLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
const DetailsAlertPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [detailAlert, setDetailAlert] = useState(null);

  useEffect(() => {
    // Fetch detail alert
    const fetchDetailAlert = async () => {
      const res = await getDetailAlert(id);
      setDetailAlert({ ...res, content: res.content.split("\n") });
    };
    fetchDetailAlert();
  }, [id]);

  console.log("detailAlert", detailAlert?.content);

  return (
    <div className="details-alert-page">
      <NavbarComponent />
      <div className="main-container">
        <div className="navbar-content">
          <Link to="/notifications">
            <CaretLeftOutlined />
          </Link>
          <h1>{t("Notification")}</h1>
        </div>
        <div className="content-container">
          <div className="content-detail">
            <div className="content-detail-title">
              <span className="content-detail-title-text">
                {detailAlert?.title}
              </span>
              <span className="content-detail-title-time">
                {formatDateTime(detailAlert?.createdAt)}
              </span>
            </div>
            <div className="content-detail-description">
              <span>{detailAlert?.description}</span>
            </div>
            <div className="content-detail-content">
              {detailAlert !== null &&
                detailAlert?.content?.filter((item) => item !== "      ").map((item, index) => (
                  <p
                    key={index}
                    style={{ marginLeft: index === 0 ? "0" : "1em" }}
                  >
                    {index === 0 ? "" : "•"}
                    {item}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsAlertPage;
