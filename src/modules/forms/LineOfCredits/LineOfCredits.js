import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

import { Col, Row, Typography } from "antd";
import SearchInput from "../../../components/Input/SearchInputs/SearchInput";
import { LoadingOutlined } from "@ant-design/icons";

import {
  dateFormat,
  handlePdfDownload,
} from "../../../commonFuntions/CommonUtilFunctions";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import CustomSelect from "../../../components/SelectableDropdown/CustomSelect/CustomSelect";
import CustomTableWithPagination from "../../../components/CustomTableWithPagination/CustomTableWithPagination";
import {
  useLazyGetLineofCreditExcelQuery,
  useLazyGetLineofCreditQuery,
} from "../../../apis/forms";
import TableSkeleton from "../../../components/skeleton/TableSkeleton";
import NoDataFound from "../../../components/EmptyTable/NoDataFound";
import { Link } from "react-router-dom";

const { Text } = Typography;

const LineOfCredits = () => {
  const [searchedValue, setSearchedValue] = useState({});
  const [dateFilter, setDateFilter] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [dateSearch, setDateSearch] = useState({
    start_date: "",
    end_date: "",
  });
  const [
    getLineofCreditApi,
    { data: lineOfCreditData, isFetching: isLoading },
  ] = useLazyGetLineofCreditQuery();
  const [excelApi, { isFetching: exlLoading, data: excelApiData }] =
    useLazyGetLineofCreditExcelQuery();
  console.log(
    "🚀 ~ file: LineOfCredits.js:36 ~ LineOfCredits ~ excelApiData:",
    excelApiData
  );
  useEffect(() => {
    getLineofCreditApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        getLineofCreditApi({
          ...(searchedValue?.search && { search: searchedValue?.search }),
          page: 1,
        });
        setDateSearch({
          start_date: "",
          end_date: "",
        });
      } else {
        getLineofCreditApi({
          start_date: formattedDate,
          end_date: currentDate,
          ...(searchedValue?.search && { search: searchedValue?.search }),
          page: 1,
        });
        setDateSearch({
          start_date: formattedDate,
          end_date: currentDate,
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
      getLineofCreditApi({
        start_date: startDateFormatted,
        end_date: endDateFormatted,
        ...(searchedValue?.search && { search: searchedValue?.search }),
        page: 1,
      });
      setDateSearch({
        start_date: startDateFormatted,
        end_date: endDateFormatted,
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
    await getLineofCreditApi(params);
  };
  const exportOptions = [
    {
      key: 1,
      value: "Excel",
      label: "Excel",
    },
  ];
  const handleExportApi = async () => {
    let response = await excelApi({
      ...(searchedValue.search && { search: searchedValue.search }),
      ...(dateSearch.start_date && { start_date: dateSearch.start_date }),
      ...(dateSearch.end_date && { end_date: dateSearch.end_date }),
    });

    if (response?.status === "fulfilled") {
      handlePdfDownload(response?.data?.data?.url);
    }

    // excelApi();
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
      // fixed: "left",
      flex: 1,
      title: "Business Mobile (For OTP)",
      width: "250px",
      key: 2,
      dataIndex: "phone_number",
      render: (params, record) => {
        return (
          <Link
            to={`/admin/customer/customerDetails/${record?.phone_number}`}
            target="_blank"
            style={{ fontWeight: 500, color: "#2973f0", cursor: "pointer" }}
          >
            {params}
          </Link>
        );
      },
    },
    // {
    //   flex: 2,
    //   width: "200px",
    //   title: "Name",
    //   key: 2,
    //   dataIndex: "name",
    // },
    {
      // fixed: "left",
      flex: 1,
      title: "Business name",
      width: "250px",
      key: 3,
      dataIndex: "business_name",
    },

    {
      // fixed: "left",
      flex: 1,
      title: "Profession",
      width: "200px",
      key: 4,
      dataIndex: "what_defines",
    },
    // {
    //   // fixed: "left",
    //   flex: 1,
    //   title: "Comment",
    //   width: "350px",

    //   key: 7,
    //   dataIndex: "comment",
    // },
    {
      // fixed: "left",
      flex: 1,
      title: "GSTIN",
      width: "200px",

      key: 5,
      dataIndex: "gst",
    },
  ];

  return (
    <>
      <Col style={{ padding: "2rem" }}>
        <Row>
          <Col className="header-container">
            <Text className="heading">Line of credits</Text>
          </Col>
        </Row>
        <Row className="action-container">
          <Col className="action-sub-container">
            <SearchInput
              size={"large"}
              placeholder={"Search by customer name, mobile no, email"}
              getLibraryApi={getLineofCreditApi}
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
            <CustomSelect
              placeholder={"Export"}
              width={"150px"}
              options={exportOptions}
              handleChange={handleExportApi}
              value={exlLoading ? <LoadingOutlined /> : "Export"}
              disabled={exlLoading ? true : false}
              loading={exlLoading}
            />
          </Col>
        </Row>
        <Col>
          <CustomTableWithPagination
            className="order-list-table"
            tableDataSource={lineOfCreditData?.data?.results || []}
            tableColumns={columns}
            locale={{
              emptyText: isLoading ? (
                <TableSkeleton length={10} />
              ) : (
                <NoDataFound text={"No line of credits found!"} />
              ),
            }}
            scroll={{ x: "100%" }}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            itemsPerPage={30}
            totalEntries={
              !isLoading && lineOfCreditData?.data?.pagination?.total_entries
            }
            isLoading={lineOfCreditData?.data?.results?.length && isLoading}
          />
        </Col>
      </Col>
    </>
  );
};

export default LineOfCredits;
