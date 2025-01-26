import React, { useState } from "react";
import { Col, Dropdown, Input, Menu, Typography } from "antd";
import { ReactComponent as SelectDownIcon } from "../../../assets/icons/downBlackIcon.svg";
import { ReactComponent as SelectUpIcon } from "../../../assets/icons/selectInputUp.svg";
import { ReactComponent as GreenTickIcon } from "../../../assets/icons/greenTick.svg";
import "./InputSelectBeforeTax.css";

const { Text } = Typography;

export const InputSelectBeforeTax = (props) => {
  const {
    value,
    handleBeforeTax,
    handleSave,
    record,
    pricePrefix,
    setPricePrefix,
    selected,
    setSelected,
  } = props;
  const [open, setOpen] = useState(false);
  // const [selected, setSelected] = useState(1);
  const productList = [
    {
      product_name: "Selling Price",
      price: parseFloat(record.vendor_selling_price || 0) || 0,
    },
    {
      product_name: "RFQ",
      price: parseFloat(record.rfq_price || 0) || 0,
    },
  ];
  const handleDropDownValue = (e) => {
    const priceValue = productList[e.key].price;
    const priceString = productList[e.key].product_name;
    setPricePrefix(priceString);
    handleSave("before_tax", "select_tax", priceValue);
    setSelected(parseInt(e.key));
    setOpen(false);
  };
  const dropDownList = productList?.map((element, index) => {
    return { ...element, label: element.product_name, key: index };
  });
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  return (
    <>
      <Dropdown
        className="select-dropdown-before"
        overlay={
          <Menu onClick={(e) => handleDropDownValue(e)}>
            {dropDownList?.map((item, index) => (
              <>
                <Menu.Item
                  key={item?.key}
                  value={item}
                  style={{ padding: "7px 12px" }}
                >
                  <Col className="container-list">
                    <Text className="select-text">
                      {item?.product_name} :{" ₹ "}
                      {item?.price ? Number(item?.price)?.toFixed(2) : 0}
                    </Text>
                    <Text className="select-text" style={{ marginLeft: "4px" }}>
                      {selected === item?.key && <GreenTickIcon />}
                    </Text>
                  </Col>
                </Menu.Item>
              </>
            ))}
          </Menu>
        }
        visible={open}
        onVisibleChange={handleOpenChange}
        style={{ fontWeight: 500, color: "#0a243f" }}
        trigger={["click"]}
      >
        <Input
          className="custom-textarea select-input-before"
          placeholder="Enter item area"
          value={value}
          prefix={
            <Col
              className="before_prefix_container"
              style={{ paddingLeft: pricePrefix ? 0 : "6px" }}
            >
              {pricePrefix !== "" && (
                <>
                  {pricePrefix === "RFQ" ? (
                    <Col className="rp_price_container">
                      <Text className="rp_price_text">RP</Text>
                    </Col>
                  ) : (
                    <Col className="sp_price_container">
                      <Text className="sp_price_text">SP</Text>
                    </Col>
                  )}
                </>
              )}{" "}
              ₹
            </Col>
          }
          suffix={
            open ? (
              <SelectUpIcon onClick={() => setOpen(false)} />
            ) : (
              <SelectDownIcon onClick={() => setOpen(true)} />
            )
          }
          style={{
            border: "1px solid #fff",
            borderRadius: "8px",
            overflowY: "hidden",
            textAlign: "right",
          }}
          onChange={(e) => handleBeforeTax(e)}
          onPressEnter={() => handleSave("before_tax")}
          onBlur={() => handleSave("before_tax")}
        />
      </Dropdown>
    </>
  );
};
