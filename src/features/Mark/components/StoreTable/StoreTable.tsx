import { Image, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import * as React from "react";
import { TbEdit } from "react-icons/tb";
import { useAppSelector } from "../../../../app/hooks";
import { ListParams, Program, Store } from "../../../../models";
import { convertProgramsType } from "../../../../utils/common";
import { selectUserInfo } from "../../../Login/authSlice";
import { selectStoreList } from "../../StoreSlice";
import PopoverStore from "../PopoverStore/PopoverStore";
import style from "./StoreTable.module.scss";
export interface StoreTableProps {
  programs: Program[];
  filter: ListParams;
}

export default function StoreTable(props: StoreTableProps) {
  const { programs, filter } = props;
  const stores = useAppSelector(selectStoreList);
  const userInfo = localStorage.getItem("role");

  const columns: ColumnsType<Store> = [
    {
      key: "id",
      width: "5%",
      title: "Id",
      dataIndex: "id",
      ellipsis: true,
    },
    {
      key: "images",
      width: "10%",
      title: "Image",
      dataIndex: "images",
      ellipsis: true,
      align: "center",
      render: (number: string[], record: Store) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image width={50} src={`/${number[0]}`} />
        </div>
      ),
    },
    {
      key: "name",
      width: "15%",
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
      align: "center",
    },

    {
      key: "groupId",
      width: "20%",
      title: "Program",
      dataIndex: "programsId",
      ellipsis: true,
      align: "center",
      render: (number: number, record: Store) => (
        <div>{`${convertProgramsType(number, programs)} - ${
          record.typeOfDisplay
        }`}</div>
      ),
    },
    {
      key: "employee",
      width: "15%",
      title: "Employee",
      dataIndex: "employee",
      ellipsis: true,
      align: "center",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      width: "12%",
      align: "center",
      render: (number: number, record: Store) => (
        <div>{moment(number).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      title: "Result",
      dataIndex: "result",
      width: "15%",
      align: "center",
      render: (value: number, record: Store) =>
        userInfo === "Admin" ? (
          <PopoverStore value={value} record={record} filter={filter} />
        ) : (
          <div className={style.btn_mark}>
            <div
              className={style.content_btn_mark}
              style={{
                backgroundColor:
                  value === 1 ? "#47db38" : value === 0 ? "red" : "#faad14",
              }}
            >
              {value === 1
                ? "Achieved"
                : value === 0
                ? "Not achieved"
                : "--------"}
            </div>
          </div>
        ),
    },
    {
      title: "Action",
      width: "8%",
      align: "center",
      render: (record: Store) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              cursor: "pointer",
              color: "#1890ff",
            }}
            onClick={async () => {
              console.log(
                "Log: ~ file: StoreTable.tsx ~ line 130 ~ onClick={ ~ record",
                record
              );
              //   await setStore(record);
              //   showDrawer();
            }}
          >
            <TbEdit size={20} />
          </div>
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
