import { ProTable } from "@ant-design/pro-table";
import React from "react";
import "./style.scss";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";

const TableComponent = ({
  keyTable,
  actionRef,
  columns,
  data,
  loading,
  config,
  rowSelection,
}) => {
  const { t } = useTranslation();
  return (
    <div className="table-main">
      <ProTable
        key={keyTable}
        pagination={{
          pageSize: 10,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        actionRef={actionRef}
        rowKey={(record) => record.id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        bordered
        loading={loading}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={t("No data found!")}
            />
          ),
        }}
        {...config}
      />
    </div>
  );
};

export default TableComponent;
