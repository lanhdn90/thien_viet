import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import * as React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { Program, Store } from "../../../../models";
import { convertDataResult, convertProgramsType } from "../../../../utils/common";
import { selectStoreList } from "../../../Mark/StoreSlice";
export interface ReportTableProps {
  programs: Program[];
}

export default function ReportTable(props: ReportTableProps) {
  const stores = useAppSelector(selectStoreList);
  const { programs } = props;

  const columns: ColumnsType<Store> = [
    {
      key: "id",
      width: "5%",
      title: "Id",
      dataIndex: "id",
      ellipsis: true,
    },
    {
      key: "name",
      width: "20%",
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      key: "groupId",
      width: "15%",
      title: "Program",
      dataIndex: "programsId",
      ellipsis: true,
      render: (number: number, record: Store) => (
        <div>{convertProgramsType(number, programs)}</div>
      ),
    },
    {
      key: "typeOfDisplay",
      width: "15%",
      title: "Options",
      dataIndex: "typeOfDisplay",
      ellipsis: true,
    },
    {
      key: "employee",
      width: "15%",
      title: "Employee",
      dataIndex: "employee",
      ellipsis: true,
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      width: "15%",
      render: (number: number, record: Store) => (
        <div>{moment(number).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      title: "Result",
      dataIndex: "result",
      width: "15%",
      render: (value: number, record: Store) => (
        <div>
          {convertDataResult(value)}
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={stores}
        pagination={false}
        scroll={{ y: "calc(100vh - 330px)" }}
        style={{ padding: "20px" }}
      />
    </>
  );
}
