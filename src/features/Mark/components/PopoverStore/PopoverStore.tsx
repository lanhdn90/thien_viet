import { Popover } from "antd";
import * as React from "react";
import { ListParams, Store } from "../../../../models";
import FormMark from "../FormMark/FormMark";
import style from "./PopoverStore.module.scss";
export interface PopoverStoreProps {
  value: number;
  record: Store;
  filter: ListParams;
}

export default function PopoverStore(props: PopoverStoreProps) {
  const { value, record, filter } = props;
  const [visible, setVisible] = React.useState<boolean>(false);

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible);
  };

  return (
    <Popover
      content={
        <FormMark
          handleVisibleChange={handleVisibleChange}
          filter={filter}
          record={record}
        />
      }
      title={<div className={style.header_Popover}>Mark</div>}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <div className={style.btn_mark}>
        <div
          className={style.content_btn_mark}
          style={{
            backgroundColor:
              value === 1 ? "#47db38" : value === 0 ? "red" : "#faad14",
          }}
        >
          {value === 1 ? "Achieved" : value === 0 ? "Not achieved" : "--------"}
        </div>
      </div>
    </Popover>
  );
}
