import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  notification,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import * as React from "react";
import { ProductApi } from "../../../../api/productApi";
import { useAppDispatch } from "../../../../app/hooks";
import { ListParams, Product, ProductType } from "../../../../models";
import { productActions } from "../../ProductSlice";

export interface DarwerComponentProps {
  onClose: () => void;
  visible: boolean;
  productType: ProductType[];
  filter: ListParams;
  product: Product | undefined;
  setProduct: (object: undefined) => void;
}

export default function DarwerComponent(props: DarwerComponentProps) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { product, setProduct, onClose, visible, productType, filter } = props;
  const [fileList, setFileList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string | undefined>();

  const [objectProduct, setObjectProduct] = React.useState<any>();

  React.useEffect(() => {
    form.resetFields();
  }, [objectProduct]);

  React.useEffect(() => {
    if (product) {
      (async () => {
        await setImageUrl(product.image);
        await setObjectProduct({
          name: product.name,
          id: product.id,
          groupId: product.groupId,
        });
      })();
    }
  }, [product]);

  const openNotificationWithIcon = (type: string, message: string) => {
    if (type === "success" || type === "error")
      notification[type]({ message: message });
    return;
  };

  const clickOnSubmit = async (value: any) => {
    try {
      if (objectProduct) {
        let object = {
          id: objectProduct.id,
          name: value.name.toString(),
          groupId: parseInt(value.groupId),
          image: "Images/nodata.png",
        };
        await ProductApi.update(object);
        openNotificationWithIcon("success", "Update product successfully");
      } else {
        let object = {
          name: value.name.toString(),
          groupId: parseInt(value.groupId),
          image: "Images/nodata.png",
        };
        await ProductApi.add(object);
        openNotificationWithIcon("success", "Add product successfully");
      }
      dispatch(productActions.fetchProductList(filter));
    } catch (error) {
      if (objectProduct) {
        openNotificationWithIcon("error", "Update product Failed!");
      } else {
        openNotificationWithIcon("error", "Add product Failed!");
      }
    }
    hiddenDarwer();
  };

  const hiddenDarwer = async () => {
    await setImageUrl(undefined);
    await setObjectProduct(undefined);
    await setProduct(undefined);
    setLoading(false);
    onClose();
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const handleChange: UploadProps["onChange"] = async (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Drawer
      title={objectProduct ? "Update product" : "Create a new product"}
      placement={"left"}
      width={420}
      onClose={hiddenDarwer}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
      extra={
        <Space>
          <Button onClick={hiddenDarwer}>Cancel</Button>
          <Button onClick={() => form.submit()} type="primary">
            Submit
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        hideRequiredMark
        onFinish={(values) => clickOnSubmit(values)}
        initialValues={objectProduct ? objectProduct : {}}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter user name" }]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="groupId"
              label="Group"
              rules={[{ required: true, message: "Please select an group" }]}
            >
              <Select bordered placeholder="Product type">
                {productType?.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            {!objectProduct ? (
              <Form.Item
                name="image"
                label="Image"
                getValueFromEvent={normFile}
                valuePropName="fileList"
                rules={[
                  {
                    required: true,
                    message: "Please choose an image!",
                  },
                ]}
              >
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            ) : (
              <Form.Item name="image" label="Image">
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  name="avatar"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            )}
          </Col>
        </Row>
      </Form>
    </Drawer>
  );
}
