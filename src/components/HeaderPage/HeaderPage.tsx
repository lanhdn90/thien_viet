import { Col, Row } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import style from "./HeaderPage.module.scss";
export interface HeaderPageProps {}

export default function HeaderPage(props: HeaderPageProps) {
  return (
    <Row>
      <Col span={6}>right</Col>
      <Col
        span={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to={"Programs"} className={style.link_header}>
          Programs
        </Link>
        <Link to={"Products"} className={style.link_header}>
          Products
        </Link>
        <Link to={"Mark"} className={style.link_header}>
          Mark
        </Link>
        <Link to={"Report"} className={style.link_header}>
          Report
        </Link>
      </Col>
      <Col span={6}>left</Col>
    </Row>
  );
}
