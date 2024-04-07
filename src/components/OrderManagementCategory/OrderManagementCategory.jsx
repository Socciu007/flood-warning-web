import React from "react";
import "./style.scss";
import TableComponent from "../TableComponent/TableComponent";

const OrderManagementCategory = ({ option }) => {
  const columnOrders = [
    {
      title: "Number Order",
      dataIndex: "orderId",
      ellipsis: true,
    },
    {
      title: "Product",
      dataIndex: "product",
      ellipsis: true,
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
    },
    {
      title: "Delivery",
      dataIndex: "delivery",
      ellipsis: true,
    },
    {
      title: "Paid",
      dataIndex: "paid",
      ellipsis: true,
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
    },
  ];
  const columnReturns = [
    {
      title: "Number Return",
      dataIndex: "returnId",
      ellipsis: true,
    },
    {
      title: "Product",
      dataIndex: "product",
      ellipsis: true,
    },
    {
      title: "Reason Return",
      dataIndex: "returnReason",
    },
    {
      title: "Description Return",
      dataIndex: "returnDescription",
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "Status",
      ellipsis: true,
    },
    {
      title: "Date Return",
      dataIndex: "returnDate",
    },
  ];
  return (
    <div className="layoutOrderManagementCategory">
      {option === "orders" && (
        <div>
          <TableComponent columns={columnOrders} />
        </div>
      )}
      {option === "returns" && (
        <div>
          <div>
            <TableComponent columns={columnReturns} />
          </div>
        </div>
      )}
      {option === "transports" && <div>Transport</div>}
      {option === "reviews" && <div>Review</div>}
    </div>
  );
};

export default OrderManagementCategory;
