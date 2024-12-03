import React from "react";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { Button, List, Tag } from "antd";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
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

  // Query all alerts
  const { data: alerts, refetch } = useQuery({
    queryKey: ["alerts"],
    queryFn: () => getAlerts(currentUser._id),
  });
  console.log(alerts);

  // handle mark all alerts as viewed
  const handleMarkAllAlerts = async () => {
    await updateManyAlerts(currentUser._id);
    // Refesh data
    refetch();
  };

  // Handle view alert
  const handleViewAlert = async (id) => {
    await updateAlertStatus(id);
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
              dataSource={alerts}
              renderItem={(item) => (
                <List.Item
                  onClick={() => handleViewAlert(item?._id)}
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
                          color={item?.type === "email" ? "volcano" : "green"}
                        >
                          {item?.type}
                        </Tag>
                      </div>
                    }
                    title={
                      <div className="alert-item-title">
                        <span>
                          <b>{item?.title}</b>: {item?.description}
                        </span>
                        <div>{formatDateTime(item?.createdAt)}</div>
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
