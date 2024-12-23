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
  FileAddOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Tag, Popover } from "antd";
// import SearchComponent from "../SearchComponent/SearchComponent";
import TableComponent from "../TableComponent/TableComponent";
import {
  getAllFarmAreas,
  updateFarmArea,
  deleteFarmArea,
} from "../../services/serviceFarmArea";
import { getAllUsers } from "../../services/serviceUser";
import { getAllExam } from "../../services/serviceExam";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { message, Tooltip, List, Avatar } from "antd";
import ModalFormComponent from "../ModalFormComponent/ModalFormComponent";
import { waitTime } from "../../utils";
import { testAreaFarm } from "../../services/serviceExam";
import FormFillExam from "../ChildrenComponent/FormFillExam";

const DashboardAdminComponent = () => {
  const { t } = useTranslation();
  const actionRef = useRef();
  const [dataAreas, setDataAreas] = useState([]);
  const [openDetailWarning, setOpenDetailWarning] = useState(false);
  const [dataDetailWarning, setDataDetailWarning] = useState({});
  const [searchArea, setSearchArea] = useState("");
  const [countWarning, setCountWarning] = useState(19);
  const [openModalDetailData, setOpenModalDetailData] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  // Get all areas
  const queryClient = useQueryClient();
  const { data: farmAreas, isLoading: isLoadingAreas } = useQuery({
    queryKey: ["farmAreas"],
    queryFn: () => getAllFarmAreas(),
  });
  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
  });
  const { data: examinations } = useQuery({
    queryKey: ["examinations"],
    queryFn: () => getAllExam(currentUser.accessToken),
  });

  useEffect(() => {
    if (farmAreas) {
      const formattedAreas = farmAreas.data.map((area) => ({
        id: area?._id,
        nameArea: area?.name,
        typeArea: area?.type,
        area: area?.area,
        nameRegion: area?.regionId?.name,
        province: area?.regionId?.province,
        numberWarning: area?.examDetail?.numberWarning?.level || 100,
        detailWarning: area?.examDetail,
      }));
      if (searchArea === "") {
        setDataAreas(formattedAreas);
      } else {
        const cloneData = formattedAreas.filter((area) => {
          return (
            String(area.nameArea)
              .toLowerCase()
              .includes(searchArea.toLowerCase()) ||
            String(area.typeArea)
              .toLowerCase()
              .includes(searchArea.toLowerCase()) ||
            String(area.area)
              .toLowerCase()
              .includes(searchArea.toLowerCase()) ||
            String(area.nameRegion)
              .toLowerCase()
              .includes(searchArea.toLowerCase()) ||
            String(area.province)
              .toLowerCase()
              .includes(searchArea.toLowerCase())
          );
        });
        setDataAreas(cloneData);
      }
    }
  }, [farmAreas, searchArea]);

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
      queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
      setDataDetail(res);
      setOpenModalDetailData(true);
    } else {
      message.error(t("Area forecast failed. Try again later!"));
    }
    return true;
  };

  // Handle show detail warning
  const handleShowDetailWarning = (record) => {
    setDataDetailWarning(record);
    setCountWarning(
      Object.keys(record?.detailWarning?.numberWarning).length - 1
    );
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
      fieldProps: {
        placeholder: t("Type"),
      },
      className: "table-cell",
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
          <h3>
            {t("Detail of alert")} (
            {`${dataDetailWarning?.numberWarning}/${countWarning}`})
          </h3>
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
      await queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
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
      await queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
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
        </div>
        <div className="dashboard-component-header">
          <CardComponent
            title={t("Total users")}
            count={userData?.data?.length || 0}
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
            count={examinations?.length || 0}
            srcImg={iconExam}
            backgroundColor={"#fb6340"}
          />
        </div>
      </div>
      <div className="dashboard-component-table">
        <TableComponent
          keyTable="table-areas-all"
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
              // reload: () => {
              //   queryClient.invalidateQueries({ queryKey: ["farmAreas"] });
              // },
              reloadIcon: (
                <Tooltip title={t("Refresh")}>
                  <ReloadOutlined />
                </Tooltip>
              ),
              density: false,
              search: {
                placeholder: t("Search"),
                collapseRender: (_, props) => {
                  return props.searchText;
                },
                onSearch: (value) => setSearchArea(value),
              },
              setting: false,
            },
          }}
        />
        <div className="right-dashboard-component">
          <div className="right-dashboard-component-title">
            <h3>{t("User list")}</h3>
          </div>
          <div className="right-dashboard-component-list">
            <List
              className="right-dashboard-component-list-item"
              itemLayout="horizontal"
              dataSource={userData?.data}
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
                        src={item?.avatar}
                        style={{ backgroundColor: "#f56a00" }}
                      >
                        {item?.avatar
                          ? null
                          : item?.username?.[0]?.toUpperCase() || "A"}
                      </Avatar>
                    }
                    title={
                      <div className="customer-user-info">
                        <span>
                          {item?.username || item?.email?.split("@")[0]}
                        </span>
                        <span>{item?.email}</span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <ModalFormComponent
        title="Detail of alert"
        open={openModalDetailData}
        submitter={false}
        onCancel={() => setOpenModalDetailData(false)}
        props={{
          width: "fit-content",
          wrapClassName: "exam-modal",
          onCancel: () => setOpenModalDetailData(false),
        }}
      >
        <div className="content-detail-data-content">
          {(dataDetail?.DO || dataDetail?.DO === 0) && (
            <span>DO: {dataDetail?.DO}(mg/l)</span>
          )}
          {(dataDetail?.temperature || dataDetail?.temperature === 0) && (
            <span>Temperature: {dataDetail?.temperature}(°C)</span>
          )}
          {(dataDetail?.pH || dataDetail?.pH === 0) && (
            <span>pH: {dataDetail?.pH}(mg/l)</span>
          )}
          {(dataDetail?.alkalinity || dataDetail?.alkalinity === 0) && (
            <span>Alkalinity: {dataDetail?.alkalinity}(mg/l)</span>
          )}
          {(dataDetail?.ammonia || dataDetail?.ammonia === 0) && (
            <span>Ammonia: {dataDetail?.ammonia}(mg/l)</span>
          )}
          {(dataDetail?.BOD5 || dataDetail?.BOD5 === 0) && (
            <span>BOD5: {dataDetail?.BOD5}(mg/l)</span>
          )}
          {(dataDetail?.COD || dataDetail?.COD === 0) && (
            <span>COD: {dataDetail?.COD}(mg/l)</span>
          )}
          {(dataDetail?.clarity || dataDetail?.clarity === 0) && (
            <span>Clarity: {dataDetail?.clarity}(mg/l)</span>
          )}
          {(dataDetail?.coliform || dataDetail?.coliform === 0) && (
            <span>Coliform: {dataDetail?.coliform}(CFU/100ml)</span>
          )}
          {(dataDetail?.salinity || dataDetail?.salinity === 0) && (
            <span>Salinity: {dataDetail?.salinity}(‰)</span>
          )}
          {(dataDetail?.phosPhat || dataDetail?.phosPhat === 0) && (
            <span>PhosPhat: {dataDetail?.phosPhat}(mg/l)</span>
          )}
          {(dataDetail?.suspendedSolids ||
            dataDetail?.suspendedSolids === 0) && (
            <span>SuspendedSolids: {dataDetail?.suspendedSolids}(mg/l)</span>
          )}
          {(dataDetail?.totalCrom || dataDetail?.totalCrom === 0) && (
            <span>TotalCrom: {dataDetail?.totalCrom}(mg/l)</span>
          )}
          {(dataDetail?.H2S || dataDetail?.H2S === 0) && (
            <span>H2S: {dataDetail?.H2S}(mg/l)</span>
          )}
          {(dataDetail?.CN || dataDetail?.CN === 0) && (
            <span>CN: {dataDetail?.CN}(mg/l)</span>
          )}
          {(dataDetail?.As || dataDetail?.As === 0) && (
            <span>As: {dataDetail?.As}(mg/l)</span>
          )}
          {(dataDetail?.Cd || dataDetail?.Cd === 0) && (
            <span>Cd: {dataDetail?.Cd}(mg/l)</span>
          )}
          {(dataDetail?.Pb || dataDetail?.Pb === 0) && (
            <span>Pb: {dataDetail?.Pb}(mg/l)</span>
          )}
          {(dataDetail?.Cu || dataDetail?.Cu === 0) && (
            <span>Cu: {dataDetail?.Cu}(mg/l)</span>
          )}
          {(dataDetail?.Zn || dataDetail?.Zn === 0) && (
            <span>Zn: {dataDetail?.Zn}(mg/l)</span>
          )}
          {(dataDetail?.Hg || dataDetail?.Hg === 0) && (
            <span>Hg: {dataDetail?.Hg}(mg/l)</span>
          )}
          {(dataDetail?.Mn || dataDetail?.Mn === 0) && (
            <span>Mn: {dataDetail?.Mn}(mg/l)</span>
          )}
          {(dataDetail?.Fe || dataDetail?.Fe === 0) && (
            <span>Fe: {dataDetail?.Fe}(mg/l)</span>
          )}
          {(dataDetail?.Cr6 || dataDetail?.Cr6 === 0) && (
            <span>Cr6+: {dataDetail?.Cr6}(mg/l)</span>
          )}
          {(dataDetail?.F || dataDetail?.F === 0) && (
            <span>F-: {dataDetail?.F}(mg/l)</span>
          )}
          {(dataDetail?.totalPH || dataDetail?.totalPH === 0) && (
            <span>
              Total petroleum hydrocarbons: {dataDetail?.totalPH}(mg/l)
            </span>
          )}
          {(dataDetail?.rainfall || dataDetail?.rainfall === 0) && (
            <span>Rainfall: {dataDetail?.rainfall}(mm/year)</span>
          )}
        </div>
      </ModalFormComponent>
    </div>
  );
};

export default DashboardAdminComponent;
