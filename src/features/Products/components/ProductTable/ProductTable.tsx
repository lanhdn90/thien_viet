import { Button, Image, notification, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { ListParams, Product, ProductType } from "../../../../models";
import { convertProductType } from "../../../../utils/common";
import { productActions, selectProductList } from "../../ProductSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { ProductApi } from "../../../../api/productApi";
export interface ProductTableProps {
  productType: ProductType[];
  filter: ListParams;
  setProduct: (object: Product) => void;
  showDrawer: () => void;
}

export default function ProductTable(props: ProductTableProps) {
  const { productType, filter, setProduct, showDrawer } = props;
  const dispatch = useAppDispatch();
  const productList = useAppSelector(selectProductList);
  // const [Images, setImages] = React.useState<string[]>([
  //   "Images/1.png",
  //   "Images/2.png",
  //   "Images/3.png",
  //   "Images/4.png",
  //   "Images/5.png",
  //   "Images/6.png",
  //   "Images/7.png",
  //   "Images/8.png",
  //   "Images/9.png",
  //   "Images/10.png",
  //   "Images/11.png",
  //   "Images/12.png",
  //   "Images/13.png",
  //   "Images/14.png",
  //   "Images/15.png",
  //   "Images/16.png",
  //   "Images/17.png",
  //   "Images/18.png",
  //   "Images/19.png",
  //   "Images/20.png",
  //   "Images/21.png",
  //   "Images/22.png",
  //   "Images/23.png",
  //   "Images/24.png",
  //   "Images/25.png",
  //   "Images/26.png",
  //   "Images/27.png",
  //   "Images/28.png",
  //   "Images/29.png",
  //   "Images/30.png",
  // ]);
  // const [visible, setVisible] = React.useState(false);
  const openNotificationWithIcon = (type: string, message: string) => {
    if (type === "success" || type === "error")
      notification[type]({ message: message });
    return;
  };

  const deletedProduct = async (id: number) => {
    try {
      await ProductApi.remove(id);
      dispatch(productActions.fetchProductList(filter));
      openNotificationWithIcon("success", "Remove product successfully");
    } catch (error) {
      openNotificationWithIcon("error", "Remove product Failed!");
    }
  };

  const columns: ColumnsType<Product> = [
    {
      key: "id",
      width: "5%",
      title: "Id",
      dataIndex: "id",
      ellipsis: true,
    },
    {
      key: "image",
      width: "10%",
      title: "Image",
      dataIndex: "image",
      ellipsis: true,
      align: "center",
      render: (number: string, record: Product) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            // preview={{ visible: false }}
            width={50}
            src={`/${number}`}
            // onClick={() => setVisible(true)}
          />
        </div>
      ),
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
      width: "15%",
      title: "Type",
      dataIndex: "groupId",
      ellipsis: true,
      render: (number: number, record: Product) => (
        <div>{convertProductType(number, productType)}</div>
      ),
    },
    {
      key: "employee",
      width: "15%",
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
      render: (record: Product) => (
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
              color: "#1890ff",
            }}
            onClick={async () => {
              await setProduct(record);
              showDrawer();
            }}
          >
            <TbEdit size={20} />
          </div>
          <Button
            type="primary"
            size={"small"}
            danger
            icon={<RiDeleteBin5Line size={20} />}
            onClick={() => {
              record.id && deletedProduct(record.id);
            }}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={productList}
        pagination={false}
        scroll={{ y: "calc(100vh - 330px)" }}
        style={{ padding: "20px" }}
      ></Table>
      {/* <div style={{ display: "none" }}>
        <Image.PreviewGroup
          preview={{
            visible,
            onVisibleChange: (vis) => {
              setVisible(vis);
            },
          }}
        >
          {Images.map((item, index) => (
            <Image key={index} src={`/${item}`} />
          ))}
        </Image.PreviewGroup>
      </div> */}
    </>
  );
}
