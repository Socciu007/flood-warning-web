import React, { useState, useEffect } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import CardComponent from "../CardComponent/CardComponent";
import iconGroupUser from "../../assets/icons/icon-groupUser.svg";
import iconExam from "../../assets/icons/icon-exam.svg";
import iconArea from "../../assets/icons/icon-map.svg";
import SearchComponent from "../SearchComponent/SearchComponent";
import TableComponent from "../TableComponent/TableComponent";
import { getAllArea } from "../../services/serviceArea";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const DashboardComponent = () => {
  const { t } = useTranslation();
  const [dataAreas, setDataAreas] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  // Get all areas
  const { data: areas, isLoading: isLoadingAreas } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllArea(currentUser._id),
  });

  useEffect(() => {
    if (areas) {
      const formattedAreas = areas.map((area) => ({
        id: area._id,
        nameArea: area.name,
        typeArea: area.type,
        nameRegion: area.regionId.name,
        province: area.regionId.province,
      }));
      setDataAreas(formattedAreas);
    }
  }, [areas]);

  // Config columns table
  const columns = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
    },
    {
      title: t("Name Area"),
      dataIndex: "nameArea",
      key: "nameArea",
      className: "table-cell",
    },
    {
      title: t("Type Area"),
      dataIndex: "typeArea",
      key: "typeArea",
      className: "table-cell",
    },
    {
      title: t("Name Region"),
      dataIndex: "nameRegion",
      key: "nameRegion",
      className: "table-cell",
    },
    {
      title: t("Province"),
      dataIndex: "province",
      key: "province",
      className: "table-cell",
    },
    {
      title: t("Action"),
      valueType: "option",
      key: "option",
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record, action);
            action?.startEditable?.(record.id);
          }}
        >
          {t("Edit")}
        </a>,
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          key="view"
        >
          {t("View")}
        </a>,
      ],
    },
  ];

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
            count={dataAreas.length}
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
        <TableComponent key="table-areas" data={dataAreas} columns={columns} loading={isLoadingAreas} />
        <div className="right-dashboard-component">
          <div className="right-dashboard-component-title">
            <h3>{t("TOTAL AREAS")}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
