import React from "react";
import AlgoCard from "./AlgoCard";
import "../css/Algorithm.style.css";
import algo from "../utils/algo.js";

const Algorithms = () => {
  return (
    <div className="algorithm-container">
      {algo.map((data, index) => {
        return (
          <AlgoCard
            key={data.heading}
            heading={data.heading}
            info={data.info}
            link={data.url}
            example={data.example}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default Algorithms;
