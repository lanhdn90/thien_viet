import { Button, Pagination } from "antd";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ListParams } from "../../../models";
import MarkFilter from "../../Mark/components/MarkFilter/MarkFilter";
import StoreTable from "../../Mark/components/StoreTable/StoreTable";
import {
  selectPrograms,
  selectStoreFilterReport,
  selectStorePagination,
  storeActions,
} from "../../Mark/StoreSlice";
import ReportTable from "../components/ReportTable/ReportTable";
import style from "./Report.module.scss";
export interface ReportProps {}

export default function Report(props: ReportProps) {
  const dispatch = useAppDispatch();
  const programs = useAppSelector(selectPrograms);
  const filter = useAppSelector(selectStoreFilterReport);
  const pagination = useAppSelector(selectStorePagination);

  React.useEffect(() => {
    dispatch(storeActions.fetchPrograms({}));
  }, [dispatch]);

  React.useEffect(() => {
    if (filter) {
      dispatch(storeActions.fetchStoreList(filter));
    }
  }, [dispatch, filter]);

  const onChangePage = (page: number, pageSize: number | undefined) => {
    if (pagination?._limit !== pageSize && pageSize && pagination) {
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

  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(storeActions.setFilterWithDebounce(newFilter));
  };

  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(storeActions.setFilterReport(newFilter));
  };

  return (
    <div className={style.root}>
      <div className={style.header_product_page}>
        <div className={style.label_page}>Report</div>
        <div className={style.btn_add}>
          <Button
            size="large"
            type="primary"
            // onClick={showDrawer}
          >
            Export
          </Button>
        </div>
      </div>
      <div className={style.filter_content}>
        <MarkFilter
          isReport={true}
          onSearchChange={handleSearchChange}
          programs={programs}
          filter={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className={style.content_page}>
        <ReportTable programs={programs} />
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
