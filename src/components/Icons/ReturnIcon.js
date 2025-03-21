import React from "react";

const ReturnIcon = ({ fillColor, strokeColor }) => {
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
      <path
        d="M277.608 196.744a1.49 1.49 0 0 1 1.49-1.49h12.686l-3.874-3.874a1.49 1.49 0 1 1 2.107-2.107l6.434 6.434a1.49 1.49 0 0 1-1.055 2.542h-16.313a1.491 1.491 0 0 1-1.49-1.505zm19.262 6.148a1.49 1.49 0 0 1-1.49 1.49h-12.7l3.874 3.874a1.49 1.49 0 1 1-2.107 2.107l-6.419-6.419a1.49 1.49 0 0 1 1.055-2.542h16.282a1.49 1.49 0 0 1 1.49 1.49z"
        transform="translate(-275.092 -187.319)"
        style={{ fill: "none", strokeWidth: "2px" }}
      />
    </svg>
  );
};

export default ReturnIcon;
