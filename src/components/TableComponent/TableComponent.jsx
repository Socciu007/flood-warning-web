import { ProTable } from '@ant-design/pro-table';
import React from 'react';
import './style.scss';

const TableComponent = ({ actionRef, columns, data, loading, config, rowSelection}) => {
  return (
    <div className="table-main">
      <ProTable
        actionRef={actionRef}
        rowKey={(record) => record._id}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        bordered
        loading={loading}
        {...config}
      />
    </div>
  );
};

export default TableComponent;
