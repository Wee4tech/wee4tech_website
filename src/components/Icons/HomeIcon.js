import React from 'react';

const HomeIcon = ({ fillColor, strokeColor }) => {
 
  const svgStyle = {
    fill: fillColor,
    stroke: strokeColor,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '2px',
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="svg-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={svgStyle} // Apply the style directly to the SVG element
    >
      <g data-name="home (2)">
        <path
          data-name="Path 40490"
          d="M3 9.7 12.9 2l9.9 7.7v12.1a2.2 2.2 0 0 1-2.2 2.2H5.2A2.2 2.2 0 0 1 3 21.8z"
          transform="translate(-1 -1)"
          style={{ fill: 'none', strokeWidth: '2px' }} // Remove the stroke color inline style
        />
        <path
          data-name="Path 40491"
          d="M9 23V12h6.6v11"
          transform="translate(-.4)"
          style={{ fill: 'none', strokeWidth: '2px' }} // Remove the stroke color inline style
        />
      </g>
    </svg>
  );
};

export default HomeIcon;
