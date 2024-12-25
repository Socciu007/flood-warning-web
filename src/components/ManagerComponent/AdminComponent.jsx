import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ColumnHeightOutlined,
  PlusOutlined,
  EditFilled,
  DeleteFilled,
  MailOutlined,
} from "@ant-design/icons";
import { Tooltip, Button, Tag, message } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import { useDispatch } from "react-redux";
import {
  getAllNotifications,
  sendManyNoticeToArea,
} from "../../services/serviceNotifications";
import { getAllExam } from "../../services/serviceExam";
import { contentNotice } from "../ContentComponent/ContentNotice";
import {
  getAllFarmAreas,
  deleteFarmArea,
  updateFarmArea,
} from "../../services/serviceFarmArea";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  getAllUsers,
  updateUserProfile,
  deleteUser,
  registerUser,
} from "../../services/serviceUser";
import "./style.scss";
import { formatDateTime } from "../../utils";
import {
  updateStandardData,
  getStandardData,
} from "../../services/serviceExam";
import { setStandardData } from "../../redux/slices/standardDataSlice.ts";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import FormFillAddUser from "../ChildrenComponent/FormFillAddUser";
import FormFillStandardData from "../ChildrenComponent/FormFillStandardData";
import { getBase64 } from "../../utils";

const AdminComponent = ({ activeTab }) => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const dispatch = useDispatch();
  const [dataNotification, setDataNotification] = useState([]);
  const [dataExaminations, setDataExaminations] = useState([]);
  const [dataUsers, setDataUsers] = useState([]);
  const [dataAreas, setDataAreas] = useState([]);
  const [dataSend, setDataSend] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [searchNotice, setSearchNotice] = useState("");
  const [searchExam, setSearchExam] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchArea, setSearchArea] = useState("");
  const [isOpenDrawerAddUser, setIsOpenDrawerAddUser] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { standardData } = useSelector((state) => state.standardData);
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

  // Set data users
  useEffect(() => {
    if (usersData) {
      console.log(usersData.data);
      const cloneUsers = usersData.data.map((user) => ({
        ...user,
        region: user?.regionId?.name,
        province: user?.regionId?.province,
      }));
      if (searchUser === "") {
        setDataUsers(cloneUsers);
      } else {
        const cloneUsersFilter = cloneUsers.data.filter((u) => {
          return Object.values(u).some((field) =>
            String(field).toLowerCase().includes(searchUser.toLowerCase())
          );
        });
        setDataUsers(cloneUsersFilter);
      }
    }
  }, [usersData, searchUser]);

  // Set data notifications
  useEffect(() => {
    if (notifications) {
      const cloneNotifications = notifications.map((noti) => ({
        ...noti,
        sender: noti.userId.username,
      }));
      if (searchNotice === "") {
        setDataNotification(cloneNotifications);
      } else {
        const cloneNotificationsFilter = cloneNotifications.filter((noti) => {
          return Object.values(noti).some((field) =>
            String(field).toLowerCase().includes(searchNotice.toLowerCase())
          );
        });
        setDataNotification(cloneNotificationsFilter);
      }
    }
  }, [notifications, searchNotice]);

  // Set data examinations
  useEffect(() => {
    if (examinations) {
      const formattedExaminations = examinations.map((exam) => ({
        ...exam,
        nameFarm: exam.farmAreaId.name,
        typeFarm: exam.farmAreaId.type,
      }));
      if (searchExam === "") {
        setDataExaminations(formattedExaminations);
      } else {
        const cloneExaminations = formattedExaminations.filter((exam) => {
          return Object.values(exam).some((field) =>
            String(field).toLowerCase().includes(searchExam.toLowerCase())
          );
        });
        setDataExaminations(cloneExaminations);
      }
    }
  }, [examinations, searchExam]);

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
      if (searchArea === "") {
        setDataAreas(formattedAreas);
      } else {
        const cloneAreas = formattedAreas.filter((area) => {
          return Object.values(area).some((field) =>
            String(field).toLowerCase().includes(searchArea.toLowerCase())
          );
        });
        setDataAreas(cloneAreas);
      }
    }
  }, [farmAreas, searchArea]);

  const columnsNoti = [
    {
      title: "No",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
    },
    {
      title: t("Sender"),
      dataIndex: "sender",
      className: "table-cell",
    },
    {
      title: t("Title"),
      dataIndex: "title",
      className: "table-cell",
      width: 250,
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
      render: (text) => (
        <Tooltip
          title={text}
          overlayClassName="custom-tooltip"
          overlayStyle={{ width: 300 }}
        >
          <span>{text}</span>
        </Tooltip>
      ),
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
        return <span>{record.ammonia ? record.ammonia.toFixed(2) : "-"}</span>;
      },
    },
    {
      title: t("TSS"),
      dataIndex: "suspendedSolids",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>
            {record.suspendedSolids ? record.suspendedSolids.toFixed(2) : "-"}
          </span>
        );
      },
    },
    {
      title: t("Salinity"),
      dataIndex: "salinity",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.salinity ? record.salinity.toFixed(2) : "-"}</span>
        );
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
        return (
          <span>{record.phosphat ? record.phosphat.toFixed(2) : "-"}</span>
        );
      },
    },
    {
      title: t("Rainfall"),
      dataIndex: "rainfall",
      className: "table-cell",
      render: (_, record) => {
        return (
          <span>{record.rainfall ? record.rainfall.toFixed(2) : "-"}</span>
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
            {record.numberWarning.level ? record.numberWarning.level : "-"}
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
      title: "No",
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

  const columnsUsers = [
    {
      title: "No",
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
      valueType: "text",
      fieldProps: {
        placeholder: t("Name"),
      },
    },
    {
      title: t("Email"),
      dataIndex: "email",
      key: "email",
      className: "table-cell",
      valueType: "text",
      fieldProps: {
        placeholder: t("Email"),
      },
    },
    {
      title: t("Phone"),
      dataIndex: "phone",
      key: "phone",
      className: "table-cell",
      valueType: "text",
      fieldProps: {
        placeholder: t("Phone"),
      },
    },
    {
      title: t("Address"),
      dataIndex: "address",
      key: "address",
      className: "table-cell",
      valueType: "text",
      fieldProps: {
        placeholder: t("Address"),
      },
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
      fieldProps: {
        placeholder: t("Role"),
      },
      valueType: "select",
      valueEnum: {
        admin: t("Admin"),
        manager: t("Manager"),
        citizen: t("Citizen"),
      },
      editable: false,
    },
    {
      title: t("Region"),
      dataIndex: "region",
      key: "region",
      className: "table-cell",
      valueType: "text",
      fieldProps: {
        placeholder: t("Address"),
      },
      editable: false,
    },
    {
      title: t("Province"),
      dataIndex: "province",
      key: "province",
      className: "table-cell",
      valueType: "text",
      fieldProps: {
        placeholder: t("Address"),
      },
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
      className: "table-cell",
      width: 60,
      key: "option",
      render: (_, record, __, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record._id);
          }}
        >
          <Tooltip title={t("Edit")}>
            <EditFilled style={{ color: "#1976D2" }} />
          </Tooltip>
        </a>,
        <ModalFormComponent
          key="delete"
          title={t("Are you sure you want to delete this user?")}
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
          handleSubmitModal={() => handleDeleteUser(record._id)}
        />,
      ],
    },
  ];

  // Handle delete farm
  const handleDeleteFarm = async (id) => {
    const res = await deleteFarmArea(id);
    if (res) {
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
      message.success(t("Delete farm area success!"));
    } else {
      message.error(t("Delete farm area failed!"));
    }
  };

  // Handle delete user
  const handleDeleteUser = async (id) => {
    const res = await deleteUser(id);
    if (res) {
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success(t("Delete user success!"));
    } else {
      message.error(t("Delete user failed!"));
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
      await queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
      message.success(t("Update farm area success!"));
    } else {
      message.error(t("Update farm area failed!"));
    }
  };

  // Handle send notice to area
  const handleSendNotice = async (data, type) => {
    if (data.length === 0) {
      message.warning(
        t("Please select at least one examination to send notice!")
      );
      return;
    }
    const res = await sendManyNoticeToArea({ data, type: type });

    if (res) {
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
      message.success(t("Send notice to area success!"));
      actionRef.current?.clearSelected?.();
      setDataSend([]);
      setDataRows([]);
    } else {
      message.error(t("Send notice to area failed!"));
      actionRef.current?.clearSelected?.();
      setDataSend([]);
      setDataRows([]);
    }
    return true;
  };

  // Handle select row in examination table
  const handleSelectRow = (_, selectedRows) => {
    setDataRows(selectedRows);
    const dataSend = selectedRows.map((item) => {
      const levelWarning =
        item.numberWarning.level <= 4
          ? "Low Level"
          : item.numberWarning.level <= 8
          ? "Moderate Level"
          : item.numberWarning.level <= 13
          ? "High Level"
          : "Severe Level";
      return {
        title: `[${item.farmAreaId.name} Alert] - ${levelWarning}`,
        description: `This is a ${levelWarning} alert for the ${item.farmAreaId.type}`,
        content: contentNotice(item),
        userId: currentUser._id,
        farmAreaId: item.farmAreaId._id,
      };
    });
    setDataSend(dataSend);
  };

  // Handle update user
  const handleUpdateUser = async (id, record) => {
    const userUpdated = {
      username: record.username,
      email: record.email,
      phone: record.phone,
      address: record.address,
    };
    const res = await updateUserProfile(id, userUpdated);
    if (res) {
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success(t("Update user profile success!"));
    } else {
      message.error(t("Update user profile failed!"));
    }
  };

  // Handle create user
  const handleCreateUser = async (values) => {
    values.avatar = values?.avatar
      ? await getBase64(values?.avatar[0]?.originFileObj)
      : null;
    const res = await registerUser(values);
    if (res) {
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success(t("Create user success!"));
    } else {
      message.error(t("Create user failed!"));
    }
    return true;
  };

  // Handle create standard data
  const handleUpdatedStandard = async (values) => {
    const id = standardData.find((item) => item.type === values.typeArea)._id;
    const res = await updateStandardData(values, id);
    const getStandard = await getStandardData();

    if (res) {
      dispatch(setStandardData(getStandard));
      message.success(t("Update standard data success!"));
    } else {
      message.error(t("Update standard data failed!"));
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
          {activeTab === "settings" && <h3>{t("Settings")}</h3>}
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
                density: false,
                densityIcon: (
                  <Tooltip title={t("Density")}>
                    <ColumnHeightOutlined />
                  </Tooltip>
                ),
                search: {
                  placeholder: t("Search"),
                  collapseRender: (_, props) => {
                    return props.searchText;
                  },
                  onSearch: (value) => setSearchNotice(value),
                },
                setting: false,
              },
            }}
          />
        )}
        {activeTab === "users" && (
          <TableComponent
            keyTable="table-users"
            data={dataUsers}
            rowKey={(record) => record._id}
            columns={columnsUsers}
            loading={isLoadingUsersData}
            actionRef={actionRef}
            config={{
              search: false,
              editable: {
                saveText: t("Save"),
                onSave: async (id, record) => {
                  await handleUpdateUser(id, record);
                },
                cancelText: t("Cancel"),
                actionRender: (_, __, dom) => [dom.save, dom.cancel],
              },
              options: {
                reload: false,
                density: false,
                densityIcon: (
                  <Tooltip title={t("Density")}>
                    <ColumnHeightOutlined />
                  </Tooltip>
                ),
                search: {
                  placeholder: t("Search"),
                  collapseRender: (_, props) => {
                    return props.searchText;
                  },
                  onSearch: (value) => setSearchUser(value),
                },
                setting: false,
              },
              toolBarRender: () => [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  onClick={() => setIsOpenDrawerAddUser(true)}
                  type="primary"
                >
                  {t("Add user")}
                </Button>,
              ],
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
                density: false,
                densityIcon: (
                  <Tooltip title={t("Density")}>
                    <ColumnHeightOutlined />
                  </Tooltip>
                ),
                search: {
                  placeholder: t("Search"),
                  collapseRender: (_, props) => {
                    return props.searchText;
                  },
                  onSearch: (value) => setSearchExam(value),
                },
                setting: false,
              },
              toolBarRender: () => [
                <Button
                  key="button"
                  icon={<PlusOutlined />}
                  onClick={() => handleSendNotice(dataSend, "notice")}
                  type="primary"
                >
                  {t("Send notice")}
                </Button>,
                <Button
                  key="button"
                  icon={<MailOutlined />}
                  onClick={() => handleSendNotice(dataRows, "email")}
                  type="primary"
                >
                  {t("Send email")}
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
                reload: false,
                // reload: async () => {
                //   await queryClient.refetchQueries(["farmAreas"]);
                // },
                // reloadIcon: (
                //   <Tooltip title={t("Refresh")}>
                //     <ReloadOutlined />
                //   </Tooltip>
                // ),
                density: false,
                densityIcon: (
                  <Tooltip title={t("Density")}>
                    <ColumnHeightOutlined />
                  </Tooltip>
                ),
                search: {
                  placeholder: t("Search"),
                  collapseRender: (_, props) => {
                    return props.searchText;
                  },
                  onSearch: (value) => setSearchArea(value),
                },
                setting: false,
                // setting: {
                //   settingIcon: (
                //     <Tooltip title={t("Setting")}>
                //       <SettingOutlined />
                //     </Tooltip>
                //   ),
                // },
              },
              // toolBarRender: () => [
              //   <Button
              //     key="button"
              //     icon={<PlusOutlined />}
              //     onClick={() => {
              //       actionRef.current?.reload();
              //     }}
              //     type="primary"
              //   >
              //     {t("Add farm")}
              //   </Button>,
              // ],
            }}
          />
        )}
        {activeTab === "settings" && (
          <div className="settings-component">
            <div className="settings-component-form">
              <FormFillStandardData onFinish={handleUpdatedStandard} />
            </div>
          </div>
        )}
        <div className="right-manager-component"></div>
      </div>
      <DrawerComponent
        title="Add new user"
        open={isOpenDrawerAddUser}
        onOpenChange={setIsOpenDrawerAddUser}
        submitter={{
          searchConfig: {
            submitText: t("Create"),
            resetText: t("Cancel"),
          },
        }}
        onFinish={async (values) => handleCreateUser(values)}
        props={{
          width: "500px",
          wrapClassName: "exam-drawer",
        }}
      >
        <FormFillAddUser />
      </DrawerComponent>
    </div>
  );
};

export default AdminComponent;
