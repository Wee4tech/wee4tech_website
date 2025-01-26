import React, { useEffect, useState } from "react";
import { Checkbox, Col, Divider, Menu } from "antd";
import "./CheckBoxSelect.css";

const CheckBoxSelect = (props) => {
  const { items = [], name, handleChildFieldChange } = props;
  const [selectedOption, setSelectedOption] = useState([]);

  const handleCheckboxChange = (checkedValues) => {
    const checked = checkedValues?.target?.checked;
    const value = checkedValues?.target?.value;
    let selectedArray = [...selectedOption];
    if (checked) {
      selectedArray.push(value);
    } else {
      selectedArray = selectedArray?.filter((item) => item.id !== value.id);
    }
    setSelectedOption(selectedArray);
    let handleArray = [];
    selectedArray?.map((item) => {
      handleArray.push(item?.id);
      return null;
    });
    const inputValues = {
      [name]: handleArray,
    };
    handleChildFieldChange(inputValues);
  };

  useEffect(() => {
    if (items?.length) {
      let selectedArray = [];
      let selected = [];
      items?.map((item) => {
        if (item?.checked) {
          selectedArray.push(item?.id);
          selected.push(item);
        }
        return null;
      });
      const inputValues = {
        [name]: selectedArray,
      };
      handleChildFieldChange(inputValues);
      setSelectedOption(selected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <>
      <Menu style={{ width: "100%", marginTop: "15px" }}>
        <Col style={{ height: "190px", overflow: "auto" }}>
          {items?.map((item, index) => (
            <>
              <Checkbox
                key={item?.id}
                value={item}
                style={{ padding: "0 0 6px 16px" }}
                onChange={handleCheckboxChange}
                checked={
                  selectedOption?.filter((obj) => obj?.id === item?.id)
                    ?.length === 1
                    ? true
                    : false
                }
              >
                {item?.name}
              </Checkbox>
              <Divider key={index} style={{ margin: "10px 0" }} />
            </>
          ))}
        </Col>
      </Menu>
    </>
  );
};

export default CheckBoxSelect;
