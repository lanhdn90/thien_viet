import { Button, Col, Row } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import ProgramInfo from "../../components/ProgramInfo/ProgramInfo";
import ProgramOption from "../../components/ProgramOption/ProgramOption";
import style from "./AddEditProgram.module.scss";
export interface AddEditProgramProps {}

export default function AddEditProgram(props: AddEditProgramProps) {
  return (
    <Row className={style.root}>
      <Row className={style.label_header_page}>Create New Program</Row>
      <Row className={style.container_page}>
        <Row className={style.content_page}>
          <Col span={12} className={style.content_left}>
            <ProgramInfo />
          </Col>
          <Col span={12} className={style.content_right}>
            <ProgramOption />
          </Col>
        </Row>
        <Row justify="end" align="middle" className={style.footer_page}>
          <Link
            to={`/Programs`}
            style={{
              textDecoration: "none",
            }}
          >
            <Button size="large">Back</Button>
          </Link>
          <Button className={style.btn_save} size="large" type="primary">
            Confirm
          </Button>
        </Row>
      </Row>
    </Row>
  );
}
