import React from "react";
import { PageContainer } from "@ant-design/pro-components";
import { Typography, Input, Card, List, Avatar } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import "./style.scss";
import { useTranslation } from "react-i18next";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const HomePage = () => {
  const { t } = useTranslation();
  // Mock data cho danh sách tìm kiếm
  const searchResults = [
    {
      title: "Kết quả 1",
      description: "Mô tả chi tiết về kết quả 1",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=1",
    },
    {
      title: "Kết quả 2",
      description: "Mô tả chi tiết về kết quả 2",
      avatar: "https://xsgames.co/randomusers/avatar.php?g=pixel&key=2",
    },
    // Thêm các kết quả khác...
  ];

  const onSearch = (value) => {
    console.log("Tìm kiếm:", value);
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
            Use these awesome forms to login or create new account in your
            project for free.
          </Paragraph>

          {/* Vùng tìm kiếm và kết quả */}
          <Card className="search-container">
            {/* Phần tìm kiếm */}
            <div className="search-section">
              <Search
                placeholder="Tìm kiếm..."
                allowClear
                prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
                enterButton={t("Search")}
                onSearch={onSearch}
                className="search-input"
              />
            </div>

            {/* Danh sách kết quả tìm kiếm */}
            <div className="search-results">
              <List
                itemLayout="horizontal"
                dataSource={searchResults}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={<a href="#">{item.title}</a>}
                      description={item.description}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
};

export default HomePage;
