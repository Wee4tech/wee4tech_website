import React, { useEffect, useState } from "react";
import { Col, Input, Pagination, Table, Typography } from "antd";
import moment from 'moment';
import { useLazyGetCarriersReportsQuery } from "../../../apis/reports";

const { Text } = Typography;

const Carriers = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [
    getCustomerOrderReportApi,
    { data: customerOrderReportData, isFetching },
  ] = useLazyGetCarriersReportsQuery();

  useEffect(() => {
    getCustomerOrderReportApi({ UserId: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const data = customerOrderReportData?._lstJobApplied || [];
  const [filteredData, setFilteredData] = useState(data);
  const columns = [
    {
      title: "Name",
      dataIndex: "FullName",
      key: "FullName",
      width: "230px",
      fixed: "left",
      render: (params, record) => {
        return <Col>{params}</Col>;
      },
    },
    {
      title: "Registration Date",
      dataIndex: "CreatedDate",
      key: "CreatedDate",
      width: "230px",
      fixed: "left",
      render: (params, record) => {
        const formattedDate = moment(params).format('DD-MMM-YYYY hh:mm A');
        return <Col>{formattedDate}</Col>;
      },
    },
    {
      title: "Resume",
      // dataIndex: "ResumePath",
      key: "ResumePath",
      width: "250px",
      render: (parmas, record) => {
        console.log("🚀 ~ Carriers ~ record:", record)
        return (
          <Col>
          {record?.DocumentPath && (
      <a
        href={record?.params} 
        target="_blank"
        title="Click to view"
        className="hyper-link" 
        rel="noopener noreferrer"
      >
        <Text>View Resume </Text>
      </a>
    )}
          </Col>
        );
      },
    },
    {
      title: "Skills",
      dataIndex: "Skills",
      key: "Skills",
      width: "250px",
      render: (parmas, record) => {
        return (
          <Col>
            <Text>{parmas}</Text>
          </Col>
        );
      },
    },
    {
      title: "Mobile No",
      dataIndex: "MobileNo",
      key: "MobileNo",
      width: "200px",
      render: (params, record) => {
        return <Col>{params}</Col>;
      },
    },
    {
      title: "EmailId",
      dataIndex: "EmailId",
      key: "EmailId",
      width: "250px",
      render: (params, record) => {
        return (
          <Col style={{ fontWeight: 400 }}>
            <Text>{params} </Text>
          </Col>
        );
      },
    },
    {
      title: "Current Location",
      dataIndex: "CurrentLocation",
      key: "CurrentLocation",
      width: "150px",
      render: (params, record) => {
        return <Col style={{ fontWeight: 400 }}>{params}</Col>;
      },
    },

    {
      title: "Preferred Location",
      dataIndex: "PreferredLocation",
      key: "PreferredLocation",
      width: "280px",
      render: (params, record) => {
        return (
          <Col>
            <Text>{params}</Text>
          </Col>
        );
      },
    },
    {
      title: "Current Company",
      dataIndex: "CurrentCompany",
      key: "CurrentCompany",
      width: "250px",
      render: (parmas, record) => {
        return (
          <Col>
            <Text>{parmas}</Text>
          </Col>
        );
      },
    },
    {
      title: "Total Experience",
      dataIndex: "TotalExp",
      key: "TotalExp",
      width: "250px",
      render: (parmas, record) => {
        return (
          <Col>
            <Text>{parmas}</Text>
          </Col>
        );
      },
    },
    {
      title: "Relevant Experience",
      dataIndex: "RelevantExp",
      key: "RelevantExp",
      width: "250px",
      render: (parmas, record) => {
        return (
          <Col>
            <Text>{parmas}</Text>
          </Col>
        );
      },
    },
    {
      title: "CTC",
      dataIndex: "CTC",
      key: "CTC",
      width: "250px",
      render: (parmas, record) => {
        return (
          <Col>
            <Text>{parmas}</Text>
          </Col>
        );
      },
    },
    {
      title: "Expected CTC",
      dataIndex: "ExpectedCTC",
      key: "ExpectedCTC",
      width: "250px",
      render: (parmas, record) => {
        return (
          <Col>
            <Text>{parmas}</Text>
          </Col>
        );
      },
    },
  ];

  const [pageSize, setPageSize] = useState(25);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  const paginatedData = data?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearchedValue = (value) => {
    setSearchValue(value);
    const filtered = paginatedData?.filter((item) => {
      return (
        item?.FullName?.toLowerCase().includes(value.toLowerCase()) ||
        item?.MobileNo?.includes(value) ||
        item?.EmailId?.toLowerCase().includes(value.toLowerCase())
      );
    });
    
    setFilteredData(filtered);
  };
  return (
    <Col className="SalesReport-wrapper">
      <Text className="heading">Job careers</Text>
      <Col style={{ display: "flex", gap: "1rem" }}>
        <Input
          size={"large"}
          placeholder={"Search by name, mobile no, email"}
          width={"400px"}
          onChange={(e) => handleSearchedValue(e.target.value)}
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
        dataSource={searchValue ? filteredData : paginatedData}
        pagination={false}
        scroll={{ x: "100%" }}
        loading={isFetching}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data?.length}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={["10", "20", "30", "40", "50"]}
      />
    </Col>
  );
};

export default Carriers;
