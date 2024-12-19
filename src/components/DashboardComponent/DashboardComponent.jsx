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
  FileAddOutlined,
  CloseOutlined,
} from "@ant-design/icons";
// import SearchComponent from "../SearchComponent/SearchComponent";
import { Tag, Popover } from "antd";
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
  const [dataDetailWarning, setDataDetailWarning] = useState(null);
  const [openDetailWarning, setOpenDetailWarning] = useState(false);
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
        detailWarning: area?.examDetail,
      }));
      setDataAreas(formattedAreas);
    }
  }, [areas]);

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
        console.log(record.numberWarning);
        return record.numberWarning < 30 ? (
          <Popover
            key={record.id}
            content={contentDetailWarning}
            arrow={false}
            trigger="click"
            open={openDetailWarning && dataDetailWarning?.id === record.id}
            onOpenChange={handleChangeOpenDetailWarning}
          >
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleShowDetailWarning(record)}
            >
              {record.numberWarning <= 4 ? (
                <Tag color="green">{t("Low")}</Tag>
              ) : record.numberWarning <= 8 ? (
                <Tag color="yellow">{t("Moderate")}</Tag>
              ) : record.numberWarning <= 13 ? (
                <Tag color="volcano">{t("High")}</Tag>
              ) : record.numberWarning <= 21 ? (
                <Tag color="red">{t("Severe")}</Tag>
              ) : (
                "-"
              )}
            </div>
          </Popover>
        ) : (
          <span>-</span>
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
  // Render content detail warning
  const contentDetailWarning = () => {
    return (
      <div className="content-detail-warning">
        <div className="content-detail-warning-title">
          <h3>{t("Warning level")}</h3>
          <CloseOutlined onClick={() => setOpenDetailWarning(false)} />
        </div>
        <div className="content-detail-warning-content">
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isDO === 1 &&
              `• DO: ${dataDetailWarning?.detailWarning?.DO}mg/l Low DO levels can reduce the ability of aquatic species to survive.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isTemperature ===
              1 &&
              `• Temperature: ${dataDetailWarning?.detailWarning?.temperature}°C This temperature condition disrupts the physiology, growth ability and reduces the reproductive ability of aquatic products.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isPH === 1 &&
              `• pH: ${dataDetailWarning?.detailWarning?.pH} Low pH levels can reduce the ability of plants and aquatic animals to absorb nutrients.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isAlkalinity ===
              1 &&
              `• Alkalinity: ${dataDetailWarning?.detailWarning?.alkalinity}mg/l Risk of water acidification.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isAmmonia === 1 &&
              `• Ammonia: ${dataDetailWarning?.detailWarning?.ammonia}mg/l Ammonia levels reduce the quality of aquatic and plant habitats.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isBOD5 === 1 &&
              `• BOD5: ${dataDetailWarning?.detailWarning?.BOD5}mg/l BOD5 levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isCOD === 1 &&
              `• COD: ${dataDetailWarning?.detailWarning?.COD}mg/l COD levels reduce the amount of dissolved oxygen in water and are harmful to aquatic life.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isClarity === 1 &&
              `• Clarity: ${dataDetailWarning?.detailWarning?.clarity}mg/l Sign of pollution, organic waste or bacteria in water, posing a risk of disease outbreak.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isColiform ===
              1 &&
              `• Coliform: ${dataDetailWarning?.detailWarning?.coliform}CFU/100ml There is organic pollution in the aquatic environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isSalinity ===
              1 &&
              `• Salinity: ${dataDetailWarning?.detailWarning?.salinity}‰ Low salinity aquatic environments can affect the ability of aquatic species to sustain life. `}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isPhosPhat ===
              1 &&
              `• Photsphat: ${dataDetailWarning?.detailWarning?.phosPhat}mg/l Pets showing signs of Phosphate toxicity and stress.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning
              ?.isSuspendedSolids === 1 &&
              `• TSS: ${dataDetailWarning?.detailWarning?.suspendedSolids}mg/l TSS levels can reduce water filtration and degrade water quality in aquatic habitats.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isTotalCrom ===
              1 &&
              `• Total Crom: ${dataDetailWarning?.detailWarning?.totalCrom}mg/l There is chromium contamination.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isH2S === 1 &&
              `• H₂S: ${dataDetailWarning?.detailWarning?.H2S}mg/l This level of H₂S can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isCN === 1 &&
              `• CN: ${dataDetailWarning?.detailWarning?.CN} This level of CN can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isAs === 1 &&
              `• As: ${dataDetailWarning?.detailWarning?.As}mg/l This level of As can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isCd === 1 &&
              `• Cd: ${dataDetailWarning?.detailWarning?.Cd}mg/l This level of Cd can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isPb === 1 &&
              `• Pb: ${dataDetailWarning?.detailWarning?.Pb}mg/l This level of Pb can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isCu === 1 &&
              `• Cu: ${dataDetailWarning?.detailWarning?.Cu}mg/l This level of Cu can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isZn === 1 &&
              `• Zn: ${dataDetailWarning?.detailWarning?.Zn}mg/l This level of Zn can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isHg === 1 &&
              `• Hg: ${dataDetailWarning?.detailWarning?.Hg}mg/l This level of Hg can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isMn === 1 &&
              `• Mn: ${dataDetailWarning?.detailWarning?.Mn}mg/l This level of Mn can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isFe === 1 &&
              `• Fe: ${dataDetailWarning?.detailWarning?.Fe}mg/l This level of Fe can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isCr6 === 1 &&
              `• Cr6+: ${dataDetailWarning?.detailWarning?.Cr6}mg/l This level of Cr6+ can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isF === 1 &&
              `• F-: ${dataDetailWarning?.detailWarning?.F}mg/l This level of F- can lead to oxygen deficiency in the environment.`}
          </p>
          <p>
            {dataDetailWarning?.detailWarning?.numberWarning?.isTotalPH === 1 &&
              `• Total petroleum hydrocarbons: ${dataDetailWarning?.detailWarning?.totalPH} This level of Total petroleum hydrocarbons can lead to oxygen deficiency in the environment.`}
          </p>
        </div>
      </div>
    );
  };

  // Handle show detail warning
  const handleShowDetailWarning = (record) => {
    setDataDetailWarning(record);
  };

  // Handle change open detail warning
  const handleChangeOpenDetailWarning = (open) => {
    setOpenDetailWarning(open);
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
