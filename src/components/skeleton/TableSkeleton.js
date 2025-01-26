import React from "react";
import { Skeleton } from "antd";
const cssStyle = { height: "30px", marginBottom: "20px", marginTop: "10px" };
const TableSkeleton = ({ length = 10 }) => {
  return (
    <>
      {Array.from({ length }).map((_, index) => (
        <Skeleton.Input key={index} block style={cssStyle} active={true} />
      ))}
    </>
  );
};

export default TableSkeleton;
