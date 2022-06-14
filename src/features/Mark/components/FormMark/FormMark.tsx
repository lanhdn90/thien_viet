import { Button, Form, Select } from "antd";
import * as React from "react";
import { storeApi } from "../../../../api/storeApi";
import { useAppDispatch } from "../../../../app/hooks";
import { ListParams, Store } from "../../../../models";
import { storeActions } from "../../StoreSlice";
import style from "./FormMark.module.scss";
export interface FormMarkProps {
  record: Store;
  filter: ListParams;
  handleVisibleChange: (value: boolean) => void;
}

export default function FormMark(props: FormMarkProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { Option } = Select;
  const { record, filter, handleVisibleChange } = props;

  const editResult = async (values: any) => {
    let newObject = {
      ...record,
      result: values.result,
    };
    await storeApi.update(newObject);
    await dispatch(storeActions.fetchStoreList(filter));
    handleVisibleChange(false);
  };

  return (
    <div className={style.root}>
      <Form
        form={form}
        onFinish={(values) => editResult(values)}
        layout="vertical"
        // hideRequiredMark
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
      >
        <Form.Item
          name="result"
          rules={[{ required: true, message: "Please enter code!" }]}
        >
          <Select
            style={{
              width: "200px",
            }}
            size="large"
            placeholder={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Mark
              </div>
            }
          >
            <Option value={1}>Achieved</Option>
            <Option value={0}>Not achieved</Option>
            <Option value={99}>Expired</Option>
          </Select>
        </Form.Item>
      </Form>
      <div className={style.group_btn}>
        <Button
          onClick={() => {
            handleVisibleChange(false);
            form.resetFields();
          }}
        >
          Cancel
        </Button>
        <Button
          className={style.save_btn}
          type="primary"
          onClick={() => form.submit()}
        >
          Save
        </Button>
      </div>
    </div>
  );
}
