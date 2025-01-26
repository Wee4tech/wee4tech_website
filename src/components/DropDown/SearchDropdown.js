import React, { useState } from "react";
import {
  Divider,
  Dropdown,
  Input,
  Menu,
  Typography,
  Checkbox,
  Space,
  Col,
  Button,
} from "antd";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-3.svg";
import { ReactComponent as FilterIcon } from "../../assets/icons/filterIcon.svg";
import { UpArrow } from "../Icons/UpArrow";
import { DownArrow } from "../Icons/DownArrow";
const { Text } = Typography;
const SearchDropdown = ({
  list = [],
  label = "Select",
  placeholder = "placeholder",
  selectedItems = [],
  setSelectedItems,
  handleFilterLibrary = () => {},
  handleFilterSelect = () => {},
  isCustomBorder,
  rightIcon = true,
  leftIcon = false,
  className,
  searchText,
  setSearchText
  
}) => {
  const [visible, setVisible] = useState(false);
  //const [searchText, setSearchText] = useState("");
  //   const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (checkedValues) => {
   
    const checked = checkedValues.target.checked;
    const value = checkedValues.target.value;
    let selectedArray = [...selectedItems];
    if (checked) {
      selectedArray.push(value);
    } else {
      selectedArray = selectedArray?.filter((item) => item.key !== value.key);
     
    }    
    setSelectedItems(selectedArray);
    // console.log("🚀 ~ handleCheckboxChange ~ selectedItems:", selectedItems)
  };
   

  const handleClear = () => {
  
    setSearchText("")
    setSelectedItems([]);
    handleFilterSelect(label);
    setVisible(false);
  };
  const dropDownList = list?.map((element, index) => {
    return {
      //   ...element,
      label: element.brand_name || element.category ||element.name,
      key: element.id,
    };
  });
  // const filteredItems = dropDownList?.filter((item) =>
  
  //   item?.label?.toLowerCase()?.includes(searchText?.toLowerCase())
  // );  
  const filteredItems = dropDownList?.filter((item) => {
    const normalizedSearchText = searchText?.toString()?.toLowerCase() || '';
    return item?.label?.toLowerCase()?.includes(normalizedSearchText);
  });
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const dropdownContent = (
    <Menu  style={{ width: "400px" }}>
      <Col
        style={{
          padding: "5px 10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#0a243f", fontWeight: 500, fontSize: "16px" }}>
          {label}
        </Text>
        <Text
          style={{
            color: "#2973f0",
            fontWeight: 400,
            fontSize: "14px",
            cursor: "pointer",
          }}
          onClick={handleClear}
        >
          CLEAR ALL
        </Text>
      </Col>
      <Menu.Item key="search">
        <Input
          placeholder={placeholder}
          value={searchText}
          onChange={handleSearch}
          suffix={<SearchIcon style={{ width: "16px" }} />}
          style={{ width: "100%", height: "48px", marginBottom: "10px" }}
        />
      </Menu.Item>
      <Col style={{ height: "190px", overflow: "auto" }}>
        {filteredItems?.map((item, index) => (
         
         <React.Fragment key={item.key || index}>
            <Checkbox
              // key={index}
              value={item}
              style={{ padding: "0 0 6px 16px" }}
              checked={
                selectedItems?.filter((obj) => obj.key === item.key)?.length === 1
              }
              onChange={handleCheckboxChange}
            >
              {item?.label}
            </Checkbox>
            {/* {index !== filteredItems?.length - 1 && ( */}
            <Divider 
            // key={index} 
            style={{ margin: "10px 0" }} />
            {/* )} */}
          </React.Fragment>
        ))}
      </Col>
      <Col
        style={{ padding: "5px 10px", display: "flex", justifyContent: "end" }}
      >
        <Button
          type="primary"
          style={{
            background: selectedItems?.length > 0 ? "#0354a3" : "#9da7b2",
          }}
          onClick={() => {
            handleFilterLibrary();
            setVisible(false);
          }}
          disabled={selectedItems?.length > 0 ? false : true}
        >
          Apply
        </Button>
      </Col>
    </Menu>
  );

  return (
    <Col
    className={className}
      style={{
        border:
          selectedItems?.length === 0
            ? "1.5px solid #dedede"
            : "2px solid #0a243f",
        borderRadius: isCustomBorder || "30px",
        height: "46px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Dropdown
        overlay={dropdownContent}
        style={{
          fontWeight: 500,
          color: "#0a243f",
        }}
        trigger={["click"]}
        onVisibleChange={handleVisibleChange}
        visible={visible}
       
      >
        <Space
          style={{
            fontWeight: 500,
            color: "#0a243f",
            // width: "140px",
            cursor: "pointer",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 24px",
          }}
        >
          {leftIcon && <FilterIcon />}
          {`${
            selectedItems?.length === 0 ? placeholder : selectedItems?.map(item => item.label).join(", ")
          }`}
          {rightIcon && <>{visible ? <UpArrow /> : <DownArrow />}</>}
        </Space>
      </Dropdown>
    </Col>
  );
};

export default SearchDropdown;
