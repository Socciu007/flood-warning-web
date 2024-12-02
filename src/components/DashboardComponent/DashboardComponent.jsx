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
import { getListUserPreferred } from "../../services/serviceUser";
import { getExamOfUser } from "../../services/serviceExam";
import { ProForm, ProFormMoney } from "@ant-design/pro-components";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { message, Tooltip, Checkbox, Form, List, Avatar } from "antd";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import { waitTime } from "../../utils";
import { testAreaFarm } from "../../services/serviceExam";

const DashboardComponent = () => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const [dataAreas, setDataAreas] = useState([]);
  const [typeArea, setTypeArea] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  // Get all areas
  const queryClient = useQueryClient();
  const { data: areas, isLoading: isLoadingAreas } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllArea(currentUser._id),
  });
  const { data: listUserPreferred } = useQuery({
    queryKey: ["listUserPreferred"],
    queryFn: () => getListUserPreferred(
      { regionId: currentUser.regionId },
      currentUser.accessToken
    ),
  });
  const { data: examsOfUser } = useQuery({
    queryKey: ["examsOfUser"],
    queryFn: () => getExamOfUser(currentUser._id, currentUser.accessToken),
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
        results: area.exam.percentPos * 100 || null,
      }));
      setDataAreas(formattedAreas);
    }
  }, [areas]);

  const children = (
    <>
      <ProForm.Group className="exam-form">
        {(typeArea === "Oyster farming" || typeArea === "Cobia farming") && (
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
        )}
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
        {typeArea === "Mangrove forest" && (
          <ProFormMoney
            width="xs"
            name="rainfall"
            label="Rainfall(mm/year)"
            tooltip={t("Rainfall")}
            placeholder={false}
            fieldProps={{
              precision: 0,
              moneySymbol: false,
            }}
          />
        )}
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
        {(typeArea === "Mangrove forest" || typeArea === "Oyster farming") && (
          <ProFormMoney
            width="xs"
            name="alkalinity"
            label="Alkalinity(mg/l)"
            tooltip={t("Alkalinity")}
            placeholder={false}
            // initialValue={60}
            fieldProps={{
              precision: 0,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Oyster farming" && (
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
        )}
        <ProFormMoney
          width="xs"
          name="ammonia"
          label="NH₃(mg/l)"
          tooltip={t("Ammonia")}
          placeholder={false}
          initialValue={0.3}
          fieldProps={{
            precision: 1,
            moneySymbol: false,
          }}
        />
        {typeArea !== "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="H2S"
            label="H₂S(mg/l)"
            tooltip={t("H2S")}
            placeholder={false}
            // initialValue={0.05}
            fieldProps={{
              precision: 2,
              moneySymbol: false,
            }}
          />
        )}
        {typeArea === "Cobia farming" && (
          <ProFormMoney
            width="xs"
            name="photsPhat"
            label="Photsphat(mg/l)"
            tooltip={t("Photsphat")}
            placeholder={false}
            fieldProps={{
              precision: 1,
              moneySymbol: false,
            }}
          />
        )}
        {(typeArea === "Oyster farming" || typeArea === "Cobia farming") && (
          <ProFormMoney
            width="xs"
            name="totalCrom"
            label="Total Crom(mg/l)"
            tooltip={t("Total Crom")}
            placeholder={false}
            fieldProps={{
              precision: 0,
              moneySymbol: false,
            }}
          />
        )}
        {(typeArea === "Mangrove forest" || typeArea === "Oyster farming") && (
          <ProFormMoney
            width="xs"
            name="BOD5"
            label="BOD₅(mg/l)"
            tooltip={t("BOD5")}
            placeholder={false}
            initialValue={50}
            fieldProps={{
              precision: 0,
              moneySymbol: false,
            }}
          />
        )}
        {(typeArea === "Mangrove forest" || typeArea === "Oyster farming") && (
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
        )}
        {typeArea === "Oyster farming" && (
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
        )}
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
    if (res) {
      message.success(t("Successful regional forecasting!"));
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["areas"] });
    } else {
      message.error(t("Area forecast failed. Try again later!"));
    }
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
      fieldProps: {
        style: {
          width: "100px",
        },
      },
    },
    {
      title: t("Type Farm"),
      dataIndex: "typeArea",
      valueType: "select",
      valueEnum: {
        "Oyster farming": t("Oyster farming"),
        "Cobia farming": t("Cobia farming"),
        "Mangrove forest": t("Mangrove forest"),
      },
      key: "typeArea",
      className: "table-cell",
    },
    {
      title: t("Area"),
      dataIndex: "area",
      valueType: "text",
      key: "area",
      className: "table-cell",
      fieldProps: {
        style: {
          width: "100px",
        },
      },
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
      title: t("Results"),
      dataIndex: "results",
      key: "results",
      className: "table-cell",
      editable: false,
      valueType: () => ({
        type: "percent",
        precision: 2,
      }),
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
              <a key="exam" onClick={() => setTypeArea(record.typeArea)}>
                <Tooltip title={t("Add examination")}>
                  <FileAddOutlined style={{ color: "#9E9E9E" }} />
                </Tooltip>
              </a>
            }
            submitter={{
              searchConfig: {
                submitText: t("Check"),
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
          <h3>{t("Dashboard")}</h3>
          <SearchComponent />
        </div>
        <div className="dashboard-component-header">
          <CardComponent
            title={t("Total users")}
            count={listUserPreferred?.data?.length || 0}
            srcImg={iconGroupUser}
            backgroundColor={"#ffd600"}
          />
          <CardComponent
            title={t("Total areas")}
            count={dataAreas.length || 0}
            srcImg={iconArea}
            backgroundColor={"#f5365c"}
          />
          <CardComponent
            title={t("Total exams")}
            count={examsOfUser?.length || 0}
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
            <h3>{t("User Preferred")}</h3>
          </div>
          <div className="right-dashboard-component-list">
            <List
              className="right-dashboard-component-list-item"
              itemLayout="horizontal"
              dataSource={listUserPreferred?.data}
              renderItem={(item) => (
                <List.Item
                  // onClick={() => handleSearchCustomer(item?.id, null, null)}
                  style={{
                    backgroundColor: "transparent",
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={item?.userInfo?.avatar}
                        style={{ backgroundColor: "#f56a00" }}
                      >
                        {item?.avatar
                          ? null
                          : item?.userInfo?.username?.[0]?.toUpperCase() || "A"}
                      </Avatar>
                    }
                    title={
                      <div className="customer-user-info">
                        <span>
                          {item?.userInfo?.username ||
                            item?.userInfo?.email?.split("@")[0]}
                        </span>
                        <span>{item?.userInfo?.email}</span>
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

export default DashboardComponent;
