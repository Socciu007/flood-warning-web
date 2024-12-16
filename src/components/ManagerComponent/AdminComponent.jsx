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
  getAllNotifications,
  sendManyNoticeToArea,
} from "../../services/serviceNotifications";
import { getAllExam } from "../../services/serviceExam";
import { getAllFarmAreas, deleteFarmArea, updateFarmArea } from "../../services/serviceFarmArea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../services/serviceUser";
import "./style.scss";
import { formatDateTime, renderString } from "../../utils";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
// import DrawerComponent from "../DrawerComponent/DrawerComponent";
// import FormFillNoti from "../ChildrenComponent/FormFillNoti";

const AdminComponent = ({ activeTab }) => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const [dataNotification, setDataNotification] = useState([]);
  const [dataExaminations, setDataExaminations] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataAreas, setDataAreas] = useState([]);
  const [dataSend, setDataSend] = useState([]);
  // const [isOpenDrawerNoti, setIsOpenDrawerNoti] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  // Query notifications of manager
  const { data: notifications, isLoading: isLoadingNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getAllNotifications(currentUser.accessToken),
  });

  // Query examinations
  const { data: examinations, isLoading: isLoadingExaminations } = useQuery({
    queryKey: ["examinations"],
    queryFn: () => getAllExam(currentUser.accessToken),
  });

  // Query all farm areas
  const { data: farmAreas, isLoading: isLoadingFarmAreas } = useQuery({
    queryKey: ["farmAreas"],
    queryFn: () => getAllFarmAreas(),
  });

  // Query wishlist user of manager
  const { data: usersData, isLoading: isLoadingUsersData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });

  // Set data wishlist
  useEffect(() => {
    if (usersData) {
      setDataUsers(usersData.data);
    }
  }, [usersData]);

  // Set data notifications
  useEffect(() => {
    if (notifications) {
      const cloneNotifications = notifications.map((noti) => ({
        ...noti,
        sender: noti.userId.username,
      }));
      setDataNotification(cloneNotifications);
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
    if (farmAreas) {
      const formattedAreas = farmAreas.data.map((area) => ({
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
  }, [farmAreas]);

  const columnsNoti = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
    },
    {
      title: t("Sender"),
      dataIndex: "sender",
      className: "table-cell"
    },
    {
      title: t("Title"),
      dataIndex: "title",
      className: "table-cell",
      width: 240,
    },
    {
      title: t("Description"),
      dataIndex: "description",
      className: "table-cell",
      width: 350,
    },
    {
      title: t("Content"),
      dataIndex: "content",
      className: "table-cell",
      copyable: true,
      ellipsis: true,
      width: 350,
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
      title: t("Rainfall"),
      dataIndex: "posRainfall",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.posRainfall ? record.posRainfall.toFixed(2) : "-"}
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
        placeholder: t("Name"),
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
      fieldProps: {
        placeholder: t("Type"),
      },
    },
    {
      title: t("Area (ha)"),
      dataIndex: "area",
      valueType: "number",
      key: "area",
      className: "table-cell",
      fieldProps: {
        placeholder: t("Area (ha)"),
        style: {
          width: "100px",
        },
      },
      render: (_, record) => {
        return <span>{record.area.split(" ")[0]}</span>;
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

  const columnsUsers = [
    {
      title: "#",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
    },
    {
      title: t("Name"),
      dataIndex: "username",
      key: "username",
      className: "table-cell",
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
      className: "table-cell",
    },
    {
      title: t("Phone"),
      dataIndex: "phone",
      key: "phone",
      className: "table-cell",
    },
    {
      title: t("Address"),
      dataIndex: "address",
      key: "address",
      className: "table-cell",
      width: 350,
      render: (_, record) => {
        return <span>{record.address}</span>;
      },
    },
    {
      title: t("Role"),
      dataIndex: "role",
      key: "role",
      className: "table-cell",
    },
    {
      title: t("Created At"),
      dataIndex: "createdAt",
      key: "createdAt",
      className: "table-cell",
      render: (_, record) => {
        return <span>{formatDateTime(record.createdAt)}</span>;
      },
    },
  ];

  // Handle delete farm
  const handleDeleteFarm = async (id) => {
    const res = await deleteFarmArea(id);
    if (res) {
      message.success(t("Delete farm area success!"));
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
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
      queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
    } else {
      message.error(t("Update farm area failed!"));
    }
  };

  // Handle send notice to area
  const handleSendNotice = async (data) => {
    if (data.length === 0) {
      message.warning(t("Please select at least one examination to send notice!"));
      return;
    }
    const res = await sendManyNoticeToArea(data);
    if (res) {
      message.success(t("Send notice to area success!"));
      actionRef.current?.clearSelected?.();
      setDataSend([]);
    } else {
      message.error(t("Send notice to area failed!"));
      actionRef.current?.clearSelected?.();
      setDataSend([]);
    }
    return true;
  };

  // Handle select row in examination table
  const handleSelectRow = (_, selectedRows) => {
    const dataSend = selectedRows.map((item) => {
      const levelWarning =
        item.result.percentPos > 0.75
          ? "Low Level"
          : item.result.percentPos > 0.5
          ? "Moderate Level"
          : item.result.percentPos > 0.25
          ? "High Level"
          : "Severe Level";
      const content = `Environmental Data:
      ${renderString(
        item.posDO,
        "DO",
        `${item.DO}mg/l`,
        "Low DO levels can reduce the ability of aquatic species to survive."
      )}
      ${renderString(
        item.posTemperature,
        "Temperature",
        `${item.temperature}°C`,
        "This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products."
      )}
      ${renderString(
        item.pospH,
        "pH",
        item.pH,
        "Low pH levels can reduce the ability of plants and aquatic animals to absorb nutrients."
      )}
      ${renderString(
        item.posAmmonia,
        "Ammonia(NH₃)",
        `${item.ammonia}mg/l`,
        "Ammonia levels reduce the quality of aquatic and plant habitats."
      )}
      ${renderString(
        item.posBOD5,
        "BOD₅",
        `${item.BOD5}mg/l`,
        "COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life."
      )}
      ${renderString(
        item.posCOD,
        "COD",
        `${item.COD}mg/l`,
        "COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life."
      )}
      ${renderString(
        item.posColiform,
        "Coliform",
        `${item.coliform}CFU/100ml`,
        "There is organic pollution in the aquatic environment."
      )}
      ${renderString(
        item.posClarity,
        "Clarity",
        `${item.clarity}cm`,
        "Signs of pollution, organic waste or bacteria in water, posing a risk of disease outbreak."
      )}
      ${renderString(
        item.posPhotsPhat,
        "Phosphat",
        `${item.phosphat}mg/l`,
        "Pets showing signs of Phosphate toxicity and stress."
      )}
      ${renderString(
        item.posSalinity,
        "Salinity",
        `${item.salinity}‰`,
        "Low salinity aquatic environments can affect the ability of aquatic species to sustain life."
      )}
      ${renderString(
        item.posAlkalinity,
        "Alkalinity",
        `${item.alkalinity}mg/l`,
        "Risk of water acidification."
      )}
      ${renderString(
        item.posSuspendedSolids,
        "Suspended Solids",
        `${item.suspendedSolids}mg/l`,
        "TSS levels can reduce water filtration and degrade water quality in aquatic habitats."
      )}
      ${renderString(
        item.posTotalCrom,
        "Total Crom",
        `${item.totalCrom}mg/l`,
        "There is chromium contamination."
      )}
      ${renderString(
        item.posH2S,
        "H₂S",
        `${item.H2S}mg/l`,
        "This level of H₂S can lead to oxygen deficiency in the environment."
      )}
      ${renderString(
        item.posRainfall,
        "Rainfall",
        `${item.rainfall}mm`,
        "This rainfall can reduce the vitality of species."
      )}
      `;
      return {
        title: `[${item.farmAreaId.name} Alert] - ${levelWarning}`,
        description: `This is a ${levelWarning} alert for the ${item.farmAreaId.type}`,
        content: content,
        userId: currentUser._id,
        farmAreaId: item.farmAreaId._id,
      };
    });
    setDataSend(dataSend);
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
            keyTable="table-notifications"
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
                density: false,
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
        {activeTab === "users" && (
          <TableComponent
            keyTable="table-users"
            data={dataUsers}
            columns={columnsUsers}
            loading={isLoadingUsersData}
            actionRef={actionRef}
            config={{
              search: false,
              options: {
                reload: async () => {
                  await queryClient.refetchQueries(["users"]);
                },
                reloadIcon: (
                  <Tooltip title={t("Refresh")}>
                    <ReloadOutlined />
                  </Tooltip>
                ),
                density: false,
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
            keyTable="table-examinations"
            data={dataExaminations}
            rowSelection={{
              onChange: handleSelectRow,
              type: "checkbox",
            }}
            rowKey={(record) => record._id}
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
                density: false,
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
                  // onClick={() => setIsOpenDrawerNoti(true)}
                  onClick={() => handleSendNotice(dataSend)}
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
            keyTable="table-areas"
            data={dataAreas}
            columns={columnsArea}
            loading={isLoadingFarmAreas}
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
                  await queryClient.refetchQueries(["farmAreas"]);
                },
                reloadIcon: (
                  <Tooltip title={t("Refresh")}>
                    <ReloadOutlined />
                  </Tooltip>
                ),
                density: false,
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
      {/* <DrawerComponent
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
      </DrawerComponent> */}
    </div>
  );
};

export default AdminComponent;
