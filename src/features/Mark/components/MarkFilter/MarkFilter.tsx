import { Button, Col, Form, Input, Select } from "antd";
import * as React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { ListParams, Program } from "../../../../models";

export interface MarkFilterProps {
  filter: ListParams;
  programs: Program[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function MarkFilter(props: MarkFilterProps) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { programs, filter, onChange, onSearchChange } = props;

  const handelSearchChange = (str: string) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: str,
      _page: 1,
    };
    onSearchChange(newFilter);
  };

  const handleTypeChange = (value: number) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      programsId: value,
    };
    onChange(newFilter);
  };

  const handleSortChange = (value: string) => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      typeOfDisplay: value
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      typeOfDisplay: undefined,
      programsId: undefined,
      name_like: undefined,
    };
    onChange(newFilter);
  };

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
          onValuesChange={(changedValues, allValues) => {
            if (changedValues.search) {
              handelSearchChange(changedValues.search);
            }
            if (changedValues.programId) {
              handleTypeChange(changedValues.programId);
            }
            if (changedValues.setup) {
              handleSortChange(changedValues.setup);
            }
          }}
        >
          <Form.Item style={{ width: "50%" }} name="search">
            <Input
              bordered
              size="large"
              placeholder="Search by name"
              suffix={<BiSearchAlt />}
            />
          </Form.Item>
          <Form.Item name="programId">
            <Select
              bordered
              size="large"
              placeholder="Programs"
              style={{ width: "230px" }}
            >
              {programs?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="setup">
            <Select
              style={{
                width: "150px",
              }}
              size="large"
              placeholder="Setup"
            >
              <Option value="Diamond">Diamond</Option>
              <Option value="Gold">Gold</Option>
              <Option value="Silver">Silver</Option>
              <Option value="Bronze">Bronze</Option>
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
            handleClearFilter();
          }}
        >
          CLEAD
        </Button>
      </Col>
    </>
  );
}
