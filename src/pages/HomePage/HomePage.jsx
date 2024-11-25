import React from "react";
import { PageContainer, ProList } from "@ant-design/pro-components";
import { Typography, Card, Empty } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFarmAreaDetail } from "../../redux/slices/areaSlice.ts";
import { useTranslation } from "react-i18next";
import { getAllRegion, getRegionById } from "../../services/serviceRegion";
import iconPlace from "../../assets/icons/icon-place.svg";
import { convertToSlug } from "../../utils";
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle click item in search list
  const handleClickItem = async (record) => {
    const res = await getRegionById(record.id);
    if (res.data) {
      dispatch(setFarmAreaDetail(res.data[0]));
      navigate(`/area/${convertToSlug(record.area)}/${record.id}`);
    }
  };

  return (
    <div className="home-page">
      <NavbarComponent />
      <PageContainer className="home-container" ghost>
        <div className="home-content">
          <Title level={1} className="home-title">
            {t("Welcome!")}
          </Title>

          <Paragraph className="home-description">
            {t(
              "Together, let's build sustainable aquaculture and save mangroves. Explore now"
            )}
          </Paragraph>

          <Card className="search-container">
            <h3 className="search-title">{t("Explore data on your area.")}</h3>
            <ProList
              search={{
                searchText: t("Search"),
                resetText: t("Reset"),
                className: "search-home",
              }}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={t("No area found!")}
                  />
                ),
              }}
              rowKey="id"
              headerTitle={t("List of areas:")}
              request={async (params = {}) => {
                const { area } = params;
                const dataRes = await getAllRegion();
                const formattedRegions = dataRes.data.map((region) => ({
                  area: `${region.name}, ${region.province}`,
                  id: region._id,
                }));

                // Filter data by search keyword
                const filteredData = area
                  ? formattedRegions.filter((item) =>
                      item.area.toLowerCase().includes(area.toLowerCase())
                    )
                  : formattedRegions;
                return {
                  data: filteredData,
                  success: true,
                  total: filteredData.length,
                };
              }}
              metas={{
                title: {
                  dataIndex: "area",
                  render: (_, record) => <div>{record.area}</div>,
                  fieldProps: {
                    placeholder: t("Search area..."),
                    prefix: <SearchOutlined style={{ color: "#bfbfbf" }} />,
                  },
                },
                avatar: {
                  render: () => (
                    <img
                      height={14}
                      width={14}
                      src={iconPlace}
                      alt="icon-place"
                    />
                  ),
                  search: false,
                },
              }}
              onItem={(record) => {
                return {
                  onClick: async () => await handleClickItem(record),
                };
              }}
              className="search-list"
            />
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};

export default HomePage;
