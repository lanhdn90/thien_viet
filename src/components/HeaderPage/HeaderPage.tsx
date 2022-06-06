import { Col, Row, Typography } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import style from "./HeaderPage.module.scss";
export interface HeaderPageProps {}

export default function HeaderPage(props: HeaderPageProps) {
  const { Paragraph } = Typography;
  return (
    <Row>
      <Col span={6}>right</Col>
      <Col
        span={12}
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Link to={"Programs"} className={style.link_header}>
          <Row justify="center" align="middle">
            <MdOutlineDashboardCustomize size={20} />
            <span style={{ marginLeft: "5px" }}>Programs</span>
          </Row>
        </Link>
        <Link to={"Products"} className={style.link_header}>
          <Row justify="center" align="middle">
            <MdOutlineDashboardCustomize size={20} />
            <span style={{ marginLeft: "5px" }}>Products</span>
          </Row>
        </Link>
        <Link to={"Mark"} className={style.link_header}>
          <Row justify="center" align="middle">
            <MdOutlineDashboardCustomize size={20} />
            <span style={{ marginLeft: "5px" }}>Mark</span>
          </Row>
        </Link>
        <Link to={"Report"} className={style.link_header}>
          <Row justify="center" align="middle">
            <MdOutlineDashboardCustomize size={20} />
            <span style={{ marginLeft: "5px" }}>Report</span>
          </Row>
        </Link>
      </Col>
      <Col span={6}>left</Col>
    </Row>
  );
}
