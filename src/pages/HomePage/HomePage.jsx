import React from "react";
import { PageContainer, ProList } from "@ant-design/pro-components";
import { Typography, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import "./style.scss";
import { useTranslation } from "react-i18next";
import { getAllRegion, getRegionById } from "../../services/serviceRegion";
import iconPlace from "../../assets/icons/icon-place.svg";
const { Title, Paragraph } = Typography;

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      <NavbarComponent />
      <PageContainer className="home-container" ghost>
        <div className="home-content">
          <Title level={1} className="home-title">
            {t("Welcome!")}
          </Title>

          <Paragraph className="home-description">
            Use these awesome forms to login or create new account in your
            project for free.
          </Paragraph>

          {/* Vùng tìm kiếm và kết quả */}
          <Card className="search-container">
            <h3 className="search-title">{t("Explore data on your area.")}</h3>
            <ProList
              search={{
                searchText: t("Search"),
                resetText: t("Reset"),
                className: "search-home",
              }}
              rowKey="id"
              headerTitle={t("Roster of regions:")}
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
                    placeholder: t("Search region..."),
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
                  onClick: async () => {
                    const dataRes = await getRegionById(record.id);
                    console.log("Clicked item:", dataRes);
                  },
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
