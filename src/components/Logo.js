import React from "react";
import PropTypes from "prop-types";

const Logo = props => {
  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle"
    },
    path: {
      fill: props.color
    }
  };
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width={props.width}
      height={props.height}
      viewBox="0 0 792 612"
      enable-background="new 0 0 792 612"
    >
      <g>
        <g>
          <g>
            <path
              style={styles.path}
              d="M595.94,6.12H196.06c-55.08,0-99.939,44.859-99.939,99.939v399.819c0,55.142,44.859,100.001,99.939,100.001h399.819
				c55.142,0,99.939-44.859,99.939-99.939V106.06C695.88,50.979,651.021,6.12,595.94,6.12z M645.88,505.94
				c0,27.602-22.399,50-50.001,50H196.06c-27.54,0-50-22.398-50-50V106.06c0-27.54,22.399-50,50-50h399.819
				c27.602,0,50.001,22.399,50.001,50V505.94z"
            />
          </g>
        </g>
      </g>
      <g>
        <g>
          <path
            style={styles.path}
            d="M243.11,445.308c-10.516,10.517-10.516,27.567,0,38.082c10.509,10.51,27.56,10.51,38.069,0l102.652-102.648
			l-35.933-40.223L243.11,445.308z"
          />
          <path
            style={styles.path}
            d="M599.531,197.442c-5.478-5.478-14.354-5.478-19.831,0l-66.823,66.816c-1.509,1.51-3.966,1.51-5.477,0l-9.424-9.424
			c-0.728-0.728-1.132-1.713-1.132-2.739c0-1.024,0.404-2.01,1.132-2.738l66.325-66.318c2.759-2.759,4.31-6.509,4.31-10.415
			c0-3.904-1.551-7.655-4.31-10.414c-2.779-2.779-6.523-4.331-10.422-4.331c-3.897,0-7.642,1.551-10.4,4.311l-66.33,66.336
			c-0.729,0.73-1.714,1.134-2.739,1.134c-1.026,0-2.01-0.404-2.739-1.134l-9.422-9.422c-1.512-1.511-1.512-3.966,0-5.477
			l66.815-66.823c5.478-5.478,5.478-14.353,0-19.83c-2.643-2.652-6.204-4.128-9.922-4.128c-3.716,0-7.277,1.476-9.9,4.107
			l-72.428,72.429c-18.106,18.101-22.885,44.33-14.699,66.913l-11.672,11.673l38.08,38.082l11.674-11.674
			c22.586,8.189,48.817,3.412,66.921-14.691l72.414-72.415C605.009,211.795,605.009,202.918,599.531,197.442z"
          />
          <path
            style={styles.path}
            d="M246.819,143.644c-6.299-6.299-14.838-9.835-23.742-9.835c-8.903,0-17.443,3.536-23.742,9.835
			c-11.946,11.946-13.153,30.898-2.833,44.268l88.968,115.157c7.055,9.142,17.706,14.8,29.227,15.534
			c0.857,0.055,1.706,0.081,2.563,0.081c10.617,0,20.85-4.209,28.404-11.77l145.981,163.41c5.31,5.937,12.822,9.432,20.782,9.654
			c0.27,0.006,0.54,0.013,0.809,0.013c7.67,0,15.042-3.042,20.485-8.485c11.312-11.312,11.312-29.645,0-40.955L246.819,143.644z"
          />
        </g>
      </g>
    </svg>
  );
};

Logo.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default Logo;
