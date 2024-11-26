import React, { useState, useEffect, useRef, Children } from "react";
import "./style.scss";
import { useTranslation } from "react-i18next";
import CardComponent from "../CardComponent/CardComponent";
import iconGroupUser from "../../assets/icons/icon-groupUser.svg";
import iconExam from "../../assets/icons/icon-exam.svg";
import iconArea from "../../assets/icons/icon-map.svg";
import {
  EditFilled,
  DeleteFilled,
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import SearchComponent from "../SearchComponent/SearchComponent";
import TableComponent from "../TableComponent/TableComponent";
import {
  getAllArea,
  updateFarmArea,
  deleteFarmArea,
} from "../../services/serviceFarmArea";
import { ModalForm, ProForm, ProFormText } from "@ant-design/pro-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { message, Tooltip } from "antd";

const DashboardComponent = () => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const [dataAreas, setDataAreas] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  // Get all areas
  const queryClient = useQueryClient();
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
        area: area.area,
        nameRegion: area.regionId.name,
        province: area.regionId.province,
      }));
      setDataAreas(formattedAreas);
    }
  }, [areas]);

  const children = (
    <ProForm.Group>
      <ProFormText
        width="xs"
        name="DO"
        label="DO(mg/l)"
        placeholder={false}
        tooltip={t("Dissolved oxygen")}
        min={0}
        fieldProps={{
          precision: 2,
        }}
      />
      <ProFormText
        width="xs"
        name="temperature"
        label="Temperature(◦C):"
        placeholder={false}
      />
      <ProFormText width="xs" name="pH" label="pH:" placeholder={false} />
      <ProFormText
        width="xs"
        name="salinity"
        label="Salinity(%.):"
        placeholder={false}
      />
      <ProFormText
        width="xs"
        name="alkalinity"
        label="Alkalinity(mg/l):"
        placeholder={false}
      />
      <ProFormText
        width="xs"
        name="clarity"
        label="Clarity(cm):"
        placeholder={false}
      />
      <ProFormText
        width="xs"
        name="amoniac"
        label="Amoniac(mg/l):"
        placeholder={false}
      />
      <ProFormText width="xs" name="H2S" label="H2S(mg/l):" placeholder={false} />
      <ProFormText width="xs" name="BOD5" label="BOD5(mg/l):" placeholder={false} />
      <ProFormText width="xs" name="COD" label="COD(mg/l):" placeholder={false} />
      <ProFormText
        width="xs"
        name="coliform"
        label="Coliform(MPN/100ml):"
        placeholder={false}
      />
      <ProFormText
        width="xs"
        name="suspendedSolids"
        label="TSS(mg/l):"
        placeholder={false}
      />
    </ProForm.Group>
  );

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
      title: t("Name Farm"),
      dataIndex: "nameArea",
      valueType: "text",
      key: "nameArea",
      className: "table-cell",
    },
    {
      title: t("Type Farm"),
      dataIndex: "typeArea",
      valueType: "text",
      key: "typeArea",
      className: "table-cell",
    },
    {
      title: t("Area"),
      dataIndex: "area",
      valueType: "text",
      key: "area",
      className: "table-cell",
    },
    {
      title: t("Name Region"),
      dataIndex: "nameRegion",
      key: "nameRegion",
      className: "table-cell",
      editable: false,
    },
    {
      title: t("Province"),
      dataIndex: "province",
      key: "province",
      className: "table-cell",
      editable: false,
    },
    {
      title: t("Action"),
      valueType: "option",
      // className: "table-cell",
      width: 80,
      key: "option",
      render: (_, record, __, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          <Tooltip title={t("Edit")}>
            <EditFilled style={{ color: "#1976D2" }} />
          </Tooltip>
        </a>,
        <a key="delete" onClick={() => handleDeleteFarm(record.id)}>
          <Tooltip title={t("Delete")}>
            <DeleteFilled style={{ color: "#FF6347" }} />
          </Tooltip>
        </a>,
        <ModalForm
          key="exam"
          title={t("Please fill in the test indicators")}
          trigger={
            <a key="exam" onClick={() => console.log("exam")}>
              <Tooltip title={t("Add examination")}>
                <FileAddOutlined style={{ color: "#9E9E9E" }} />
              </Tooltip>
            </a>
          }
          submitter={{
            render: () => {},
          }}
          onFinish={async (values) => {}}
        >
          {children}
        </ModalForm>,
      ],
    },
  ];

  // Handle update farm
  const handleUpdateFarm = async (id, record) => {
    const data = {
      name: record.nameArea,
      type: record.typeArea,
      area: record.area,
    };
    const res = await updateFarmArea(id, data);
    if (res) {
      message.success(t("Update farm area success!"));
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    } else {
      message.error(t("Update farm area failed!"));
    }
  };

  // Handle delete farm
  const handleDeleteFarm = async (id) => {
    const res = await deleteFarmArea(id);
    if (res) {
      message.success(t("Delete farm area success!"));
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    } else {
      message.error(t("Delete farm area failed!"));
    }
  };

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
        <TableComponent
          key="table-areas"
          data={dataAreas}
          columns={columns}
          loading={isLoadingAreas}
          actionRef={actionRef}
          config={{
            search: false,
            editable: {
              saveText: t("Save"),
              onSave: async (id, record) => {
                await handleUpdateFarm(id, record);
              },
              cancelText: t("Cancel"),
              actionRender: (_, __, dom) => [dom.save, dom.cancel],
            },
            options: {
              reload: async () => {
                await queryClient.refetchQueries(["areas"]);
              },
              reloadIcon: (
                <Tooltip title={t("Refresh")}>
                  <ReloadOutlined />
                </Tooltip>
              ),
              densityIcon: (
                <Tooltip title={t("Density")}>
                  <ColumnHeightOutlined />
                </Tooltip>
              ),
              // search: true
              setting: {
                settingIcon: (
                  <Tooltip title={t("Setting")}>
                    <SettingOutlined />
                  </Tooltip>
                ),
              },
            },
          }}
        />
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