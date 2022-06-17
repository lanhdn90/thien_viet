import { Button, Col, Form, Input, Select } from "antd";
import * as React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { useAppSelector,useAppDispatch } from "../../../../app/hooks";
import { ListParams, Program } from "../../../../models";
import { productActions, selectOptions } from "../../../Products/ProductSlice";

export interface MarkFilterProps {
  isReport: boolean;
  filter: ListParams;
  programs: Program[];
  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export default function MarkFilter(props: MarkFilterProps) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { isReport, programs, filter, onChange, onSearchChange } = props;
  const options = useAppSelector(selectOptions);

  const handelSearchChange = (str: string) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      name_like: str,
      _page: 1,
    };
    onSearchChange(newFilter);
  };

  const handleTypeChange = async (value: number) => {
    if (!onChange) return;
    await dispatch(productActions.fetchProgramDetail(value))
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      programsId: value,
    };
    onChange(newFilter);
  };

  const handleSortChange = (value: string | number) => {
    if (!onChange) return;
    let newFilter: ListParams;
    if (isReport) {
      newFilter = {
        ...filter,
        _page: 1,
        result: value !== 2 ? value : 0,
      };
    } else {
      newFilter = {
        ...filter,
        _page: 1,
        typeOfDisplay: value,
      };
    }
    onChange(newFilter);
  };

  const handleClearFilter = () => {
    if (!onChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      typeOfDisplay: undefined,
      result: undefined,
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
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string).includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA!.children as unknown as string)
                  .toLowerCase()
                  .localeCompare(
                    (optionB!.children as unknown as string).toLowerCase()
                  )
              }
            >
              {programs?.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="setup">
            {!isReport ? (
              <Select
                style={{
                  width: "150px",
                }}
                disabled={options ? false : true}
                size="large"
                placeholder="Setup"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase()
                    )
                }
              >
                {options?.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            ) : (
              <Select
                style={{
                  width: "150px",
                }}
                size="large"
                placeholder="Result"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase()
                    )
                }
              >
                <Option key={1} value={2}>Not achieved</Option>
                <Option key={2} value={1}>Achieved</Option>
                <Option key={3} value={99}>Expired</Option>
              </Select>
            )}
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
