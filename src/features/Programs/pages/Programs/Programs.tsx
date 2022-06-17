import { Button } from "antd";
import * as React from "react";
import { Link } from "react-router-dom";
import style from "./Programs.module.scss";
export interface ProgramsProps {}

export default function Programs(props: ProgramsProps) {
  return (
    <div className={style.root}>
      <div className={style.header_product_page}>
        <div className={style.label_page}>Programs</div>
        <div className={style.btn_add}>
          <Link
            to={`/Programs/Add`}
            style={{
              textDecoration: "none",
            }}
          >
            <Button
              size="large"
              type="primary"
            >
              Add new program
            </Button>
          </Link>
        </div>
      </div>
      <div className={style.filter_content}>
        {/* <ProductFilter
          onSearchChange={handleSearchChange}
          productType={productType}
          filter={filter}
          onChange={handleFilterChange}
        /> */}
      </div>
      <div className={style.content_page}>
        {/* <ProductTable
          showDrawer={showDrawer}
          setProduct={setProduct}
          filter={filter}
          productType={productType}
        /> */}
      </div>
      <div className={style.pagination_pager}>
        {/* <Pagination
          onChange={onChangePage}
          defaultCurrent={1}
          total={pagination?.totalElement}
        /> */}
      </div>
      {/* <DarwerComponent
        onClose={onClose}
        visible={visible}
        productType={productType}
        filter={filter}
        product={product}
        setProduct={setProduct}
      /> */}
    </div>
  );
}
