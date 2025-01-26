import React, { useCallback, useEffect, useState } from "react";
import "./SettelmentSearchDropdown.css";
import { Col, Divider, Dropdown, Input, Menu, Typography } from "antd";
// import { ReactComponent as PlusIcon } from "../../../assets/icons/PlusIconTable.svg";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

const SettelmentSearchDropdown = (props) => {
  const { Text } = Typography;
  const {
    size,
    customStyle,
    placeholder,
    width,
    getLibraryApi,
    handleSearchedValue = () => {},
    handleSetSelector = () => {},
    list = [],
    disabled = false,
    // editValue,
    // showModal,
    // editCondition,
    // handleRemoveSelector = () => {},
    defaultValue,
  } = props;
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };
  const dropDownList = list?.map((element, index) => {
    return { ...element, key: index };
  });

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);
  const handleTrigger = (params) => {
    getLibraryApi(params);
    handleSearchedValue(params);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchTextDebouncedTrigger = useCallback(
    debounce(handleTrigger, 1000),
    []
  );
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
  };
  // const handleRemove = () => {
  //   setValue("");
  //   handleRemoveSelector();
  // };
  const handleTargetValue = (item) => {
    handleSetSelector(item);
    setValue(item?.vendor_name);
    setVisible(false);
    // setValue(`${item?.first_name} ${item?.last_name}`);
  };

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
                      <Text className="text-input">{item?.vendor_name}</Text>
                      {/* <Text className="phone-number-input">
                        +91 {item?.phone_number}
                      </Text> */}
                    </Menu.Item>
                    {index !== dropDownList.length - 1 && (
                      <Divider style={{ margin: "5px" }} />
                    )}
                  </>
                ))}
              </>
            )}
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
          defaultValue={defaultValue}
          className={`${customStyle} search-input-style`}
          size={size}
          disabled={disabled}
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          value={value}
          onChange={handleValueChange}
          style={{
            width: width,
          }}
        />
      </Dropdown>
    </>
  );
};

export default SettelmentSearchDropdown;
