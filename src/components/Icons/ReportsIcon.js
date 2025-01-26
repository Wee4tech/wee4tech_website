import React from "react";

const ReportsIcon = ({ fillColor, strokeColor }) => {
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
      <g data-name="Group 5906">
        <g
          data-name="Rectangle 5584"
          transform="translate(2 5.714)"
          style={{ fill: 'none', strokeWidth: '2px' }}
        >
          <rect width="7.857" height="17.286" rx="1"  style={{ fill: 'none', strokeWidth: '0px' }} />
          <path  style={{ fill: 'none', strokeWidth: '2px' }} d="M1 1h5.857v15.286H1z" />
        </g>
        <g
          data-name="Rectangle 5585"
          transform="translate(8.286 8.857)"
          style={{ fill: 'none', strokeWidth: '2px' }}
        >
          <rect width="7.857" height="14.143" rx="1" style={{ fill: 'none', strokeWidth: '0px' }} />
          <path  style={{ fill: 'none', strokeWidth: '2px' }} d="M1 1h5.857v12.143H1z" />
        </g>
        <g
          data-name="Rectangle 5586"
          transform="translate(14.571 1)"
          style={{ fill: 'none', strokeWidth: '2px' }}
        >
          <rect width="7.857" height="22" rx="1"  style={{ fill: 'none', strokeWidth: '0px' }} />
          <path  style={{ fill: 'none', strokeWidth: '2px' }} d="M1 1h5.857v20H1z" />
        </g>
      </g>
    </svg>
  );
};

export default ReportsIcon;
