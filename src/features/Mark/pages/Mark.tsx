import Pagination from "antd/es/pagination";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ListParams } from "../../../models";
import MarkFilter from "../components/MarkFilter/MarkFilter";
import StoreTable from "../components/StoreTable/StoreTable";
import { selectPrograms, selectStoreFilter, selectStorePagination, storeActions } from "../StoreSlice";
import style from "./Mark.module.scss";
export interface MarkProps {}

export default function Mark(props: MarkProps) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectStoreFilter);
  const programs = useAppSelector(selectPrograms);
  const pagination = useAppSelector(selectStorePagination);


  React.useEffect(() => {
      dispatch(storeActions.fetchPrograms({}));
  }, [dispatch]);

  React.useEffect(() => {
    if (filter) {
      dispatch(storeActions.fetchStoreList(filter));
    }
  }, [dispatch, filter]);



  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(storeActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(storeActions.setFilter(newFilter));
  };

  const onChangePage = (page: number, pageSize: number | undefined) => {
    if (pagination._limit !== pageSize && pageSize) {
      let limit = pageSize;
      let newPage = page;
      if (pagination.totalElement / pageSize < page) {
        newPage = Math.floor(pagination.totalElement / pageSize);
      }
      dispatch(
        storeActions.setFilter({
          ...filter,
          _page: newPage,
          _limit: limit,
        })
      );
    } else {
      dispatch(
        storeActions.setFilter({
          ...filter,
          _page: page,
        })
      );
    }
  };

  return (
    <div className={style.root}>
      <div className={style.header_product_page}>
        <div className={style.label_page}>Stores</div>
      </div>
      <div className={style.filter_content}>
        <MarkFilter
          onSearchChange={handleSearchChange}
          programs={programs}
          filter={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className={style.content_page}>
        <StoreTable
          programs={programs}
          filter={filter}
        />
      </div>
      <div className={style.pagination_pager}>
        <Pagination
          onChange={onChangePage}
          defaultCurrent={1}
          total={pagination?.totalElement}
        />
      </div>
    </div>
  );
}
