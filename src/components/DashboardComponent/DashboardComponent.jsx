import React from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import CardComponent from "../CardComponent/CardComponent";
import iconGroupUser from "../../assets/icons/icon-groupUser.svg";
import iconExam from "../../assets/icons/icon-exam.svg";
import iconArea from "../../assets/icons/icon-map.svg";
import SearchComponent from "../SearchComponent/SearchComponent";
import TableComponent from "../TableComponent/TableComponent";
const DashboardComponent = () => {
  const { t } = useTranslation();

  return (
    <div className="dashboard-component">
      <div>
        <div className="dashboard-component-title">
          <h3>{t("DASHBOARD")}</h3>
          <SearchComponent />
        </div>
        <div className="dashboard-component-header">
          <CardComponent
            title="TOTAL USERS"
            count={5}
            srcImg={iconGroupUser}
            backgroundColor={"#ffd600"}
          />
          <CardComponent
            title="TOTAL AREAS"
            count={5}
            srcImg={iconArea}
            backgroundColor={"#f5365c"}
          />
          <CardComponent
            title="TOTAL EXAMS"
            count={5}
            srcImg={iconExam}
            backgroundColor={"#fb6340"}
          />
        </div>
      </div>
      <div className="dashboard-component-table">
        <TableComponent />
      </div>
    </div>
  );
};

export default DashboardComponent;
