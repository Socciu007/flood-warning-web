import { Table } from "antd";
import React, { useMemo, useState } from "react";
import Loading from "../LoadingComponent/Loading";
import IconDelete from "../../assets/icons/icon-delete.png";
import IconExcel from "../../assets/icons/icon-excel.png";
import { WrapperSelect, WrapperSelectSmall } from "./style";
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
  const newColumnExport = useMemo(() => {
    const newCol = columns?.filter((col) => col.dataIndex !== "action");
    return newCol;
  }, [columns]);
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };

  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };
  const exportExcel = () => {
    const excel = new Excel();
    excel
      .addSheet("test")
      .addColumns(newColumnExport)
      .addDataSource(data, { str2Percent: true })
      .saveAs("export-excel.xlsx");
  };
  return (
    <Loading isLoading={isLoading}>
      {rowSelectedKeys.length > 0 && (
        <WrapperSelect>
          <WrapperSelectSmall onClick={handleDeleteAll}>
            <img src={IconDelete} alt="icon-delete"></img>
            <span>Delete</span>
          </WrapperSelectSmall>
          <WrapperSelectSmall onClick={exportExcel}>
            <img src={IconExcel} alt="icon-excel"></img>
            <span>Export Excel</span>
          </WrapperSelectSmall>
        </WrapperSelect>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </Loading>
  );
};

export default TableComponent;
