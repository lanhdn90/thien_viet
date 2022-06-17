import { Button, Col, DatePicker, Form, Input, Row, Switch } from "antd";
import * as React from "react";
import style from "./ProgramInfo.module.scss";
export interface ProgramInfoProps {}

export default function ProgramInfo(props: ProgramInfoProps) {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const rangeConfig = {
    rules: [
      {
        type: "array" as const,
        required: true,
        message: "Please select time!",
      },
    ],
  };

  const clickOnSubmit = (values: any) => {
    console.log(
      "Log: ~ file: ProgramInfo.tsx ~ line 20 ~ clickOnSubmit ~ values",
      values
    );
  };

  return (
    <Row className={style.root}>
      <Row className={style.label}>
        <div className={style.brand_label}>1</div>
        <div className={style.content_label}>Program Information</div>
      </Row>
      <Row justify="start">
        <Form
          onFinish={(values) => clickOnSubmit(values)}
          form={form}
          style={{ width: "100%" }}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item
                name="name"
                label="Name:"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item
                name="range-picker"
                label="Range Picker:"
                {...rangeConfig}
              >
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item
                label="Description:"
                name="description"
                // validateStatus="error"
                hasFeedback
                // help="Should have something"
              >
                <Input.TextArea rows={7} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={3}>
              <Form.Item name="active" label="Active:" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Row>
      <Row align="middle" justify="end">
        <Button
          style={{
            marginRight: "10px",
          }}
          onClick={() => form.resetFields()}
        >
          Cleared
        </Button>
        <Button onClick={() => form.submit()} type="primary" htmlType="submit">
          Save
        </Button>
      </Row>
    </Row>
  );
}
