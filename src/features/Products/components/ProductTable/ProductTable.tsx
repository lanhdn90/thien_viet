import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import * as React from "react";
import { useAppSelector } from "../../../../app/hooks";
import { Product, ProductType } from "../../../../models";
import { convertProductType } from "../../../../utils/common";
import { selectProductList } from "../../ProductSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
export interface ProductTableProps {
  productType: ProductType[];
}

export default function ProductTable(props: ProductTableProps) {
  const productList = useAppSelector(selectProductList);
  const { productType } = props;

  const columns: ColumnsType<Product> = [
    {
      key: "id",
      width: "5%",
      title: "Id",
      dataIndex: "id",
      ellipsis: true,
    },
    {
      key: "name",
      width: "30%",
      title: "Name",
      dataIndex: "name",
      ellipsis: true,
    },
    {
      key: "groupId",
      width: "20%",
      title: "Type",
      dataIndex: "groupId",
      ellipsis: true,
      render: (number: number, record: Product) => (
        <div>{convertProductType(number, productType)}</div>
      ),
    },
    {
        key: "employee",
        width: "20%",
        title: "Employee",
        dataIndex: "employee",
        ellipsis: true,
      },
    {
      title: "Created time",
      dataIndex: "createdAt",
      width: "15%",
      render: (number: number, record: Product) => (
        <div>{moment(number).format("YYYY-MM-DD")}</div>
      ),
    },
    {
      title: "Action",
      width: "10%",
      align: "center",
      render: () => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "24px",
              height: "24px",
              cursor: "pointer",
              background: "yellow",
              borderRadius: "2px",
            }}
          >
            <TbEdit size={20} />
          </div>
          <Button
            type="primary"
            size={"small"}
            danger
            icon={<RiDeleteBin5Line size={20} />}
          />
        </div>
      ),
    },

    // {
    //   title: "Severity",
    //   dataIndex: "severity",
    //   render: (text: string, record: alarmInfo) => (
    //     <div
    //       className={clsx(style.severity, {
    //         [style.severity_critical]: text.indexOf("CRITICAL") !== -1,
    //         [style.severity_warning]: text.indexOf("WARNING") !== -1,
    //         [style.unack]: !record.acknowledged === true,
    //       })}
    //     >
    //       {text}
    //     </div>
    //   ),
    // },
  ];
  return (
    <Table
      //   rowSelection={{ ...rowSelection }}
      columns={columns}
      dataSource={productList}
      pagination={false}
      scroll={{ y: "calc(100vh - 330px)" }}
      style={{ padding: "20px" }}
    ></Table>
  );
}
