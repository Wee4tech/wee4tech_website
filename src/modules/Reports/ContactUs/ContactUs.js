import React, { useEffect, useState } from "react";
import {
  Col,
  // Dropdown,
  // Menu,
  Typography,
} from "antd";
import SearchInput from "../../../components/Input/SearchInputs/SearchInput";
import CustomTableWithPagination from "../../../components/CustomTableWithPagination/CustomTableWithPagination";
import { useLazyGetContactUsReportQuery } from "../../../apis/reports";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";

import {
  dateFormat,
  // onlyDateFormat,
} from "../../../commonFuntions/CommonUtilFunctions";
import { Link } from "react-router-dom";

const { Text } = Typography;
const options = [
  {
    key: 1,
    value: "Export",
    label: "Export",
  },
];

// const dateOptions = [
//   {
//     key: 1,
//     value: "Today",
//     label: "Today",
//   },
//   {
//     key: 2,
//     value: "Yesterday",
//     label: "Yesterday",
//   },
//   {
//     key: 3,
//     value: "last_7_day",
//     label: "Last 7 day",
//   },
//   {
//     key: 4,
//     value: "last_30_day",
//     label: "Last 30 day",
//   },
//   {
//     key: 5,
//     value: "last_60_day",
//     label: "Last 60 day",
//   },
//   {
//     key: 6,
//     value: "Custom",
//     label: "Custom",
//   },
// ];
// const tableDataSource = [
//   {
//     key: 1,
//     BMP: "BENG 1",
//     seller_name: "Sri Venkateshwara hardware and paints",
//     sales_amount: "₹ 2898700",
//   },
//   {
//     key: 2,
//     BMP: "BENG 1",
//     seller_name: "Sri Venkateshwara hardware and paints",
//     sales_amount: "₹ 2898700",
//   },
//   {
//     key: 3,
//     BMP: "BENG 1",
//     seller_name: "Sri Venkateshwara hardware and paints",
//     sales_amount: "₹ 2898700",
//   },
// ];
const ContactUs = () => {
  const [searchedValue, setSearchedValue] = useState({});

  const [currentPage, setCurrentPage] = useState(1);

  const [
    getCustomerOrderReportApi,
    { data: customerOrderReportData, isFetching },
  ] = useLazyGetContactUsReportQuery();

  useEffect(() => {
    getCustomerOrderReportApi({ UserId: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "FirstName",
      key: "FirstName",
      width: "300px",
      fixed: "left",
      render: (params, record) => {
        return <Col style={{ fontWeight: 400 }}>{params}</Col>;
      },
    },
    {
      title: "Mobile No",
      dataIndex: "MobileNo",
      key: "MobileNo",
      width: "200px",
      render: (params, record) => {
        return <Col style={{ fontWeight: 400 }}> {params} </Col>;
      },
    },
    {
      title: "Email Id",
      dataIndex: "EmailId",
      key: "EmailId",
      width: "300px",
      render: (params, record) => {
        return <Col style={{ fontWeight: 400 }}>{params || ""}</Col>;
      },
    },
    {
      title: "Created Date",
      dataIndex: "CreatedDT",
      key: "CreatedDT",
      width: "250px",
      render: (params, record) => {
        return (
          <Col>
            <Text>{params}</Text>
          </Col>
        );
      },
    },
    {
      title: "Message",
      dataIndex: "Message",
      key: "Message",
      width: "250px",
      render: (params, record) => {
        return (
          <Col>
            <Text>{params}</Text>
          </Col>
        );
      },
    },
  ];

  const handlePageChange = async (currPage) => {
    const params = {
      page: currPage,
      ...(searchedValue && { search: searchedValue?.search }),

      // ...(sorterState.rfq_id && { sort_by: sorterState.rfq_id }),
      // ...(sorterState.created_at && { sort_by: sorterState.created_at }),
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
      <Text className="heading">Contact Us</Text>
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
        //   tableExpandable={defaultExpandable}
        // tableDataSource={tableDataSource || []}
        tableDataSource={customerOrderReportData?._lstContactusResModel}
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

export default ContactUs;
