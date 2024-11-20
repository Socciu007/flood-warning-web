import { Table } from 'antd';
import React from 'react';
import './style.scss';

const TableComponent = ({ tableRef, columns, data }) => {
  return (
    <div className="table-main" ref={tableRef}>
      <Table columns={columns} dataSource={data} scroll={{ x: 'max-content' }} bordered />
    </div>
  );
};

export default TableComponent;
