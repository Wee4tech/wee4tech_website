import React from "react";

const SellerIcon = ({ fillColor, strokeColor }) => {
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
      width="24.424"
      height="24.2"
      viewBox="0 0 24.424 24.2"
      style={svgStyle} // Apply the style directly to the SVG element
    >
      <g data-name="Group 9184">
        <g data-name="store (1)">
          <g data-name="Group 9170">
            <g data-name="Group 9169">
              <path
                data-name="Path 45698"
                d="M179.488 310.146h5.686v7.132h-5.686z"
                transform="translate(-170.053 -294.141)"
                style={{ fill: "none", strokeWidth: "2px" }}
              />
            </g>
          </g>
          <g data-name="Group 9181">
            <g data-name="Group 9180">
              <g data-name="Group 9179">
                <path
                  data-name="Path 45705"
                  d="M23.883 8.9 22.47 3.324a1.792 1.792 0 0 0-1.742-1.35H3.284a1.8 1.8 0 0 0-1.747 1.35L.136 8.866a4.447 4.447 0 0 0 1.256 4.328v10.937a1.619 1.619 0 0 0 1.615 1.64h18.028a1.642 1.642 0 0 0 1.642-1.64V13.187A4.722 4.722 0 0 0 23.883 8.9zm-2.8-5.222L22.5 9.253a3.08 3.08 0 1 1-6.078.741V3.41h4.307a.36.36 0 0 1 .352.268zm-6.1 6.522a2.949 2.949 0 1 1-5.9 0V3.41h5.9zM1.522 9.22l1.41-5.542a.36.36 0 0 1 .352-.268H7.65v6.557a3.105 3.105 0 1 1-6.128-.747zm19.72 14.911a.206.206 0 0 1-.206.2H3.008a.184.184 0 0 1-.179-.2v-10A4.579 4.579 0 0 0 8.3 12.5a4.382 4.382 0 0 0 3.734 2.094 4.419 4.419 0 0 0 3.733-2.082 4.615 4.615 0 0 0 5.472 1.624v10z"
                  transform="translate(.229 -1.774)"
                  style={{ fill: "none", strokeWidth: "1.4px" }}
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default SellerIcon;
