import { Col, Pagination, Table } from "antd";
import "./CustomTableWithPagination.css";
import TableSkeleton from "../skeleton/TableSkeleton";
import { useEffect, useState } from "react";

const CustomTableWithPagination = (props) => {
  const {
    rowSelection,
    tableDataSource,
    tableColumns,
    tableExpandable,
    locale,
    scroll,
    className,
    // pagination values
    currentPage,
    handlePageChange,
    itemsPerPage,
    totalEntries,
    isLoading
    // loaderr
  } = props;
    
  const [paginationWidth, setPaginationWidth] = useState(0);

  const handleResize = (_, newWidth) => {
    setPaginationWidth(newWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <TableSkeleton length={30} />
      ) : (
        <Table
          showSorterTooltip={false}
          key={currentPage}
          rowSelection={rowSelection}
          className={className}
          dataSource={tableDataSource || []}
          expandable={tableExpandable}
          pagination={false}
          columns={tableColumns}
          locale={locale}
          scroll={{
            ...scroll,
            x: paginationWidth || "100%",
          }}
         
        />
      )}
      <Col className="pagination-wrapper">
        <Pagination
          simple
          // showQuickJumper
          responsive
          showSizeChanger={false}
          pageSize={itemsPerPage || 30}
          current={currentPage}
          onChange={handlePageChange}
          total={totalEntries}
          // onResize= {handleResize}
        />
      </Col>
    </>
  );
};

export default CustomTableWithPagination;
