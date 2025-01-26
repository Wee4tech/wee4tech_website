import React from "react";

const OrderIssue = ({ fillColor, strokeColor }) => {
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
          <g data-name="alert-triangle (1)">
        <path data-name="Path 46286" d="M10.752 3.911 1.834 18.8a2.106 2.106 0 0 0 1.8 3.158h17.835a2.106 2.106 0 0 0 1.8-3.158L14.352 3.911a2.106 2.106 0 0 0-3.6 0z" transform="translate(-.523 -.897)" style={{fill:"none",stroke:"#384853",strokelinecap:"round",strokelinejoin:"round",strokewidth:"2px"}}/>
        <path data-name="Line 137" transform="translate(12.029 8.425)" style={{fill:"none",stroke:"#384853",strokelinecap:"round",strokelinejoin:"round",strokewidth:"2px"}} d="M0 0v4.211"/>
        <path data-name="Line 138" transform="translate(12.029 16.848)" style={{fill:"none",stroke:"#384853",strokelinecap:"round",strokelinejoin:"round",strokewidth:"2px"}} d="M0 0h.011"/>
    </g>
    </svg>
  );
};

export default OrderIssue;
