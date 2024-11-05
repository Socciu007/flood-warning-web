import React from "react";
import { Card, Row, Col, Table, Progress } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const ManagerPage = () => {
  // Data mẫu cho thống kê
  const stats = [
    {
      title: "Tổng người dùng",
      value: "350,897",
      icon: <UserOutlined />,
      color: "bg-danger",
    },
    {
      title: "Doanh thu",
      value: "924",
      icon: <DollarCircleOutlined />,
      color: "bg-warning",
    },
    {
      title: "Đơn hàng",
      value: "49.65%",
      icon: <ShoppingCartOutlined />,
      color: "bg-yellow",
    },
    {
      title: "Hiệu suất",
      value: "60%",
      icon: <BarChartOutlined />,
      color: "bg-info",
    },
  ];

  return (
    <div className="manager-page">
      <div className="header bg-gradient-primary pb-8 pt-5 pt-md-8">
        <div className="container-fluid">
          <div className="header-body">
            <Row gutter={[16, 16]}>
              {stats.map((stat, index) => (
                <Col span={6} key={index}>
                  <Card className="card-stats mb-4 mb-xl-0">
                    <div className="card-body">
                      <Row>
                        <div className="col">
                          <h5 className="card-title text-uppercase text-muted mb-0">
                            {stat.title}
                          </h5>
                          <span className="h2 font-weight-bold mb-0">
                            {stat.value}
                          </span>
                        </div>
                        <Col auto>
                          <div
                            className={`icon icon-shape ${stat.color} text-white rounded-circle shadow`}
                          >
                            {stat.icon}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>

      <div className="container-fluid mt--7">
        <Row gutter={[16, 16]}>
          <Col span={16}>
            <Card title="Thống kê truy cập" className="shadow">
              {/* Thêm biểu đồ ở đây */}
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Thống kê đơn hàng" className="shadow">
              {/* Thêm biểu đồ tròn ở đây */}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ManagerPage;
