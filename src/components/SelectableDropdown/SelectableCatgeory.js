import React, { useState,useEffect } from "react";
import { Select, Typography } from "antd";
import "./SelectableDropdown.css";
const { Text } = Typography;
const SelectableCatgeory = (props) => {
  const {
    customStyle,
    items,
    // dropdownChangeValue,
    placeholder,
    name,
    handleChildFieldChange,
    item,
    setselectedCategoryOption,
  } = props;
   

  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (value, option) => {
    // console.log("🚀 ~ handleChange ~ value:", value)
    let selectedValue = {};
    item?.options?.map((element) => {
      if (element?.sub__sub_category_id === parseInt(option?.key)) {
        selectedValue = element;
      }
      return null;
    });

    setSelectedOption(value);
    const inputValues = {
      [name]: selectedValue?.category_id,
      sub_category_id: selectedValue?.sub_category_id,
      sub_category_id_2: selectedValue?.sub__sub_category_id,
    };
    const selecteddata = `<span class='txt-bold-cat'>${selectedValue?.sub__sub_category_name}</span> <br/> <span class='txt-sm-cat'>${selectedValue?.category_name} > ${selectedValue?.sub_category_name} > ${selectedValue?.sub__sub_category_name}</span>`;
    setselectedCategoryOption(selecteddata);
    handleChildFieldChange(inputValues);
  };
   useEffect(() => {
    if (item?.value) {    
      setSelectedOption(item?.value[0]);
      if(item?.value[1])
      {
      handleChange(item?.value[0],{key:item?.value[1]});
      }
    }
    // eslint-disable-next-line 
  }, [item?.value]);
  // useEffect(() => {
  //   if (item?.value) {
  //     let selectedValue = {};
  //     item?.options?.map((element) => {
  //       if (element.value === item?.value) {
  //         selectedValue = element;
  //       }
  //       return null;
  //     });
  //     setSelectedOption(selectedValue?.label);
  //     const inputValues = {
  //       [name]: selectedValue?.value,
  //     };

  //     handleChildFieldChange(inputValues);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [item?.value]);
  return (
    <>
      <Select
        showSearch
        className={`${customStyle || "dropdown-style"}`}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        defaultValue={placeholder}
        value={selectedOption}
        disabled={item?.disabled}
      >
        <Select.Option key={name} value="" disabled>
          <Text className="selected-option"> {placeholder}</Text>
        </Select.Option>
        {items?.map((value) => {
          return (
            <Select.Option
              key={value?.sub__sub_category_id}
              value={value?.sub__sub_category_name}
            >
              {value.sub__sub_category_name} {" > "} {value.sub_category_name}{" "}
              {" > "} {value.category_name}
            </Select.Option>
          );
        })}
      </Select>
    </>
  );
};

export default SelectableCatgeory;
