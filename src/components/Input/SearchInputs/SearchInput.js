import React, {useState, useCallback} from "react";
import {Input} from "antd";
import {SearchOutlined, LoadingOutlined} from "@ant-design/icons";
import {debounce} from "lodash";
import "./SearchInput.css";
const SearchInput = ({
  placeholder,
  size,
  getLibraryApi = () => {},
  width,
  customStyle,
  isLoading,
  parentSetterState = () => {},
  handleSearchedValue = () => {},
  id = "",
  searchValue,
  queryparams,
  Searchflag
  
}) => {
 
  const [value, setValue] = useState("");
  
  const handleTrigger = (params) => {
 
    if (id) {
      getLibraryApi({
        params,
        page: 1,
        ...(id && {bmp_id: id, id}),
        ...(searchValue && {searchValue: params?.search}),
        ...(queryparams&&{phone_number:queryparams?.phone_number})
      });
    } else {
      getLibraryApi({...params, page: 1,mobCredit:true, ...(queryparams&&{phone_number:queryparams?.phone_number})});
    }
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
    parentSetterState(targetValue);
    // if (targetValue === "") {
    //   searchTextDebouncedTrigger({
    //     search: targetValue,
    //   });
    //   // getLibraryApi({ ...(id && { bmp_id: id }), page: 1 });
    // }
    if (targetValue.length >= 3 || targetValue.length === 0) {
      searchTextDebouncedTrigger({
        search: targetValue,
      });
    }
  };

  return (
    <>
      <Input
        className={`${customStyle} search-input-style`}
        size={size}
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        suffix={isLoading ? <LoadingOutlined /> : ""}
        value={value}
        onChange={handleValueChange}
        style={{
          width: width,
        }}     
      />
    </>
  );
};

export default SearchInput;
