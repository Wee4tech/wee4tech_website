import React, { useEffect, useState } from "react";
import { Col, Input, Pagination, Table, Typography } from "antd";
// import moment from 'moment';
import { useLazyGetDataTracksReportsQuery } from "../../../apis/reports";

const { Text } = Typography;

const DataTracks = () => {
  const [searchValue, setSearchValue] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

  const [
    getCustomerOrderReportApi,
    { data: customerOrderReportData, isFetching },
   
  ] = useLazyGetDataTracksReportsQuery();
  // console.log("🚀 ~ DataTracks ~ customerOrderReportData:", customerOrderReportData)
  useEffect(() => {
    getCustomerOrderReportApi({ UserId: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    const [pageSize, setPageSize] = useState(100);
  
    const handlePageChange = (page, pageSize) => {
      setCurrentPage(page);
      setPageSize(pageSize);
    };
   
  
  
  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
      width: "250px",
      fixed: "left",
      render: (params, record) => {
        return <Col>{params}</Col>;
      },
    },
    {
      title: "Company Number",
      dataIndex: "company_number",
      key: "company_number",
      width: "200px",
      render: (params, record) => {
        return <Col>{params}</Col>;
      },
    },
    {
      title: "Company Status",
      dataIndex: "company_status",
      key: "company_status",
      width: "200px",
      render: (params, record) => {
        return <Col>{params}</Col>;
      },
    },
    {
      title: "Company Type",
      dataIndex: "company_type",
      key: "company_type",
      width: "200px",
      render: (params, record) => {
        return <Col>{params}</Col>;
      },
    },
    {
      title: "Date of Creation",
      dataIndex: "date_of_creation",
      key: "date_of_creation",
      width: "200px",
      render: (params, record) => {
        return <Col>{params}</Col>;
      },
    },
    {
      title: "Registered Office Address",
      dataIndex: "registered_office_address",
      key: "registered_office_address",
      width: "300px",
      render: (params, record) => {
        return (
          <Col>
            {params.address_line_1}, {params.address_line_2}, {params.locality}, {params.postal_code}, {params.country}
          </Col>
        );
      },
    },
    {
      title: "SIC Codes",
      dataIndex: "sic_codes",
      key: "sic_codes",
      width: "250px",
      render: (params, record) => {
        return (
          <Col>
            {params?.join(", ")}
          </Col>
        );
      },
    },
  ];



  
  return (
    <Col className="SalesReport-wrapper">
      <Text className="heading">Data Tracks</Text>
      <Col style={{ display: "flex", gap: "1rem" }}>
        <Input
          size={"large"}
          placeholder={"Search by name, mobile no, email"}
          width={"400px"}
          // onChange={(e) => handleSearchedValue(e.target.value)}
          value={searchValue}
        />
      </Col>
      {/* <CustomTableWithPagination
        className="order-list-table"
        tableDataSource={customerOrderReportData?._lstJobApplied}
        tableColumns={columns}
        locale={{
          emptyText: isFetching ? <TableSkeleton length={10} /> : "",
        }}
        isLoading={customerOrderReportData?.data?.results.length && isFetching}
        scroll={{ x: "100%" }}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        itemsPerPage={30}
        totalEntries={
          !isFetching &&
          customerOrderReportData?._lstJobApplied?.total_entries
        }
      /> */}
      <Table
        columns={columns}
        dataSource={customerOrderReportData?.items}
        pagination={false}
        scroll={{ x: "100%" }}
        loading={isFetching}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={customerOrderReportData?.hits}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["100"]}
      />
    </Col>
  );
};

export default DataTracks;
