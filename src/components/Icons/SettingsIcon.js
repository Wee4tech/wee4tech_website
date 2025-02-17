import React from "react";

const SettingsIcon = ({ fillColor, strokeColor }) => {
  const svgStyle = {
    fill: fillColor,
    stroke: strokeColor,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2px",
  };

  return (
    <svg
      svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={svgStyle} // Apply the style directly to the SVG element
    >
      <g data-name="settings (3)" transform="translate(1 1)">
        <circle
          data-name="Ellipse 362"
          cx="3"
          cy="3"
          r="3"
          transform="translate(8 8)"
          style={{ fill: 'none', strokeWidth: '2px' }}
        />
        <path
          data-name="Path 40496"
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.663 1.663 0 0 0-2.82 1.18V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.663 1.663 0 0 0-1.18-2.82H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.663 1.663 0 0 0 2.82 1.18l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
          transform="translate(-1 -1)"
          style={{ fill: 'none', strokeWidth: '2px' }}
        />
      </g>
    </svg>
  );
};

export default SettingsIcon;
