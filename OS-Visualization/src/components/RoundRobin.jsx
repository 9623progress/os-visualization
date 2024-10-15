import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../css/RoundRobin.css";
import useButtonAudio from "../hooks/useButtonAudio";

const RoundRobin = () => {
  const [processes, setProcesses] = useState([
    { name: "P1", arrivalTime: 0, burstTime: 0 },
  ]);
  const [timeQuantum, setTimeQuantum] = useState(1);
  const [executionTimeline, setExecutionTimeline] = useState([]);
  const [completionTimes, setCompletionTimes] = useState([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState([]);
  const [waitingTimes, setWaitingTimes] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [animatedChartData, setAnimatedChartData] = useState([]);
  const [isCalculated, setIsCalculated] = useState(false);
  const [averageTT, setAverageTT] = useState(0);
  const [averageWT, setAverageWT] = useState(0);
  const [disable, setDisable] = useState(false);

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d0ed57"];

  const { playSound } = useButtonAudio();

  const addProcess = () => {
    playSound();
    const newProcessCount = processes.length + 1;
    setProcesses([
      ...processes,
      { name: `P${newProcessCount}`, arrivalTime: 0, burstTime: 0 },
    ]);
  };

  const removeProcess = () => {
    playSound();
    if (processes.length > 1) {
      setProcesses((prevProcesses) => prevProcesses.slice(0, -1));
    }
  };

  const handleInputChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = Number(value);
    setProcesses(newProcesses);
  };

  const calculateTimes = () => {
    playSound();
    // Clear previous state before recalculating
    setCompletionTimes([]);
    setTurnaroundTimes([]);
    setWaitingTimes([]);
    setExecutionTimeline([]);
    setChartData([]);
    setAnimatedChartData([]); // Clear animation data

    const sortedProcesses = [...processes].sort(
      (a, b) => a.arrivalTime - b.arrivalTime
    );

    setProcesses(sortedProcesses);

    const n = sortedProcesses.length;
    const remainingBurstTimes = sortedProcesses.map((p) => p.burstTime);
    const completionTime = new Array(n).fill(0);
    const waitingTime = new Array(n).fill(0);
    const turnaroundTime = new Array(n).fill(0);

    let time = 0;
    let completed = 0;
    const timeline = [];
    const chartData = [];

    while (completed < n) {
      let allIdle = true;

      for (let i = 0; i < n; i++) {
        if (
          sortedProcesses[i].arrivalTime <= time &&
          remainingBurstTimes[i] > 0
        ) {
          allIdle = false;
          const execTime = Math.min(remainingBurstTimes[i], timeQuantum);

          time += execTime;
          remainingBurstTimes[i] -= execTime;

          if (remainingBurstTimes[i] === 0) {
            completionTime[i] = time;
            completed++;
          }

          timeline.push({
            process: sortedProcesses[i].name,
            time: execTime,
            startTime: time - execTime,
          });

          chartData.push({
            name: sortedProcesses[i].name,
            time: execTime,
            startTime: time - execTime,
            color: colors[i % colors.length],
          });
        }
      }

      if (allIdle) {
        time++;
      }
    }

    // Calculate turnaround and waiting times
    let totalTT = 0; // To calculate average Turnaround Time
    let totalWT = 0; // To calculate average Waiting Time
    for (let i = 0; i < n; i++) {
      turnaroundTime[i] = completionTime[i] - sortedProcesses[i].arrivalTime;
      waitingTime[i] = turnaroundTime[i] - sortedProcesses[i].burstTime;

      totalTT += turnaroundTime[i];
      totalWT += waitingTime[i];
    }

    // Set calculated values
    setExecutionTimeline(timeline);
    setCompletionTimes(completionTime);
    setTurnaroundTimes(turnaroundTime);
    setWaitingTimes(waitingTime);
    setChartData(chartData);
    setIsCalculated(true);

    // Set average TT and WT
    setAverageTT(totalTT / n);
    setAverageWT(totalWT / n);

    // Clear animated chart data before re-animating
    setAnimatedChartData([]); // Clear previous chart data

    // Animate the chart
    animateChart(chartData);
  };

  const animateChart = async (data) => {
    setDisable(true);

    for (let i = 0; i < data.length; i++) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setAnimatedChartData((prev) => [...prev, data[i]]);
          resolve();
        }, 2000);
      });
    }

    setDisable(false);
  };

  // Custom Legend
  const renderLegend = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        {processes.map((process, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: colors[index % colors.length],
                marginRight: "5px",
              }}
            />
            <span>{process.name}</span>
          </div>
        ))}
      </div>
    );
  };

  const handleAnimationClick = () => {
    playSound();
    setAnimatedChartData([]);
    animateChart(chartData);
  };

  return (
    <div className="RR-top-div">
      <div className="RR-heading">
        <h1>Round Robin Scheduling</h1>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="RR-input-table">
          <thead>
            <tr>
              <th>Time Quantum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {" "}
                <input
                  type="number"
                  placeholder="Time Quantum"
                  value={timeQuantum}
                  onChange={(e) => setTimeQuantum(Number(e.target.value))}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="RR-input-table">
          <thead>
            <tr>
              <th>Arrival Time</th>
              <th>Burst Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="number"
                    placeholder="Arrival Time"
                    value={process.arrivalTime}
                    onChange={(e) =>
                      handleInputChange(index, "arrivalTime", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Burst Time"
                    value={process.burstTime}
                    onChange={(e) =>
                      handleInputChange(index, "burstTime", e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="RR-button" onClick={addProcess}>
        Add Process
      </button>
      <button className="RR-button" onClick={removeProcess}>
        Remove Process
      </button>
      <button className="RR-button" onClick={calculateTimes}>
        Execute
      </button>
      <h3>Calculation Table</h3>
      <div style={{ overflowX: "auto" }}>
        <table className="RR-calculation-table">
          <thead>
            <tr>
              <th>Process</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Completion Time</th>
              <th>Turnaround Time</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {processes.map((process, index) => (
              <tr key={index}>
                <td>{process.name}</td>
                <td>{process.arrivalTime}</td>
                <td>{process.burstTime}</td>
                <td>{completionTimes[index]}</td>
                <td>{turnaroundTimes[index]}</td>
                <td>{waitingTimes[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isCalculated && (
        <div style={{ overflowX: "auto" }}>
          <table className="RR-input-table">
            <tr>
              <th>Average Turnaround Time:</th>
              <td>{averageTT.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Average Waiting Time:</th>
              <td>{averageWT.toFixed(2)}</td>
            </tr>
          </table>
        </div>
      )}

      <button
        disabled={disable}
        className="RR-button"
        onClick={handleAnimationClick}
      >
        Animate Execution Timeline
      </button>

      <div className="RR-chart-container">
        <h3>Execution Timeline</h3>
        {renderLegend()}
        <ResponsiveContainer
          className="Robin-container"
          width="100%"
          height={300}
        >
          <BarChart data={animatedChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="startTime"
              label={{ value: "Time", position: "bottom" }}
            />
            <YAxis
              label={{ value: "Processes", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />

            <Bar dataKey="time">
              {animatedChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RoundRobin;
