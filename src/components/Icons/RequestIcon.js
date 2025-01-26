import React from "react";

const RequestIcon = ({ fillColor, strokeColor }) => {
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
      <g data-name="clipboard (3)">
        <path
          data-name="Path 157"
          d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          style={{ fill: 'none', strokeWidth: '2px' }}
        />
        <rect
          data-name="Rectangle 261"
          width="8"
          height="4"
          rx="1"
          transform="translate(8 2)"
          style={{ fill: 'none', strokeWidth: '2px' }}
        />
      </g>
    </svg>
  );
};

export default RequestIcon;
