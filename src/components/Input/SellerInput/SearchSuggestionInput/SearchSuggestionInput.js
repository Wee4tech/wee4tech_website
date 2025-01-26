import React, { useCallback, useEffect, useState } from "react";
import "./SearchSuggestionInput.css";
import { Col, Divider, Dropdown, Input, Menu, Typography } from "antd";
import { ReactComponent as PlusIcon } from "../../../../assets/icons/PlusIconTable.svg";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

const SearchSuggestionInput = (props) => {
  const { Text } = Typography;
  const {
    size,
    customStyle,
    placeholder,
    width,
    getLibraryApi,
    handleSearchedValue = () => {},
     // eslint-disable-next-line
    handleSetSelector = () => {},
    // eslint-disable-next-line
    addressApi = () => {},
    list = [],
    disabled = false,
    editValue,
    showModal,
    // editCondition,
    handleRemoveSelector = () => {},
    handleInputChange=()=>{},
    setaddCustName,
    setaddCustMobileNo,
    setaddCustEmail,
    setaddCustGSTIN,
    value,
    setValue,
  } = props;


  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const dropDownList = list?.map((element, index) => {
    return { ...element, key: index };
  });

  useEffect(() => {
    if (editValue) {
      setValue(editValue);
    }
    // eslint-disable-next-line 
  }, [editValue]);
  const handleTrigger = (params) => {  
    getLibraryApi(params);
    handleSearchedValue(params);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchTextDebouncedTrigger = useCallback(
    debounce(handleTrigger, 1000),
    []
  );
  const handleFocus = () => {
    setVisible(true);
  };
  const handleValueChange = (event) => {
    const targetValue = event.target.value;
    setValue(targetValue);
    if (targetValue === "") {
      getLibraryApi();
    }
    if (targetValue.length > 3) {
      searchTextDebouncedTrigger({
        search: targetValue,
      });
    }
    handleInputChange("Name", event.target.value)
  };
  const handleRemove = () => {
    setValue("");
    handleRemoveSelector();
  };
  const handleTargetValue = (item) => {
  console.log("🚀 ~ handleTargetValue ~ item:", item)


    handleSetSelector(item);
    setValue(item?.name);
    addressApi(item);
    setVisible(false);
    setaddCustName(item?.name)
    setaddCustMobileNo(item?.phone_number)
    setaddCustEmail(item?.email)
    setaddCustGSTIN(item?.gst_number)
    // setValue(`${item?.first_name} ${item?.last_name}`);
  };

  const handleOpenModal = () => {
    setVisible(false);
    showModal();
  };
  const handleNon = () => {};
  const OverLayComponent = () => {
    return (
      <>
        <Menu
        //  onClick={(e) => handleTargetValue(e)}
        >
          <Col className="list-container">
            {dropDownList?.length === 0 ? (
              <>
                <Col className="no-data-container">
                  <Text className="no-data-text">No Data</Text>
                </Col>
              </>
            ) : (
              <>
                {dropDownList?.map((item, index) => (
                  <>
                    <Menu.Item
                      className="selected-menu-list"
                      key={item?.key}
                      value={item}
                      style={{ padding: "7px 12px" }}
                      onClick={() => handleTargetValue(item)}
                    >
                      <Text className="text-input">{item?.name}</Text>
                      <Text className="phone-number-input">
                        +91 {item?.phone_number}
                      </Text>
                    </Menu.Item>
                    {index !== dropDownList.length - 1 && (
                      <Divider style={{ margin: "5px" }} />
                    )}
                  </>
                ))}
              </>
            )}
          </Col>
          <Divider style={{ margin: "5px", height: "3px" }} />
          <Col
            onClick={() => handleOpenModal()}
            className="footer-search-input-container"
          >
            <PlusIcon height={"25px"} width={"25px"} />
            ADD NEW CUSTOMER
          </Col>
        </Menu>
      </>
    );
  };

  return (
    <>
      <Dropdown
        overlay={<OverLayComponent />}
        style={{ fontWeight: 500, color: "#0a243f" }}
        trigger={["click"]}
        disabled={disabled}
        onVisibleChange={handleVisibleChange}
        visible={visible}
      >
        <Input
          className={`${customStyle} search-input-style`}
          size={size}
          disabled={disabled}
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          suffix={
            <>
              <Text
                className="remove-value"
                style={{ cursor: disabled ? "not-allowed" : "pointer" }}
                onClick={() => (disabled ? handleNon() : handleRemove())}
              >
                Remove
              </Text>
            </>
          }
          value={value}
          onChange={handleValueChange}
          style={{
            width: width,
          }}    
          onKeyDown={handleFocus}    
        />
      </Dropdown>
    </>
  );
};

export default SearchSuggestionInput;
