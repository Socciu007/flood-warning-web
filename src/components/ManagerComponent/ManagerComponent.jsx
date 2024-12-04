import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ReloadOutlined,
  ColumnHeightOutlined,
  SettingOutlined,
  PlusOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { Tooltip, Button, Tag, message } from "antd";
import SearchComponent from "../SearchComponent/SearchComponent";
import TableComponent from "../TableComponent/TableComponent";
import {
  getAllNotificationsByManager,
  sendNoticeToArea,
} from "../../services/serviceNotifications";
import { getExamOfUser } from "../../services/serviceExam";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import "./style.scss";
import { formatDateTime } from "../../utils";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import FormFillNoti from "../ChildrenComponent/FormFillNoti";

const ManagerComponent = ({ activeTab }) => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const [dataNotification, setDataNotification] = useState([]);
  const [dataExaminations, setDataExaminations] = useState([]);
  const [dataAreas, setDataAreas] = useState([]);
  const [isOpenDrawerNoti, setIsOpenDrawerNoti] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // Query notifications of manager
  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotificationsByManager(currentUser._id),
  });

  // Query examinations of manager
  const { data: examinations, isLoading: isLoadingExaminations } = useQuery({
    queryKey: ["examinations"],
    queryFn: () => getExamOfUser(currentUser._id),
  });

  // Query areas of manager
  const { data: areas, isLoading: isLoadingAreas } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllArea(currentUser._id),
  });

  // Set data notifications
  useEffect(() => {
    if (notifications) {
      setDataNotification(notifications);
    }
  }, [notifications]);

  // Set data examinations
  useEffect(() => {
    if (examinations) {
      const formattedExaminations = examinations.map((exam) => ({
        ...exam,
        nameFarm: exam.farmAreaId.name,
        typeFarm: exam.farmAreaId.type,
        percentPos: exam.result.percentPos,
        percentNeg: exam.result.percentNeg,
        percentNeu: exam.result.percentNeu,
      }));
      setDataExaminations(formattedExaminations);
    }
  }, [examinations]);

  // Set data farm area
  useEffect(() => {
    if (areas) {
      const formattedAreas = areas.map((area) => ({
        id: area._id,
        nameArea: area.name,
        typeArea: area.type,
        area: area.area,
        nameRegion: area.regionId.name,
        province: area.regionId.province,
        createdAt: area.createdAt,
      }));
      setDataAreas(formattedAreas);
    }
  }, [areas]);

  const columnsNoti = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
    },
    {
      title: t("Title"),
      dataIndex: "title",
      className: "table-cell",
    },
    {
      title: t("Description"),
      dataIndex: "description",
      className: "table-cell",
    },
    {
      title: t("Content"),
      dataIndex: "content",
      className: "table-cell",
    },
    {
      title: t("Type"),
      dataIndex: "type",
      className: "table-cell",
      render: (_, record) => {
        return (
          <Tag color={record?.type === "email" ? "volcano" : "green"}>
            {record.type}
          </Tag>
        );
      },
    },
    {
      title: t("Created At"),
      dataIndex: "createdAt",
      className: "table-cell",
      render: (_, record) => {
        return <span>{formatDateTime(record.createdAt)}</span>;
      },
    },
  ];

  const columnsExam = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
    },
    {
      title: t("Name Farm"),
      dataIndex: "nameFarm",
      className: "table-cell",
    },
    {
      title: t("Type Farm"),
      dataIndex: "typeFarm",
      className: "table-cell",
    },
    {
      title: t("pH"),
      dataIndex: "pospH",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.pospH ? record.pospH.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Temperature"),
      dataIndex: "posTemperature",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posTemperature ? record.posTemperature.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("NH₃"),
      dataIndex: "posAmmonia",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.posAmmonia ? record.posAmmonia.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("TSS"),
      dataIndex: "posSuspendedSolids",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posSuspendedSolids
              ? record.posSuspendedSolids.toFixed(2)
              : "-"}
          </span>
        );
      },
    },
    {
      title: t("Salinity"),
      dataIndex: "posSalinity",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posSalinity ? record.posSalinity.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("Alkalinity"),
      dataIndex: "posAlkalinity",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posAlkalinity ? record.posAlkalinity.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("Clarity"),
      dataIndex: "posClarity",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.posClarity ? record.posClarity.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("DO"),
      dataIndex: "posDO",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.posDO ? record.posDO.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Phosphat"),
      dataIndex: "posPhotsPhat",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posPhotsPhat ? record.posPhotsPhat.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("Total Crom"),
      dataIndex: "posTotalCrom",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posTotalCrom ? record.posTotalCrom.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("H₂S"),
      dataIndex: "posH2S",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.posH2S ? record.posH2S.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("BOD₅"),
      dataIndex: "posBOD5",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.posBOD5 ? record.posBOD5.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("COD"),
      dataIndex: "posCOD",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.posCOD ? record.posCOD.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Coliform"),
      dataIndex: "posColiform",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posColiform ? record.posColiform.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("Results Positive"),
      dataIndex: "percentPos",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.percentPos ? record.percentPos.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("Results Negative"),
      dataIndex: "percentNeg",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.percentNeg ? record.percentNeg.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("Results Neutral"),
      dataIndex: "percentNeu",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.percentNeu ? record.percentNeu.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("Created At"),
      dataIndex: "createdAt",
      className: "table-cell",
      render: (_, record) => {
        return <span>{formatDateTime(record.createdAt)}</span>;
      },
    },
  ];

  const columnsArea = [
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
      title: t("Created At"),
      dataIndex: "createdAt",
      key: "createdAt",
      className: "table-cell",
      render: (_, record) => {
        return <span>{formatDateTime(record.createdAt)}</span>;
      },
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
      ],
    },
  ];

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

  // Handle send notice to area
  const handleSendNotice = async (values) => {
    const res = await sendNoticeToArea({
      ...values,
      userId: currentUser._id,
      regionId: currentUser.regionId,
      type: "alert",
    });
    if (res) {
      message.success(t("Send notice to area success!"));
    } else {
      message.error(t("Send notice to area failed!"));
    }
    return true
  };

  return (
    <div className="manager-component">
      <div>
        <div className="manager-component-title">
          {activeTab === "notification" && <h3>{t("Notification")}</h3>}
          {activeTab === "users" && <h3>{t("Users")}</h3>}
          {activeTab === "areas" && <h3>{t("Areas List")}</h3>}
          {activeTab === "examinations" && <h3>{t("Examination List")}</h3>}
          <SearchComponent />
        </div>
      </div>
      <div className="manager-component-table">
        {activeTab === "notification" && (
          <TableComponent
            key="table-notifications"
            data={dataNotification}
            columns={columnsNoti}
            loading={isLoadingNotifications}
            actionRef={actionRef}
            config={{
              search: false,
              options: {
                reload: async () => {
                  await queryClient.refetchQueries(["notifications"]);
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
        )}
        {activeTab === "examinations" && (
          <TableComponent
            key="table-examinations"
            data={dataExaminations}
            columns={columnsExam}
            loading={isLoadingExaminations}
            actionRef={actionRef}
            config={{
              search: false,
              options: {
                reload: async () => {
                  await queryClient.refetchQueries(["examinations"]);
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
              toolBarRender: () => [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  onClick={() => setIsOpenDrawerNoti(true)}
                  type="primary"
                >
                  {t("Send notice")}
                </Button>,
              ],
            }}
          />
        )}
        {activeTab === "areas" && (
          <TableComponent
            key="table-areas"
            data={dataAreas}
            columns={columnsArea}
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
              toolBarRender: () => [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    actionRef.current?.reload();
                  }}
                  type="primary"
                >
                  {t("Add farm")}
                </Button>,
              ],
            }}
          />
        )}
        <div className="right-manager-component"></div>
      </div>
      <DrawerComponent
        title="Send notice to area"
        open={isOpenDrawerNoti}
        onOpenChange={setIsOpenDrawerNoti}
        submitter={{
          searchConfig: {
            submitText: t("Send"),
            resetText: t("Cancel"),
          },
        }}
        onFinish={async (values) => handleSendNotice(values)}
        props={{
          width: "500px",
          wrapClassName: "exam-drawer",
        }}
      >
        <FormFillNoti />
      </DrawerComponent>
    </div>
  );
};

export default ManagerComponent;
