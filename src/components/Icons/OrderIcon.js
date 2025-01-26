import React from "react";

const OrderIcon = ({ fillColor, strokeColor }) => {
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
      height="24.034"
      viewBox="0 0 24 24.034"
      style={svgStyle} // Apply the style directly to the SVG element
    >
      <g data-name="package (1)">
        <path
          data-name="Line 9"
          transform="translate(6.931 3.453)"
          d="M9.862 5.687 0 0"
          style={{ fill: 'none', strokeWidth: '2px' }} // Remove the stroke color inline style
        />
        <path
          data-name="Path 40493"
          d="M22.723 17.34V8.574a2.191 2.191 0 0 0-1.1-1.9L13.957 2.3a2.191 2.191 0 0 0-2.191 0L4.1 6.679A2.191 2.191 0 0 0 3 8.574v8.766a2.191 2.191 0 0 0 1.1 1.9l7.67 4.383a2.191 2.191 0 0 0 2.191 0l7.67-4.383a2.191 2.191 0 0 0 1.092-1.9z"
          transform="translate(-1 -.968)"
          style={{ fill: 'none', strokeWidth: '2px' }} // Remove the stroke color inline style

        />
        <path
          data-name="Path 40494"
          d="m3.27 6.96 9.566 5.533L22.4 6.96"
          transform="translate(-.974 -.493)"
          style={{ fill: 'none', strokeWidth: '2px' }} // Remove the stroke color inline style

        />
        <path
          data-name="Line 10"
          transform="translate(11.862 11.989)"
          d="M0 11.045V0"
          style={{ fill: 'none', strokeWidth: '2px' }} // Remove the stroke color inline style

        />
      </g>
    </svg>
  );
};

export default OrderIcon;
