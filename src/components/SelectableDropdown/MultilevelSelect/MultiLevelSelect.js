import React, { useEffect, useState } from "react";
import { Col, Form, Select } from "antd";
import "./MultiLevelSelect.css";
const { Option } = Select;

const MultiLevelSelect = (props) => {
  const {
    customStyle,
    items,
    // dropdownChangeValue,
    placeholder,
    name,
    handleChildFieldChange,
    item,
  } = props;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory1, setSelectedSubCategory1] = useState(null);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState(null);
  const itemValue = item?.value[0];

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory1(null);
    setSelectedSubCategory2(null);
    const inputValues = {
      [name]: value,
      sub_category_id: null,
      sub_category_id_2: null,
    };
    handleChildFieldChange(inputValues);
  };

  const handleSubCategory1Change = (value) => {
    setSelectedSubCategory1(value);
    setSelectedSubCategory2(null);
    const inputValues = {
      [name]: selectedCategory,
      sub_category_id: value,
      sub_category_id_2: null,
    };
    handleChildFieldChange(inputValues);
  };

  const handleSubCategory2Change = (value) => {
    setSelectedSubCategory2(value);
    const inputValues = {
      [name]: selectedCategory,
      sub_category_id: selectedSubCategory1,
      sub_category_id_2: value,
    };
    handleChildFieldChange(inputValues);
  };
  useEffect(() => {
    if (itemValue) {
      setSelectedCategory(itemValue);
      setSelectedSubCategory1(item?.value[1]);
      setSelectedSubCategory2(item?.value[2]);
      const inputValues = {
        [name]: item?.value,
        sub_category_id: item?.value[1],
        sub_category_id_2: item?.value[2],
      };
      handleChildFieldChange(inputValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemValue]);

  const categoryOptions = items?.map((category) => (
    <Option key={category.id} value={category.id}>
      {category.name}
    </Option>
  ));

  const subCategory1Options =
    selectedCategory &&
    items
      ?.find((category) => category.id === selectedCategory)
      ?.sub_category.map((subCat1) => (
        <Option key={subCat1.id} value={subCat1.id}>
          {subCat1.sub_category_name}
        </Option>
      ));

  const subCategory2Options =
    selectedSubCategory1 &&
    items
      ?.find((category) => category.id === selectedCategory)
      ?.sub_category?.find((subCat1) => subCat1.id === selectedSubCategory1)
      ?.sub_categories2?.map((subCat2) => (
        <Option key={subCat2.id} value={subCat2.id}>
          {subCat2.sub_category_name2}
        </Option>
      ));

  return (
    <Col>
      <Form.Item
        className="form-item"
        name={name}
        rules={[
          {
            required: true,
            // required: true,
            // message: item.required
            //   ? "Please input your username!"
            //   : "",
            message: "",
          },
        ]}
      >
        <Select
          className={`${customStyle || "dropdown-style"}`}
          // name={name}
          placeholder={placeholder}
          style={{ width: "100%" }}
          onChange={handleCategoryChange}
          value={selectedCategory}
        >
          {categoryOptions}
        </Select>
      </Form.Item>

      {/* {selectedCategory && ( */}
      <Form.Item
        className="form-item"
        name={"sub_category_id"}
        rules={[
          {
            required: true,
            // required: true,
            // message: item.required
            //   ? "Please input your username!"
            //   : "",
            message: "",
          },
        ]}
      >
        <Select
          className={`${customStyle || "dropdown-style"}`}
          placeholder="Select Sub-Category 1"
          style={{ width: "100%", marginTop: "10px" }}
          onChange={handleSubCategory1Change}
          value={selectedSubCategory1}
          disabled={!selectedCategory}
        >
          {subCategory1Options}
        </Select>
      </Form.Item>
      {/* )} */}

      {/* {selectedSubCategory1 && ( */}
      <Form.Item
        className="form-item"
        name={"sub_category_id_2"}
        rules={[
          {
            required: true,
            // required: true,
            // message: item.required
            //   ? "Please input your username!"
            //   : "",
            message: "",
          },
        ]}
      >
        <Select
          className={`${customStyle || "dropdown-style"}`}
          placeholder="Select Sub-Category 2"
          style={{ width: "100%", marginTop: "10px" }}
          onChange={handleSubCategory2Change}
          value={selectedSubCategory2}
          disabled={!selectedSubCategory1}
        >
          {subCategory2Options}
        </Select>
      </Form.Item>
      {/* )} */}
    </Col>
  );
};

export default MultiLevelSelect;

// // import React, { useState } from "react";
// // import { Select, Typography } from "antd";
// // import "./MultiLevelSelect.css";
// // const { Text } = Typography;
// // const MultiLevelSelect = (props) => {
// //   const {
// //     customStyle,
// //     items,
// //     dropdownChangeValue,
// //     placeholder,
// //     name,
// //     handleChildFieldChange,
// //     item,
// //   } = props;
// //   const [selectedOption, setSelectedOption] = useState("");
// //   const handleChange = (value) => {
// //     setSelectedOption(value);
// //     // const inputValues = {
// //     //   [name]: value,
// //     // };
// //     // handleChildFieldChange(inputValues);
// //   };

// //   let firstLevel = items?.map((element) => {
// //     return {
// //       key: element.id,
// //       label: element.name,
// //       value: element.name,
// //       sub_category: element.sub_category,
// //     };
// //   });

// //   return (
// //     <>
// //       <Select
// //         className={`${customStyle || "dropdown-style"}`}
// //         placeholder={placeholder}
// //         onChange={handleChange}
// //         name={name}
// //         defaultValue={placeholder}
// //         value={selectedOption}
// //         // mode="multiple"
// //       >
// //         <Select.Option key={name} value="" disabled>
// //           <Text className="selected-option"> {placeholder}</Text>
// //         </Select.Option>
// //         {firstLevel?.map((value) => {
// //           return (
// //             <Select.Option key={value.key} value={value.label}>
// //               {value.label}
// //             </Select.Option>
// //           );
// //         })}
// //       </Select>
// //     </>
// //   );
// // };

// // export default MultiLevelSelect;

// import React from "react";
// import { Col, Menu } from "antd";
// import {
//   MailOutlined,
//   AppstoreOutlined,
//   SettingOutlined,
// } from "@ant-design/icons";

// const { SubMenu } = Menu;

// const data = [
//   {
//     id: 1,
//     name: "Heating and air conditioners",
//     sub_category: [
//       {
//         id: 1,
//         sub_category_name: "Fans",
//         sub_categories2: [
//           {
//             id: 1,
//             sub_category_name2: "Ceiling fans",
//           },
//           {
//             id: 23,
//             sub_category_name2: "Wall fans",
//           },
//           {
//             id: 24,
//             sub_category_name2: "Table fans",
//           },
//           {
//             id: 25,
//             sub_category_name2: "Floor fans",
//           },
//           {
//             id: 26,
//             sub_category_name2: "Pedestal fans",
//           },
//         ],
//       },
//     ],
//   },
//   // ... rest of the data
// ];

// const generateMenuItems = (category) => {

//   //   if (!category?.sub_category?.length) return null;

//   return category.sub_category.map((subCat) => {
//     // if (!subCat?.sub_category?.length) return null;

//     const subMenuItems = subCat.sub_category?.map((item) => (
//       <Menu.Item key={item.id}>{item.name}</Menu.Item>
//     ));


//     return (
//       <SubMenu
//         key={subCat.id}
//         icon={<MailOutlined />}
//         title={subCat.sub_category_name}
//       >
//         {subMenuItems}
//       </SubMenu>
//     );
//   });
// };

// const App = ({ items }) => {
//   const menuItems = items?.map((category) => {
//     return (
//       <SubMenu
//         key={category.id}
//         // icon={<AppstoreOutlined />}
//         title={category.name}
//       >
//         {generateMenuItems(category)}
//       </SubMenu>
//     );
//   });


//   return (
//     <Col style={{ height: "500px" }}>
//       <Menu
//         onClick={onClick}
//         style={{
//           width: "100px",
//         }}
//         // mode="horizontal"
//         mode="vertical"
//       >
//         {menuItems}
//       </Menu>
//     </Col>
//   );
// };

// export default App;
