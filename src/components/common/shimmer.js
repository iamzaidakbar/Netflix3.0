import React from "react";
import "../../styles/shimmer.scss"; // Import your shimmer effect styles

const Shimmer = ({ width, height }) => {
  return (
    <div style={{ width: width, height: height }} id="container">
      <div id="square" className="shimmer"></div>
    </div>
  );
};

export default Shimmer;
