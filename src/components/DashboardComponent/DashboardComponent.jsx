import React, { useState, useEffect, useRef } from "react";
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
import { ProForm, ProFormMoney } from "@ant-design/pro-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { message, Tooltip, Checkbox, Form } from "antd";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import { waitTime } from "../../utils";
import { testAreaFarm } from "../../services/serviceExam";

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
    <>
      <ProForm.Group className="exam-form">
        <ProFormMoney
          width="xs"
          name="DO"
          label="DO(mg/l)"
          placeholder={false}
          tooltip={t("Dissolved oxygen")}
          initialValue={5}
          min={0}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="temperature"
          label="Temperature(°C)"
          tooltip={t("Temperature")}
          placeholder={false}
          initialValue={20}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="pH"
          label="pH"
          tooltip={t("pH")}
          placeholder={false}
          initialValue={7.5}
          fieldProps={{
            precision: 1,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="salinity"
          label="Salinity(‰)"
          tooltip={t("Salinity")}
          placeholder={false}
          initialValue={20}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="alkalinity"
          label="Alkalinity(mg/l)"
          tooltip={t("Alkalinity")}
          placeholder={false}
          initialValue={60}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="clarity"
          label="Clarity(cm)"
          tooltip={t("Clarity")}
          placeholder={false}
          initialValue={20}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="ammonia"
          label="Ammonia(mg/l)"
          tooltip={t("Ammonia")}
          placeholder={false}
          initialValue={0.3}
          fieldProps={{
            precision: 1,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="H2S"
          label="H2S(mg/l)"
          tooltip={t("H2S")}
          placeholder={false}
          initialValue={0.05}
          fieldProps={{
            precision: 2,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="BOD5"
          label="BOD5(mg/l)"
          tooltip={t("BOD5")}
          placeholder={false}
          initialValue={50}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="COD"
          label="COD(mg/l)"
          tooltip={t("COD")}
          placeholder={false}
          initialValue={150}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="coliform"
          label="Coliform(MPN/100ml)"
          tooltip={t("Coliform")}
          placeholder={false}
          initialValue={5000}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
        <ProFormMoney
          width="xs"
          name="suspendedSolids"
          label="TSS(mg/l)"
          tooltip={t("TSS")}
          placeholder={false}
          initialValue={50}
          fieldProps={{
            precision: 0,
            moneySymbol: false,
          }}
        />
      </ProForm.Group>
      <Form.Item
        className="auto-send-mail"
        valuePropName="checked"
        name="autoSendMail"
      >
        <Checkbox>{t("Automatically send results by mail")}</Checkbox>
      </Form.Item>
    </>
  );

  // Handle submit modal test area
  const handleSubmitModal = async (values, farmAreaId) => {
    await waitTime(1000);
    const res = await testAreaFarm(
      { ...values, userId: currentUser._id, farmAreaId },
      currentUser.accessToken
    );
    console.log("res", res);
    return true;
  };

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
        <ModalFormComponent
          key="delete"
          title={t("Are you sure you want to delete this area?")}
          trigger={
            <a key="delete" onClick={() => {}}>
              <Tooltip title={t("Delete")}>
                <DeleteFilled style={{ color: "#FF6347" }} />
              </Tooltip>
            </a>
          }
          submitter={{
            searchConfig: {
              submitText: t("Confirm"),
              resetText: t("Cancel"),
            },
          }}
          props={{
            width: 450,
            wrapClassName: "delete-modal",
          }}
          handleSubmitModal={() => handleDeleteFarm(record.id)}
        />,
        <div key="exam" className="exam-modal">
          <ModalFormComponent
            title="Please fill in the test indicators"
            trigger={
              <a key="exam" onClick={() => {}}>
                <Tooltip title={t("Add examination")}>
                  <FileAddOutlined style={{ color: "#9E9E9E" }} />
                </Tooltip>
              </a>
            }
            submitter={{
              searchConfig: {
                submitText: t("Test Results"),
                resetText: t("Cancel"),
              },
            }}
            handleSubmitModal={async (values) =>
              handleSubmitModal(values, record.id)
            }
            props={{
              width: "fit-content",
              wrapClassName: "exam-modal",
            }}
          >
            {children}
          </ModalFormComponent>
        </div>,
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
