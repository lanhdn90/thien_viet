import { Button, Drawer, Space } from "antd";
import * as React from "react";
import { ListParams, Store } from "../../../../models";

export interface DarwerStoreProps {
  onClose: () => void;
  visible: boolean;
  filter: ListParams;
  stores: Store | undefined;
  setStores: (object: undefined) => void;
}

export default function DarwerStore(props: DarwerStoreProps) {
  const { stores, setStores, onClose, visible, filter } = props;

  const hiddenDarwer = async () => {
    // await setObjectProduct(undefined);
    // await setProduct(undefined);
    // setLoading(false);
    onClose();
  };
  return (
    <>
      <Drawer
        // title={objectProduct ? "Update product" : "Create a new product"}
        placement={"left"}
        width={420}
        onClose={hiddenDarwer}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={hiddenDarwer}>Cancel</Button>
            <Button
              // onClick={() => form.submit()}
              type="primary"
            >
              Submit
            </Button>
          </Space>
        }
      ></Drawer>
    </>
  );
}
