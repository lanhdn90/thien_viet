import Layout, { Header } from "antd/lib/layout/layout";
import * as React from "react";
import { Outlet } from "react-router-dom";
import HeaderPage from "../HeaderPage/HeaderPage";
import style from "./LayoutComponent.module.scss";
export interface LayoutComponentProps {}

export default function LayoutComponent(props: LayoutComponentProps) {
  return (
    <Layout className={style.root}>
      <Header className={style.header}>
        <HeaderPage />
      </Header>
      <Outlet />
    </Layout>
  );
}
