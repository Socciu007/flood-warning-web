import { Menu } from "antd";
import React, { useState } from "react";
import { getItem } from "../../utils";
import { UserOutlined, AppstoreOutlined } from "@ant-design/icons";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import refundIcon from "../../assets/icons/icon-refund.png";
import reviewIcon from "../../assets/icons/icon-review.png";
import voucherIcon from "../../assets/icons/icon-voucher.png";
import ReturnPage from "../ReturnPage/ReturnPage";

const AdminPage = () => {
  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <ReturnPage />;
      case "review":
        return <AdminProduct />;
      case "voucher":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };
  const items = [
    getItem("Quản lý người dùng", "user", <UserOutlined />),
    getItem("Quản lý sản phẩm", "product", <AppstoreOutlined />),
    getItem(
      "Quản lý đơn hàng",
      "order",
      <img src={refundIcon} alt="icon-refund" style={{ width: 14 }} />
    ),
    // getItem(
    //   "Quản lý đánh giá",
    //   "review",
    //   <img src={reviewIcon} alt="icon-review" style={{ width: 14 }} />
    // ),
    // getItem(
    //   "Quản lý khuyến mãi",
    //   "voucher",
    //   <img src={voucherIcon} alt="icon-voucher" style={{ width: 14 }} />
    // ),
  ];
  // const rootSubmenuKeys = ["user", "product"];
  const [keySelected, setKeySelected] = useState("");

  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          onClick={handleOnClick}
          style={{
            width: "256px",
            boxShadow: "1px 1px 3px #ccc",
          }}
          items={items}
        />
        <div style={{ flex: 1, padding: "15px" }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  );
};

export default AdminPage;
