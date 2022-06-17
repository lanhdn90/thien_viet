import { Button, Col, Row } from "antd";
import * as React from "react";
import style from "./ProgramOption.module.scss";
export interface ProgramOptionProps {}

export default function ProgramOption(props: ProgramOptionProps) {
  return (
    <Row className={style.root}>
      <Row className={style.label}>
        <Col className={style.label_left} span={18}>
          <div className={style.brand_label}>2</div>
          <div className={style.content_label}>Options</div>
        </Col>
        <Col className={style.label_right} span={6}>
          <Button className={style.btn_add_option}>
            Add Option
          </Button>
        </Col>
      </Row>
    </Row>
  );
}
