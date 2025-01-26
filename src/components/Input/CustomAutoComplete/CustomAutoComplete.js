import React, { useCallback } from "react";
import { AutoComplete, Input, Avatar, Col, Typography } from "antd";
import "./customAutoComplete.css";
import { debounce } from "lodash";
import { ReactComponent as DefaultIcon } from "../../../assets/icons/default.svg";
import { baseUrl } from "../../../commonUtils/commonUtils";
import TableSkeleton from "../../skeleton/TableSkeleton";

const CustomAutoComplete = ({ api, dataList, sellerTableApi, id,IsAutocompleteFetching, selectedItems = [],  
  setSelectedItems,searchText, setSearchText}) => {
 
  const DropdownFooter = ({ dataList, onSelect }) => {
    return (
      <Col
        style={{
          padding: "8px",
          textAlign: "center",
          boxShadow: "0 -6px 10px 0 rgba(0, 0, 0, 0.1)",
          fontWeight: 500,
          cursor: "pointer",
        }}
        onClick={() => handleSelect(searchText)}
      >
        {`View all results (${dataList?.data?.products?.count || 0})`}
      </Col>
    );
  };

  // const [dataSource, setDataSource] = useState([]);
  // const [selectedValue, setSelectedValue] = useState("");
  const { Text } = Typography;
  const handleTrigger = (params) => {
    api({ params, id });
  };

  const brandList = dataList?.data?.brands;
  const productList = dataList?.data?.products?.data;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchTextDebouncedTrigger = useCallback(
    debounce(handleTrigger, 1000),
    []
  );
  const handleSearch = (value) => {
    setSearchText(value);
    searchTextDebouncedTrigger({
      search: value,
    });
    // setDataSource(options);
  };

  const handleSelect = (value, label, text) => {
    let brandArray = [];

    // brands.map((item) => brandArray.push(item.label));
    if (label === "Brands") {
      brandArray.push(value); // Add the selected brand value to the array
      setSelectedItems(brandArray);
      // console.log("🚀 ~ handleCheckboxChange ~ selectedItems:", selectedItems)
    }
    
    if (label === "Brands") {
      sellerTableApi({
        ...(brandArray.length && { brands: brandArray }),
        page: 1,
      });
      setSearchText(value);
    } else {
      sellerTableApi({ search: value|| text});
      setSearchText(text);
    }
    // setSelectedValue(value);
  };

  /////////////////////////////////////
  const renderTitle = (title, key) => {
    return (
      <span key={key} style={{ fontWeight: 500, fontSize: "14px" }}>
        {title}
      </span>
    );
  };

  const renderItem = (itemList) => {
    if (!Array.isArray(itemList)) {
      return "No Data";
    }

    return itemList?.map((obj, index) => {
      return {
        value: obj?.brand_name || obj?.mob_sku,
        label: (
          <Col
            key={obj?.id}
            style={{
              height: "46px",
              padding: "12px",
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              justifyContent: obj?.status ? "space-between" : "",
            }}
          >
            {!obj?.status && (
              <Avatar
                style={{ height: "30px", width: "28px" }}
                className="styled-avatar"
                shape="square"
                src={`${baseUrl}${obj?.image}`}
                icon={<DefaultIcon width={20} height={20} />}
              />
            )}
            <Text>{obj?.brand_name || obj?.item_name_title}</Text>

            {obj?.status && (
              <Text
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  border:
                    obj?.status === "Fully Added"
                      ? "1px solid #0ea03f"
                      : "1px solid #9da7b2",
                  color: obj?.status === "Fully Added" ? "#0ea03f" : "#9da7b2",
                  padding: "4px",
                  borderRadius: "8px",
                }}
              >
                {obj?.status}
              </Text>
            )}
          </Col>
        ),
      };
    });
  };

  const options = [
    {
      label:
        (brandList?.length >= 1 && renderTitle("Brands", 1)) ||
        "Please type to search data",
      groupId: "Brands",
      options: renderItem(brandList || []) || [],
    },
    {
      label: (productList?.length > 1 && renderTitle("Products", 2)) || "",
      groupId: "Products",
      options: renderItem(productList || []) || [],
    },
    // {
    //   label: renderTitle("Articles"),
    //   options: [renderItem("AntDesign design language", 100000)],
    // },
  ];

  return (
    <AutoComplete
      className="auto-complete"
      style={{
        width: "55%",
        border: "1px solid rgb(222, 222, 222)",
        borderRadius: "8px",
      }}
      onSearch={handleSearch}
      // onSelect={handleSelect(options?.label)}
      onSelect={(value, option) => {
        const selectedLabel = options.find((opt) =>
          opt.options.some((o) => o.value === option.value)
        )?.groupId;
        const selectedText = dataList.data.products.data.find(
          (item) => item.mob_sku === value
        )?.item_name_title;

        handleSelect(value, selectedLabel, selectedText);
      }}
      value={searchText}
      options={options}
      dropdownRender={(menu) => (
        <Col>
       {IsAutocompleteFetching ? <TableSkeleton length={1} />  : (
      <>
        {menu}
        <DropdownFooter dataList={dataList} />
      </>
    )}
  </Col>
        // <Col>
        //   {menu}
        //   <DropdownFooter dataList={dataList} />
        // </Col>
      )}
      loading={IsAutocompleteFetching} 
    >
      <Input
        className="auto-complete-input"
        placeholder={"Search by product name"}
        onPressEnter={() =>  handleSelect("", "", searchText)}
        // width={"400px"}
      />
    </AutoComplete>
  );
};

export default CustomAutoComplete;
