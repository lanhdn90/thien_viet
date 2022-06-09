import { Button, Pagination } from "antd";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ListParams, Product } from "../../../models";
import DarwerComponent from "../components/DarwerComponent/DarwerComponent";
import ProductFilter from "../components/ProductFilter/ProductFilter";
import ProductTable from "../components/ProductTable/ProductTable";
import {
  productActions,
  selectProductFilter,
  selectProductPagination,
  selectProductType,
} from "../ProductSlice";
import style from "./Products.module.scss";
export interface ProductsProps {}

export default function Products(props: ProductsProps) {
  const filter = useAppSelector(selectProductFilter);
  const pagination = useAppSelector(selectProductPagination);
  const productType = useAppSelector(selectProductType);
  const dispatch = useAppDispatch();
  const [visible, setVisible] = React.useState(false);
  const [product, setProduct] = React.useState<Product | undefined>();

  React.useEffect(() => {
    if (filter) {
      dispatch(productActions.fetchProductList(filter));
      dispatch(productActions.fetchProductTypeList({}));
    }
  }, [dispatch, filter]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onChangePage = (page: number, pageSize: number | undefined) => {
    if (pagination._limit !== pageSize && pageSize) {
      let limit = pageSize;
      let newPage = page;
      if (pagination.totalElement / pageSize < page) {
        newPage = Math.floor(pagination.totalElement / pageSize);
      }
      dispatch(
        productActions.setFilter({
          ...filter,
          _page: newPage,
          _limit: limit,
        })
      );
    } else {
      dispatch(
        productActions.setFilter({
          ...filter,
          _page: page,
        })
      );
    }
  };

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(productActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(productActions.setFilter(newFilter));
  };

  return (
    <div className={style.root}>
      <div className={style.header_product_page}>
        <div className={style.label_page}>Products</div>
        <div className={style.btn_add}>
          <Button size="large" type="primary" onClick={showDrawer}>
            Add new product
          </Button>
        </div>
      </div>
      <div className={style.filter_content}>
        <ProductFilter
          onSearchChange={handleSearchChange}
          productType={productType}
          filter={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className={style.content_page}>
        <ProductTable
          showDrawer={showDrawer}
          setProduct={setProduct}
          filter={filter}
          productType={productType}
        />
      </div>
      <div className={style.pagination_pager}>
        <Pagination
          onChange={onChangePage}
          defaultCurrent={1}
          total={pagination?.totalElement}
        />
      </div>
      <DarwerComponent
        onClose={onClose}
        visible={visible}
        productType={productType}
        filter={filter}
        product={product}
        setProduct={setProduct}
      />
    </div>
  );
}
