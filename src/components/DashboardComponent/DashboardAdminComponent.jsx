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
  FileExcelOutlined,
  FileWordOutlined,
} from "@ant-design/icons";
import { Tag, Popover, Button } from "antd";
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
import ContentDetailAlert from "../ContentComponent/ContentDetailAlert";
import FormFillExam from "../ChildrenComponent/FormFillExam";
import ContentDetailDataImport from "../ContentComponent/ContentDetailDataImport";
import ContentExport from "../ContentComponent/ContentExport";
import * as XLSX from "xlsx";
import { Document, Packer, Paragraph, TextRun } from "docx";

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
            content={
              <ContentDetailAlert
                dataDetailWarning={dataDetailWarning}
                countWarning={countWarning}
                handleOpenDetailWarning={() => setOpenDetailWarning(false)}
              />
            }
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

  // Handle export alert to excel
  const handleExportAlertToExcel = () => {
    const data = ContentExport(dataDetail);
    const stringArray = data?.split("\n")?.filter((item) => item !== "false");
    const worksheetData = stringArray.map((item) => [item]);
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(
      workbook,
      `alert_${dataDetail?.name
        ?.split("-")[0]
        ?.trim()
        ?.replace(/\s+/g, "_")}.xlsx`
    );
  };

  // Handle export alert to word
  const handleExportAlertToWord = () => {
    const data = ContentExport(dataDetail);
    const stringArray = data.split("\n").filter((item) => item !== "false");
    // Add text from stringArray to document
    const paragraphs = stringArray.map((item, index) => {
      const isFirstLine = index === 0;
      return new Paragraph({
        children: [
          new TextRun({
            text: item,
            bold: isFirstLine, // In đậm nếu là dòng đầu tiên
            size: 26, // Kích thước phông chữ (13px tương đương với 26 half-points)
          }),
        ],
      });
    });

    // Create new document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: paragraphs,
        },
      ],
    });

    // Export file .docx
    Packer.toBlob(doc).then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `alert_${dataDetail?.name
        ?.split("-")[0]
        ?.trim()
        ?.replace(/\s+/g, "_")}.docx`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
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
        <div className="right-dashboard-component-feature">
          <p>{t("Export")}:</p>
          <Tooltip title={t("Export to excel")} style={{ zIndex: 9999 }}>
            <Button type="button" onClick={handleExportAlertToExcel}>
              <FileExcelOutlined style={{ color: "#217346" }} />
            </Button>
          </Tooltip>
          <Tooltip title={t("Export to word")}>
            <Button type="button" onClick={handleExportAlertToWord}>
              <FileWordOutlined style={{ color: "#2B579A" }} />
            </Button>
          </Tooltip>
        </div>
        <ContentDetailDataImport dataDetail={dataDetail} />
      </ModalFormComponent>
    </div>
  );
};

export default DashboardAdminComponent;
