import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Button, List, Tag, Empty } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  getAlerts,
  updateAlertStatus,
  updateManyAlerts,
} from "../../services/serviceNotifications";
import { useSelector } from "react-redux";
import { formatDateTime } from "../../utils";
import "./style.scss";

const AlertPage = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // Query all alerts
  const { data: alerts, refetch } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => getAlerts(currentUser._id),
  });

  // handle mark all alerts as viewed
  const handleMarkAllAlerts = async () => {
    await updateManyAlerts(currentUser._id);
    // Refesh data
    refetch();
  };

  // Handle view alert
  const handleViewAlert = async (id) => {
    await updateAlertStatus(id);
    navigate(`/notifications/${id}`);
    // Refesh data
    refetch();
  };

  return (
    <div className="alert-page">
      <NavbarComponent />
      <div className="main-container">
        <div className="navbar-content">
          <h1>{t("Notification")}</h1>
          <Button className="mark-viewed-button" onClick={handleMarkAllAlerts}>
            {t("Mark viewed all")}
          </Button>
        </div>
        <div className="content-container">
          <div className="content-list">
            <List
              className="content-list-item"
              itemLayout="horizontal"
              locale={{
                emptyText: <Empty description={t("No notification!")} />,
              }}
              dataSource={alerts?.filter((item) => item?.type !== "email")}
              renderItem={(item) => (
                <List.Item
                  className="alert-item"
                  style={{
                    backgroundColor:
                      item?.status === "unread" ? "#e6e2e0" : "transparent",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <div className="avatar-icon">
                        <Tag
                          color={
                            item?.title.includes("Low")
                              ? "green"
                              : item?.title.includes("Moderate")
                              ? "yellow"
                              : item?.title.includes("High")
                              ? "volcano"
                              : "red"
                          }
                          style={{
                            borderColor: item?.title.includes("Low")
                              ? "green"
                              : item?.title.includes("Moderate")
                              ? "#FFFF00"
                              : item?.title.includes("High")
                              ? "#FF9900"
                              : "#FF0000",
                            color: item?.title.includes("Low")
                              ? "green"
                              : item?.title.includes("Moderate")
                              ? "#a2bc33de"
                              : item?.title.includes("High")
                              ? "#FF9900"
                              : "#FF0000",
                          }}
                        >
                          {item?.title?.split("-")[1].trim().split(" ")[0]}
                        </Tag>
                      </div>
                    }
                    title={
                      <div className="alert-item-container">
                        <div className="alert-item-title">
                          <span>
                            <b>{item?.title}</b>: {item?.description}
                          </span>
                          <div>{formatDateTime(item?.createdAt)}</div>
                        </div>
                        <div className="alert-item-btn">
                          <Button
                            className="view-btn"
                            onClick={() => handleViewAlert(item?._id)}
                          >
                            {t("View detail")}
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertPage;
