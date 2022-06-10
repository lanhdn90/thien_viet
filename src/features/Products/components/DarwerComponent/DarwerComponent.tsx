import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  notification,
  Row,
  Select,
  Space,
  Upload
} from "antd";
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
  const [fileList, setFileList] = React.useState<UploadFile[]>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const [previewVisible, setPreviewVisible] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewTitle, setPreviewTitle] = React.useState("");

  const [objectProduct, setObjectProduct] = React.useState<any>();

  React.useEffect(() => {
    form.resetFields();
  }, [objectProduct]);

  React.useEffect(() => {
    if (product) {
      (async () => {
        await setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "Images/1.png",
          },
          {
            uid: "-2",
            name: "image.png",
            status: "done",
            url: "Images/2.png",
          },
          {
            uid: "-3",
            name: "image.png",
            status: "done",
            url: "Images/3.png",
          },
          {
            uid: "-4",
            name: "image.png",
            status: "done",
            url: "Images/4.png",
          },
          {
            uid: "-xxx",
            percent: 50,
            name: "image.png",
            status: "uploading",
            url: "Images/5.png",
          },
          {
            uid: "-5",
            name: "image.png",
            status: "error",
          },
        ]);
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

  // const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result as string));
  //   reader.readAsDataURL(img);
  // };

  // const handleChange: UploadProps["onChange"] = async (
  //   info: UploadChangeParam<UploadFile>
  // ) => {
  //   if (info.file.status === "uploading") {
  //     setLoading(true);
  //     return;
  //   }
  //   console.log(
  //     "Log: ~ file: DarwerComponent.tsx ~ line 126 ~ DarwerComponent ~ info.file",
  //     info.fileList
  //   );
  //   console.log(
  //     "Log: ~ file: DarwerComponent.tsx ~ line 126 ~ DarwerComponent ~ info.file",
  //     info.event
  //   );
  //   if (info.file.status === "done") {
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       // setImageUrl(url);
  //     });
  //   }
  // };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(`File ${file.name}. You can only upload JPG/PNG file!`);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error(`File ${file.name}. Image must smaller than 2MB!`);
    }

    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <>
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
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    maxCount={30}
                    multiple
                  >
                    {uploadButton}
                  </Upload>
                </Form.Item>
              ) : (
                <Form.Item
                  name="image"
                  label="Image"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    name="avatar"
                    className="avatar-uploader"
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={30}
                    multiple
                  >
                    {uploadButton}
                  </Upload>
                </Form.Item>
              )}
            </Col>
          </Row>
        </Form>
      </Drawer>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
}
