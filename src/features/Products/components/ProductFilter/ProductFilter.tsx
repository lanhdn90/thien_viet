import { Button, Col, Form, Input, Select } from "antd";
import * as React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { ListParams, ProductType } from "../../../../models";

export interface ProductFilterProps {
  filter: ListParams;
  productType: ProductType[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function ProductFilter(props: ProductFilterProps) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { productType, filter, onChange, onSearchChange } = props;

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
      groupId: value,
      //bo qua city khi chon all
      // city: e.target.value || undefined,
    };
    onChange(newFilter);
  };

  const handleSortChange = (value: string) => {
    if (!onChange) return;
    const [_sort, _order] = (value as string).split(".");
    const newFilter: ListParams = {
      ...filter,
      _sort: _sort || undefined,
      _order: (_order as "asc" | "desc") || undefined,
    };
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _sort: undefined,
      _order: undefined,
      _page: 1,
      groupId: undefined,
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
            if (changedValues.product_type) {
              handleTypeChange(changedValues.product_type);
            }
            if (changedValues.sort) {
              handleSortChange(changedValues.sort);
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
          <Form.Item name="product_type">
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
          <Form.Item name="sort">
            <Select
              style={{
                width: "150px",
              }}
              size="large"
              placeholder="Sort"
            >
              <Option value="id.asc">Id Asc</Option>
              <Option value="id.desc">Id Desc</Option>
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
