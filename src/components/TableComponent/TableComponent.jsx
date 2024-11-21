import { ProTable } from '@ant-design/pro-table';
import React from 'react';
import './style.scss';

const TableComponent = ({ tableRef, columns, data, loading }) => {
  return (
    <div className="table-main" ref={tableRef}>
      <ProTable
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data}
        scroll={{ x: "max-content" }}
        bordered
        loading={loading}
        // editable={{
        //   type: "multiple",
        // }}
      />
    </div>
  );
};

export default TableComponent;
