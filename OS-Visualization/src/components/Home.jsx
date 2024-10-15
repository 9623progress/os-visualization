import React from "react";
import "../css/Home.style.css";
import CPU from "../assets/cpuExecution.mp4";
import Algorithms from "./Algortihms";

const Home = () => {
  return (
    <div className="Home">
      <div className="home-container">
        <div className="home-heading">
          <h1>Operating System Process Scheduling Algorithms</h1>
          <p>From Concept to Execution- Visualizing CPU Processes Seamlessly</p>
          <div className="home-question">
            <p>What is Process ?</p>
            <p>
              <span>Ans:</span>A process in an operating system is a program in
              execution that includes the program code, its current activity,
              and the resources it uses.
            </p>
          </div>
        </div>
        <div className="home-video">
          <video autoPlay loop muted playsInline className="home-video">
            <source src={CPU} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <Algorithms />
    </div>
  );
};

export default Home;
