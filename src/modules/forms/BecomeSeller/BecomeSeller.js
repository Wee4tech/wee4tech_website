import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Col, Row, Typography } from "antd";
import SearchInput from "../../../components/Input/SearchInputs/SearchInput";

import { dateFormat } from "../../../commonFuntions/CommonUtilFunctions";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import CustomSelect from "../../../components/SelectableDropdown/CustomSelect/CustomSelect";
import CustomTableWithPagination from "../../../components/CustomTableWithPagination/CustomTableWithPagination";
import { useLazyGetBecomeSellerQuery } from "../../../apis/forms";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";
import NoDataFound from "../../../components/EmptyTable/NoDataFound";

const { Text } = Typography;

const BecomeSeller = () => {
  const [searchedValue, setSearchedValue] = useState({});
  const [dateFilter, setDateFilter] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [
    getBecomeSellerApi,
    { data: becomeSellerData, isFetching: isLoading },
  ] = useLazyGetBecomeSellerQuery();

  useEffect(() => {
    getBecomeSellerApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(becomeSellerData, "becomeSellerData");
  const handleChange = (value) => {
    let formattedDate = null;

    switch (value) {
      case "Today":
        formattedDate = dayjs().format("YYYY-MM-DD");
        break;
      case "Yesterday":
        formattedDate = dayjs().subtract(1, "day").format("YYYY-MM-DD");
        break;
      case "last_7_day":
        formattedDate = dayjs().subtract(6, "day").format("YYYY-MM-DD");
        break;
      case "last_30_day":
        formattedDate = dayjs().subtract(29, "day").format("YYYY-MM-DD");
        break;
      case "last_60_day":
        formattedDate = dayjs().subtract(59, "day").format("YYYY-MM-DD");
        break;
      case "Custom":
        formattedDate = "Custom";
        break;
      default:
        break;
    }

    const currentDate = dayjs().format("YYYY-MM-DD");
    if (value !== "Custom" && value !== null) {
      if (value === "clear_date") {
        getBecomeSellerApi({
          ...(searchedValue?.search && { search: searchedValue?.search }),
          page: 1,
        });
      } else {
        getBecomeSellerApi({
          start_date: formattedDate,
          end_date: currentDate,
          ...(searchedValue?.search && { search: searchedValue?.search }),
          page: 1,
        });
      }

      setCurrentPage(1);
    }
    setDateFilter(value);
  };

  const handleChangeRangePicker = (dates, dateStrings) => {
    if (dates && dates?.length === 2) {
      const startDateFormatted = dates[0].format("YYYY-MM-DD");
      const endDateFormatted = dates[1].format("YYYY-MM-DD");
      getBecomeSellerApi({
        start_date: startDateFormatted,
        end_date: endDateFormatted,
        ...(searchedValue?.search && { search: searchedValue?.search }),
        page: 1,
      });
      setCurrentPage(1);
    }
  };
  const handleSearchedValue = (params) => {
    setSearchedValue(params);
    setCurrentPage(1);
  };
  const handlePageChange = async (currPage) => {
    const params = {
      page: currPage,
      ...(searchedValue && { search: searchedValue?.search }),
    };
    setCurrentPage(currPage);
    await getBecomeSellerApi(params);
  };

  const options = [
    {
      key: 1,
      value: "Today",
      label: "Today",
    },
    {
      key: 2,
      value: "Yesterday",
      label: "Yesterday",
    },
    {
      key: 3,
      value: "last_7_day",
      label: "Last 7 day",
    },
    {
      key: 4,
      value: "last_30_day",
      label: "Last 30 day",
    },
    {
      key: 5,
      value: "last_60_day",
      label: "Last 60 day",
    },
    {
      key: 6,
      value: "Custom",
      label: "Custom",
    },
    {
      key: 7,
      value: "clear_date",
      label: (
        <Col style={{ color: "#006644", fontWeight: "500" }}>Clear Date</Col>
      ),
    },
  ];
  const columns = [
    {
      width: "200px",
      fixed: "left",
      flex: 2,
      title: "Date",
      key: 1,
      dataIndex: "created_at",
      render: (params, record) => {
        return <Text>{dateFormat(params)}</Text>;
      },
    },
    {
      flex: 2,
      width: "200px",
      title: "Name",
      key: 2,
      dataIndex: "name",
    },
    {
      // fixed: "left",
      flex: 1,
      title: "Email Id",
      width: "250px",
      key: 3,
      dataIndex: "email",
    },
    {
      // fixed: "left",
      flex: 1,
      title: "Mobile Number",
      width: "150px",

      key: 4,
      dataIndex: "phone_number",
    },
    {
      // fixed: "left",
      flex: 1,
      title: "Comment",
      width: "350px",

      key: 5,
      dataIndex: "message",
    },
  ];

  return (
    <>
      <Col style={{ padding: "2rem" }}>
        <Row>
          <Col className="header-container">
            <Text className="heading">Become a seller</Text>
          </Col>
        </Row>
        <Row className="action-container">
          <Col className="action-sub-container">
            <SearchInput
              size={"large"}
              placeholder={"Search by customer name, mobile no, email"}
              getLibraryApi={getBecomeSellerApi}
              width={"400px"}
              isLoading={isLoading}
              handleSearchedValue={handleSearchedValue}
            />

            <CustomSelect
              placeholder={"Date"}
              width={"150px"}
              options={options}
              handleChange={handleChange}
              value={dateFilter}
            />
            {dateFilter === "Custom" && (
              <DateRangePicker
                onChange={handleChangeRangePicker}
                format={"DD-MMM-YYYY"}
              />
            )}
          </Col>
        </Row>
        <Col>
          <CustomTableWithPagination
            className="order-list-table"
            tableDataSource={becomeSellerData?.data?.results || []}
            tableColumns={columns}
            locale={{
              emptyText: isLoading ? (
                <TableSkeleton length={10} />
              ) : (
                <NoDataFound text={"No sellers found!"} />
              ),
            }}
            scroll={{ x: "100%" }}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            itemsPerPage={30}
            totalEntries={
              !isLoading && becomeSellerData?.data?.pagination?.total_entries
            }
            isLoading={becomeSellerData?.data?.results?.length && isLoading}
          />
        </Col>
      </Col>
    </>
  );
};

export default BecomeSeller;
