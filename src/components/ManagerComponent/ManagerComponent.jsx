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
// import SearchComponent from "../SearchComponent/SearchComponent";
import TableComponent from "../TableComponent/TableComponent";
import {
  getAllNotificationsByManager,
  sendManyNoticeToArea,
} from "../../services/serviceNotifications";
import { getExamOfUser } from "../../services/serviceExam";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getListUserPreferred } from "../../services/serviceUser";
import "./style.scss";
import { formatDateTime, renderString } from "../../utils";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import FormFillFarm from "../ChildrenComponent/FormFillFarm";
import {
  createFarmArea,
  updateFarmArea,
  deleteFarmArea,
  getAllArea,
} from "../../services/serviceFarmArea";

const ManagerComponent = ({ activeTab }) => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const [dataNotification, setDataNotification] = useState([]);
  const [dataExaminations, setDataExaminations] = useState([]);
  const [dataWishlist, setDataWishlist] = useState([]);
  const [dataAreas, setDataAreas] = useState([]);
  const [dataSend, setDataSend] = useState([]);
  const [isOpenDrawerAddFarm, setIsOpenDrawerAddFarm] = useState(false);
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
    queryKey: ["areasTab"],
    queryFn: () => getAllArea(currentUser._id),
  });

  // Query wishlist user of manager
  const { data: listUserPreferred, isLoading: isLoadingListUserPreferred } =
    useQuery({
      queryKey: ["listUserPreferred"],
      queryFn: () =>
        getListUserPreferred(
          { regionId: currentUser.regionId },
          currentUser.accessToken
        ),
    });

  // Set data wishlist
  useEffect(() => {
    if (listUserPreferred) {
      const cloneData = listUserPreferred?.data?.map((u) => u.userInfo);
      setDataWishlist(cloneData);
    }
  }, [listUserPreferred]);

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
        nameFarm: exam?.farmAreaId?.name,
        typeFarm: exam?.farmAreaId?.type,
        percentPos: exam?.result?.percentPos,
        percentNeg: exam?.result?.percentNeg,
        percentNeu: exam?.result?.percentNeu,
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
        regionId: area.regionId._id,
        createdAt: area.createdAt,
      }));
      setDataAreas(formattedAreas);
    }
  }, [areas]);

  const columnsNoti = [
    {
      title: "No",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
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
      title: "No",
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
      title: t("Type"),
      dataIndex: "typeFarm",
      className: "table-cell",
    },
    {
      title: t("DO"),
      dataIndex: "DO",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.DO ? record.DO.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("pH"),
      dataIndex: "pH",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record?.pH ? record.pH.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Temperature"),
      dataIndex: "temperature",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.temperature ? record.temperature.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("NH₃"),
      dataIndex: "ammonia",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.ammonia ? record.ammonia.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("TSS"),
      dataIndex: "suspendedSolids",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.suspendedSolids
              ? record.suspendedSolids.toFixed(2)
              : "-"}
          </span>
        );
      },
    },
    {
      title: t("Salinity"),
      dataIndex: "salinity",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.salinity ? record.salinity.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Alkalinity"),
      dataIndex: "alkalinity",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.alkalinity ? record.alkalinity.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("Clarity"),
      dataIndex: "clarity",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.clarity ? record.clarity.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Phosphat"),
      dataIndex: "phosphat",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.phosphat ? record.phosphat.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Rainfall"),
      dataIndex: "rainfall",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.rainfall ? record.rainfall.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("H₂S"),
      dataIndex: "H2S",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.H2S ? record.H2S.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("BOD₅"),
      dataIndex: "BOD5",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.BOD5 ? record.BOD5.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("COD"),
      dataIndex: "COD",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.COD ? record.COD.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Coliform"),
      dataIndex: "coliform",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.coliform ? record.coliform.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: "CN-",
      dataIndex: "CN",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.CN ? record.CN.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "As",
      dataIndex: "As",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.As ? record.As.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "Cd",
      dataIndex: "Cd",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Cd ? record.Cd.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "Pb",
      dataIndex: "Pb",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Pb ? record.Pb.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "Cu",
      dataIndex: "Cu",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Cu ? record.Cu.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "Hg",
      dataIndex: "Hg",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Hg ? record.Hg.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "Zn",
      dataIndex: "Zn",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Zn ? record.Zn.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "Fe",
      dataIndex: "Fe",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Fe ? record.Fe.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "Mn",
      dataIndex: "Mn",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Mn ? record.Mn.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: "F-",
      dataIndex: "F",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.F ? record.F.toFixed(2) : "-"}</span>;
      },
    },
    { 
      title: "Cr6+",
      dataIndex: "Cr6",
      className: "table-cell",
      render: (_, record) => {
        return <span>{record.Cr6 ? record.Cr6.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("Total Crom"),
      dataIndex: "totalCrom",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.totalCrom ? record.totalCrom.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("Number of Warn"),
      dataIndex: "level",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.numberWarning.level
              ? record.numberWarning.level
              : "-"}
          </span>
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
      title: t("Type"),
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
        return <span>{record?.area?.split(" ")[0]}</span>;
      },
    },
    {
      title: t("Region"),
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

  const columnsWishList = [
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
    },
  ];

  // Handle delete farm
  const handleDeleteFarm = async (id) => {
    const res = await deleteFarmArea(id);
    if (res) {
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["areasTab"] });
      message.success(t("Delete farm area success!"));
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
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["areasTab"] });
      message.success(t("Update farm area success!"));
    } else {
      message.error(t("Update farm area failed!"));
    }
  };

  // Handle send notice to area
  const handleSendNotice = async (data) => {
    if (data.length === 0) {
      message.warning(
        t("Please select at least one examination to send notice!")
      );
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
        "BOD5 levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life."
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
      )}`;
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

  // handle create farm area
  const handleCreateFarm = async (values) => {
    try {
      values.area = `${values.area} ha`;
      const res = await createFarmArea(dataAreas[0].regionId, values);
      if (res.status) {
        message.success(t("Create farm area success!"));
        // Refresh data
        queryClient.invalidateQueries({ queryKey: ["areasTab"] });
      } else {
        message.error(t(res.message));
      }
    } catch (error) {
      message.error(t("Create farm area failed!"));
    }
    return true;
  };

  return (
    <div className="manager-component">
      <div>
        <div className="manager-component-title">
          {activeTab === "notification" && <h3>{t("Notification")}</h3>}
          {activeTab === "users" && <h3>{t("Users")}</h3>}
          {activeTab === "areas" && <h3>{t("Areas List")}</h3>}
          {activeTab === "examinations" && <h3>{t("Examination List")}</h3>}
          {/* <SearchComponent /> */}
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
                reload: false,
                // reload: async () => {
                //   await queryClient.refetchQueries(["notifications"]);
                // },
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
                setting: false,
                // setting: {
                //   settingIcon: (
                //     <Tooltip title={t("Setting")}>
                //       <SettingOutlined />
                //     </Tooltip>
                //   ),
                // },
              },
            }}
          />
        )}
        {activeTab === "users" && (
          <TableComponent
            keyTable="table-users"
            data={dataWishlist}
            columns={columnsWishList}
            loading={isLoadingListUserPreferred}
            actionRef={actionRef}
            config={{
              search: false,
              options: {
                reload: false,
                // reload: async () => {
                //   await queryClient.refetchQueries(["listUserPreferred"]);
                // },
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
                setting: false,
                // setting: {
                //   settingIcon: (
                //     <Tooltip title={t("Setting")}>
                //       <SettingOutlined />
                //     </Tooltip>
                //   ),
                // },
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
                reload: false,
                // reload: async () => {
                //   await queryClient.refetchQueries(["examinations"]);
                // },
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
                setting: false,
                // setting: {
                //   settingIcon: (
                //     <Tooltip title={t("Setting")}>
                //       <SettingOutlined />
                //     </Tooltip>
                //   ),
                // },
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
                reload: false,
                // reload: async () => {
                //   await queryClient.invalidateQueries({
                //     queryKey: ["areasTab"],
                //   });
                // },
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
                setting: false,
                // setting: {
                //   settingIcon: (
                //     <Tooltip title={t("Setting")}>
                //       <SettingOutlined />
                //     </Tooltip>
                //   ),
                // },
              },
              toolBarRender: () => [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  onClick={() => setIsOpenDrawerAddFarm(true)}
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
        title="Create farming area"
        open={isOpenDrawerAddFarm}
        onOpenChange={setIsOpenDrawerAddFarm}
        submitter={{
          searchConfig: {
            submitText: t("Create"),
            resetText: t("Cancel"),
          },
        }}
        onFinish={async (values) => handleCreateFarm(values)}
        props={{
          width: "500px",
          wrapClassName: "exam-drawer",
        }}
      >
        <FormFillFarm />
      </DrawerComponent>
    </div>
  );
};

export default ManagerComponent;
