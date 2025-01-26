import React from "react";

const ManageProduct = ({ fillColor, strokeColor }) => {
  const svgStyle = {
    fill: fillColor,
    stroke: strokeColor,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2px",
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={svgStyle}
    >
     <g data-name="manage products">
        <g data-name="tag (1)">
            <path data-name="Path 40492" d="m2.668 15.1 8.23 8.23a2.3 2.3 0 0 0 3.248 0l9.86-9.848V2H12.527l-9.86 9.86a2.3 2.3 0 0 0 .001 3.24z" transform="translate(-.804 -1)" style={{strokewidth:"2px",fill:"none",stroke:"#384853",strokelinecap:"round",strokelinejoin:"round"}}/>
            <path data-name="Line 8" transform="translate(17.451 6.739)" style={{strokewidth:"4px",fill:"none",stroke:"#384853",strokelinecap:"round",strokelinejoin:"round"}} d="M.011 0H0"/>
        </g>
    </g>
    </svg>
  );
};

export default ManageProduct;
