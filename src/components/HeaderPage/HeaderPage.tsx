import { Col, Row } from "antd";
import * as React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";
import style from "./HeaderPage.module.scss";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { SiProducthunt } from "react-icons/si";
import { useAppDispatch } from "../../app/hooks";
import { authActions } from "../../features/Login/authSlice";
import { LoginOutlined, UserOutlined } from "@ant-design/icons";

export interface HeaderPageProps {}

export default function HeaderPage(props: HeaderPageProps) {
  const dispatch = useAppDispatch();

  return (
    <Row>
      <Col span={6} className={style.left_header}>
      <div className={style.image_company}></div>
      </Col>
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
            <SiProducthunt size={20} />
            <span style={{ marginLeft: "5px" }}>Products</span>
          </Row>
        </Link>
        <Link to={"Mark"} className={style.link_header}>
          <Row justify="center" align="middle">
            <BsFillJournalBookmarkFill size={18} />
            <span style={{ marginLeft: "5px" }}>Mark</span>
          </Row>
        </Link>
        <Link to={"Report"} className={style.link_header}>
          <Row justify="center" align="middle">
            <HiOutlineDocumentReport size={20} />
            <span style={{ marginLeft: "5px" }}>Report</span>
          </Row>
        </Link>
      </Col>
      <Col span={6} className={style.right_header}>
        <div className={style.iconMenu}>
          <FaUserCircle size={25} />
          <div className={style.dropdown_user_info}>
            <div className={style.dropdown_arrow}></div>
            <div
              className={style.item_user_info}
              // onClick={() => setIsShowModal(1)}
            >
              <UserOutlined />
              <div>Profile</div>
            </div>
            <div
              className={style.item_user_info}
              onClick={() => dispatch(authActions.logout())}
            >
              <LoginOutlined />
              <div>Sign out</div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
