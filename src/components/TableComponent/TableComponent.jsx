import { ProTable } from "@ant-design/pro-table";
import React from "react";
import "./style.scss";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";

const TableComponent = ({
  title,
  keyTable,
  actionRef,
  columns,
  data,
  loading,
  config,
  rowSelection,
  rowKey = (record) => record.id,
}) => {
  const { t } = useTranslation();
  return (
    <div className="table-main">
      <ProTable
        headerTitle={title}
        key={keyTable}
        pagination={{
          pageSize: 5,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
          showSizeChanger: false,
        }}
        actionRef={actionRef}
        tableAlertRender={false}
        rowKey={rowKey}
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
