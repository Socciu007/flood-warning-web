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
// import SearchComponent from "../SearchComponent/SearchComponent";
import { Tag } from "antd";
import TableComponent from "../TableComponent/TableComponent";
import {
  getAllArea,
  updateFarmArea,
  deleteFarmArea,
} from "../../services/serviceFarmArea";
import { getListUserPreferred } from "../../services/serviceUser";
import { getExamOfUser } from "../../services/serviceExam";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { message, Tooltip, List, Avatar } from "antd";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import { waitTime } from "../../utils";
import { testAreaFarm } from "../../services/serviceExam";
import FormFillExam from "../ChildrenComponent/FormFillExam";

const DashboardComponent = () => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const [dataAreas, setDataAreas] = useState([]);
  // const [search, setSearch] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  // Get all areas
  const queryClient = useQueryClient();
  const { data: areas, isLoading: isLoadingAreas } = useQuery({
    queryKey: ["areas"],
    queryFn: () => getAllArea(currentUser._id),
  });
  const { data: listUserPreferred } = useQuery({
    queryKey: ["listUserPreferred"],
    queryFn: () =>
      getListUserPreferred(
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
        id: area?._id,
        nameArea: area?.name,
        typeArea: area?.type,
        area: area?.area,
        nameRegion: area?.regionId?.name,
        province: area?.regionId?.province,
        numberWarning: area?.examDetail?.numberWarning?.level || 100,
      }));
      setDataAreas(formattedAreas);
    }
  }, [areas]);
  console.log(areas);

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
      title: "No",
      dataIndex: "index",
      valueType: "indexBorder",
      className: "table-cell",
      width: 48,
      key: "index",
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
      title: t("Status"),
      dataIndex: "numberWarning",
      key: "numberWarning",
      className: "table-cell",
      editable: false,
      render: (_, record) => {
        return record.numberWarning <= 4 ? (
          <Tag color="green">{t("Low")}</Tag>
        ) : record.numberWarning <= 8 ? (
          <Tag color="yellow">{t("Moderate")}</Tag>
        ) : record.numberWarning <= 13 ? (
          <Tag color="volcano">{t("High")}</Tag>
        ) : record.numberWarning <= 21 ? (
          <Tag color="red">{t("Severe")}</Tag>
        ) : (
          "-"
        );
      },
    },
    {
      title: t("Action"),
      valueType: "option",
      className: "table-cell",
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
            <FormFillExam typeArea={record.typeArea} />
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
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["areas"] });
      message.success(t("Update farm area success!"));
    } else {
      message.error(t("Update farm area failed!"));
    }
  };

  // Handle delete farm
  const handleDeleteFarm = async (id) => {
    const res = await deleteFarmArea(id);
    if (res) {
      // Refresh data
      await queryClient.invalidateQueries({ queryKey: ["areas"] });
      message.success(t("Delete farm area success!"));
    } else {
      message.error(t("Delete farm area failed!"));
    }
  };

  // Handle search
  // const handleSearch = async (e) => {
  //   const searchValue = e.target.value;
  //   // setSearch(searchValue);
  //   const filteredAreas = dataAreas.filter((area) =>
  //     Object.values(area).some((value) =>
  //       value?.toString().toLowerCase().includes(searchValue.toLowerCase())
  //       )
  //     );
  //   setDataAreas(filteredAreas);
  // };

  return (
    <div className="dashboard-component">
      <div>
        <div className="dashboard-component-title">
          <h3>{t("Dashboard")}</h3>
          {/* <SearchComponent /> */}
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
          keyTable="table-areas"
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
              reload: false,
              // reload: () => queryClient.invalidateQueries({ queryKey: ["areas"] }),
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
              // search: true,
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
