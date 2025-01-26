import React, { useEffect, useState } from "react";
import { Col, Typography } from "antd";
import SearchInput from "../../../components/Input/SearchInputs/SearchInput";
import CustomTableWithPagination from "../../../components/CustomTableWithPagination/CustomTableWithPagination";
import { useLazyGetCarriersReportsQuery } from "../../../apis/reports";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";

const { Text } = Typography;

const Carriers = () => {
  const [searchedValue, setSearchedValue] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  const [
    getCustomerOrderReportApi,
    { data: customerOrderReportData, isFetching },
  ] = useLazyGetCarriersReportsQuery();

  useEffect(() => {
    getCustomerOrderReportApi({ UserId: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      title: "TotalExp",
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
      title: "RelevantExp",
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
      title: "ExpectedCTC",
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
      title: "DocumentPath",
      dataIndex: "ResumePath",
      key: "ResumePath",
      width: "250px",
      render: (parmas, record) => {
        return (
          <Col>
            <a href={parmas} target="_blank" rel="noopener noreferrer">
              <Text>View File</Text>
            </a>
          </Col>
        );
      },
    },
  ];

  const handlePageChange = async (currPage) => {
    const params = {
      page: currPage,
      ...(searchedValue && { search: searchedValue?.search }),
    };
    setCurrentPage(currPage);
    await getCustomerOrderReportApi(params);
  };

  const handleSearchedValue = (params) => {
    setSearchedValue(params);
    setCurrentPage(1);
  };

  return (
    <Col className="SalesReport-wrapper">
      <Text className="heading">Job careers</Text>
      <Col style={{ display: "flex", gap: "1rem" }}>
        <SearchInput
          size={"large"}
          placeholder={"Search by customer name, mobile no, email"}
          width={"400px"}
          getLibraryApi={getCustomerOrderReportApi}
          handleSearchedValue={handleSearchedValue}
          isLoading={isFetching}
        />
      </Col>
      <CustomTableWithPagination
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
          customerOrderReportData?.data?.pagination?.total_entries
        }
      />
    </Col>
  );
};

export default Carriers;
