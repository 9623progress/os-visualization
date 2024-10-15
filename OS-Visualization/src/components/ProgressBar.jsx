import React, { useState, useEffect } from "react";
import "chart.js/auto";
import "../css/ProgressBar.css";

const ProgressBar = ({
  processes,
  colors,
  totalBurstTime,
  sort = true,
  completionTime = [],
  startTime = [],
}) => {
  // console.log(processes);
  const [currentProcess, setCurrentProcess] = useState("");
  const [animationIndex, setAnimationIndex] = useState(0);
  const [animationTimeouts, setAnimationTimeouts] = useState([]);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const runAnimation = () => {
    // Clear previous timeouts if any
    animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    setAnimationIndex(0);
    setCurrentProcess(""); // Reset current process
    setProgressBarWidth(0); // Reset progress bar width

    const newTimeouts = [];
    let accumulatedTime = 0;

    if (sort) {
      processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    }

    processes.forEach((process, index) => {
      // console.log(process);
      const timeout = setTimeout(() => {
        setCurrentProcess(process.name);
        setProgressBarWidth(
          ((accumulatedTime + process.burstTime) / totalBurstTime) * 100
        ); // Update progress bar width

        // Smoothly move the process name
        const processElement = document.getElementById(`process-${index}`);
        if (processElement) {
          processElement.style.transition = "left 1.0s ease"; // Add transition for smooth movement
          processElement.style.left = `${
            (accumulatedTime + process.burstTime) * (100 / totalBurstTime)
          }%`;
        }

        accumulatedTime += process.burstTime; // Update accumulated time
      }, index * 2000); // 2 seconds delay per process

      newTimeouts.push(timeout);
    });

    setAnimationTimeouts(newTimeouts);
  };

  useEffect(() => {
    // Cleanup timeouts on unmount or when animation index changes
    return () => {
      animationTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [animationTimeouts]);

  const getProgressBarColors = () => {
    const totalBurstTime2 = processes.reduce(
      (acc, proc) => acc + proc.burstTime,
      0
    );
    let accumulatedTime = 0;

    return processes.map((process, index) => {
      const ratio = process.burstTime / totalBurstTime2;
      const color = colors[processes.indexOf(process) % colors.length];
      const width = ratio * 100; // Convert to percentage
      console.log(process);
      accumulatedTime += width;
      let start = startTime[index];
      let end = completionTime[index];
      return { width, color, name: process.name, start, end };
    });
  };

  return (
    <div>
      <h1>Process Execution Graph</h1>

      <div className="progress-bar-top-div">
        {getProgressBarColors().map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: item.color,
              width: `${item.width}%`,
            }}
            className="progress-bar-div-2"
          >
            {startTime.length > 0 && completionTime.length > 0 && (
              <div>
                {/* <span className="left-span">{item.start}</span> */}
                <span className="right-span">{item.end}</span>
              </div>
            )}
          </div>
        ))}

        <div
          style={{
            left: `${progressBarWidth - 3}%`,
          }}
          className="progress-bar-cursor-div"
        >
          <div>
            <h4
              style={{
                color: "white",
                margin: 0,
              }}
            >
              {currentProcess}
            </h4>
          </div>
        </div>
      </div>

      <button onClick={runAnimation} className="progress-animation-button">
        Run Animation
      </button>
    </div>
  );
};

export default ProgressBar;
