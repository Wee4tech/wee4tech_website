import React from "react";

const CustomerIcon = ({ fillColor, strokeColor }) => {
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
      style={svgStyle} // Apply the style directly to the SVG element
    >
      <g data-name="Group 9183">
        <g data-name="users (3)">
          <path
            data-name="Path 45693"
            d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
            style={{ fill: "none", strokeWidth: "2px" }}
          />
          <circle
            data-name="Ellipse 389"
            cx="4"
            cy="4"
            r="4"
            transform="translate(5 3)"
            style={{ fill: "none", strokeWidth: "2px" }}
          />
          <path
            data-name="Path 45694"
            d="M23 21v-2a4 4 0 0 0-3-3.87"
            style={{ fill: "none", strokeWidth: "2px" }}
          />
          <path
            data-name="Path 45695"
            d="M16 3.13a4 4 0 0 1 0 7.75"
            style={{ fill: "none", strokeWidth: "2px" }}
          />
        </g>
      </g>
    </svg>
  );
};

export default CustomerIcon;
