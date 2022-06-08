import { Button, Col, Form, Input, Select } from "antd";
import * as React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { ProductType } from "../../../../models";

export interface ProductFilterProps {
  productType: ProductType[];
}

export default function ProductFilter(props: ProductFilterProps) {
  const { Option } = Select;
  const [form] = Form.useForm();

  const { productType } = props;
  return (
    <>
      <Col span={21}>
        <Form
          form={form}
          layout="inline"
          style={{
            width: "100%",
          }}
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item style={{ width: "50%" }} name="search">
            <Input
              bordered
              size="large"
              placeholder="Search by name"
              suffix={<BiSearchAlt />}
            />
          </Form.Item>
          <Form.Item name='product_type'>
            <Select
              bordered
              size="large"
              placeholder="Product type"
              style={{ width: "230px" }}
            >
              {productType?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='sort'>
            <Select
              style={{
                width: "150px",
              }}
              size="large"
              placeholder="Sort"
            >
              <Option value="name.asc">Name Asc</Option>
              <Option value="name.desc">Name Desc</Option>
              {/* <Option value="name.asc">Name Asc</Option>
              <Option value="name.desc">Name Desc</Option> */}
            </Select>
          </Form.Item>
        </Form>
      </Col>
      <Col
        span={3}
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button
          size={"large"}
          type="primary"
          ghost
          onClick={() => {
            form.resetFields();
            console.log('Log: ~ file: ProductFilter.tsx ~ line 79 ~ ProductFilter ~ form', form);
          }}
        >
          CLEAD
        </Button>
      </Col>
    </>
  );
}
