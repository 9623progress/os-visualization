import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import ProgressBar from "./ProgressBar";
import useGenerateChartData from "../hooks/useGenerateChartData";
import useGenerateTimelineData from "../hooks/useGenerateTimelineData";
import "../css/FCFS.style.css";
import useButtonAudio from "../hooks/useButtonAudio";

const FCFS = () => {
  const [processes, setProcesses] = useState([
    { name: "P1", arrivalTime: 0, burstTime: 0 },
  ]);
  const [waitingTimes, setWaitingTimes] = useState([]);
  const [turnaroundTimes, setTurnaroundTimes] = useState([]);
  const [completionTimes, setCompletionTimes] = useState([]);
  const [startTimes, setStartTimes] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [timelineData, setTimelineData] = useState({
    labels: [],
    datasets: [],
  });
  const [averageWT, setAverageWT] = useState(0);
  const [averageTT, setAverageTT] = useState(0);

  // Track progress bar width
  const [totalBurstTime, SetTotalBurtTime] = useState(0);
  const colors = [
    "rgba(75, 192, 192, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(153, 102, 255, 1)",
  ];

  //custom hook
  const { generateChartData } = useGenerateChartData(colors);
  const { generateTimelineData } = useGenerateTimelineData(colors);
  const { playSound } = useButtonAudio();

  // process logic

  const addProcess = () => {
    playSound();
    const processCount = processes.length + 1;
    setProcesses([
      ...processes,
      { name: `P${processCount}`, arrivalTime: 0, burstTime: 0 },
    ]);
  };

  const removeProcess = () => {
    playSound();
    if (processes.length > 1) {
      setProcesses((prevProcesses) => prevProcesses.slice(0, -1));
    }
  };

  const handleChange = (index, field, value) => {
    const newProcesses = [...processes];
    newProcesses[index][field] = value;
    setProcesses(newProcesses);
  };

  //calculation logic

  const calculateTimes = () => {
    playSound();
    // step1-sort process
    const sortedProcesses = [...processes].sort(
      (a, b) => a.arrivalTime - b.arrivalTime
    );
    setProcesses(sortedProcesses); //store soterd process

    //step2-create n size all array with 0 initialization
    const n = sortedProcesses.length;
    const completionTime = Array(n).fill(0);
    const waitingTime = Array(n).fill(0);
    const turnaroundTime = Array(n).fill(0);
    const startTime = Array(n).fill(0);

    let totalTime = 0;

    for (let i = 0; i < n; i++) {
      if (i === 0) {
        startTime[i] = sortedProcesses[i].arrivalTime;
        completionTime[i] = startTime[i] + sortedProcesses[i].burstTime;
      } else {
        startTime[i] = Math.max(
          sortedProcesses[i].arrivalTime,
          completionTime[i - 1]
        );
        completionTime[i] = startTime[i] + sortedProcesses[i].burstTime;
      }
      turnaroundTime[i] = completionTime[i] - sortedProcesses[i].arrivalTime; //TC=CT-AT
      waitingTime[i] = turnaroundTime[i] - sortedProcesses[i].burstTime; //WT=TT-BT
      console.log(waitingTime[i]);
    }

    const totalWaitingTime = waitingTime.reduce((acc, time) => acc + time, 0);
    const totalTurnaroundTime = turnaroundTime.reduce(
      (acc, time) => acc + time,
      0
    );
    SetTotalBurtTime(
      sortedProcesses.reduce((acc, proc) => acc + proc.burstTime, 0)
    );
    totalTime = completionTime[n - 1];

    setWaitingTimes(waitingTime);
    setTurnaroundTimes(turnaroundTime);
    setCompletionTimes(completionTime);
    setStartTimes(startTime);
    setAverageWT(totalWaitingTime / n);
    setAverageTT(totalTurnaroundTime / n);

    // Generate graph data after calculating times

    const data = generateChartData(
      sortedProcesses,
      waitingTime,
      completionTime
    );
    setChartData(data);

    const newdata = generateTimelineData(
      sortedProcesses,
      startTime,
      completionTime
    );
    setTimelineData(newdata);
  };

  //user interface

  return (
    <div style={{ padding: "20px" }} className="FCFS-top-div">
      <div className="FCFS-heading">
        <h1>First Come First Serve Visualization</h1>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="FCFS-input-table">
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
                      handleChange(index, "arrivalTime", Number(e.target.value))
                    }
                  />
                </td>

                <td>
                  <input
                    type="number"
                    placeholder="Burst Time"
                    value={process.burstTime}
                    onChange={(e) =>
                      handleChange(index, "burstTime", Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={addProcess} className="FCFS-button">
        Add Process
      </button>
      <button className="FCFS-button" onClick={removeProcess}>
        Remove Process
      </button>
      <button onClick={calculateTimes} className="FCFS-button">
        Execute
      </button>

      <div>
        <h2>Calculation Table</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="FCFS-table">
            <thead>
              <tr>
                <th className="FCFS-table-th">Process Name</th>
                <th className="FCFS-table-th">Arrival Time (AT)</th>
                <th className="FCFS-table-th">Burst Time (BT)</th>
                <th className="FCFS-table-th">Completion Time (CT)</th>
                <th className="FCFS-table-th">Turnaround Time (TAT)</th>
                <th className="FCFS-table-th">Waiting Time (WT)</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => (
                <tr key={index}>
                  <td className="table-td">{process.name}</td>
                  <td className="FCFS-table-td">{process.arrivalTime}</td>
                  <td className="FCFS-table-td">{process.burstTime}</td>
                  <td className="FCFS-table-td">{completionTimes[index]}</td>
                  <td className="FCFS-table-td">{turnaroundTimes[index]}</td>
                  <td className="FCFS-table-td">{waitingTimes[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table className="FCFS-input-table">
          <tbody>
            <tr>
              <th>Average Waiting Time:</th>
              <td>{averageWT.toFixed(2)}</td>
            </tr>
            <tr>
              <th>Average Turnaround Time:</th>
              <td>{averageTT.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ProgressBar
        processes={processes}
        colors={colors}
        totalBurstTime={totalBurstTime}
        completionTime={completionTimes}
        startTime={startTimes}
      />

      <div className="FCFS-chart">
        <div className="FCFS-bar-chart">
          <h2>Bar Graph</h2>
          <Bar data={chartData} />
        </div>
        <div className="FCFS-timeline-chart">
          <h2>Timeline Graph</h2>
          <Line data={timelineData} />
        </div>
      </div>
    </div>
  );
};

export default FCFS;
