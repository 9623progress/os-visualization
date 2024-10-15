import React, { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import ProgressBar from "./ProgressBar";
import useGenerateChartData from "../hooks/useGenerateChartData";
import useGenerateTimelineData from "../hooks/useGenerateTimelineData";
import "../css/PriorityScheduling.css";
import useButtonAudio from "../hooks/useButtonAudio";

const PriorityScheduling = () => {
  const [processes, setProcesses] = useState([
    { name: "P1", arrivalTime: 0, burstTime: 0, priority: 0 },
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

  const [executionOrder, setExecutionOrder] = useState([]);
  const [totalBurstTime, setTotalBurstTime] = useState(0);

  const colors = [
    "rgba(75, 192, 192, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(255, 159, 64, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(153, 102, 255, 1)",
  ];

  const { generateChartData } = useGenerateChartData(colors);
  const { generateTimelineData } = useGenerateTimelineData(colors);
  const { playSound } = useButtonAudio();

  const addProcess = () => {
    playSound();
    const processCount = processes.length + 1;
    setProcesses([
      ...processes,
      { name: `P${processCount}`, arrivalTime: 0, burstTime: 0, priority: 0 },
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

  const calculateTimes = () => {
    playSound();
    const sortedProcesses = [...processes].sort((a, b) => {
      if (a.arrivalTime === b.arrivalTime) {
        return a.priority - b.priority;
      }
      return a.arrivalTime - b.arrivalTime;
    });

    const n = sortedProcesses.length;
    const completionTime = Array(n).fill(0);
    const waitingTime = Array(n).fill(0);
    const turnaroundTime = Array(n).fill(0);
    const startTime = Array(n).fill(0);

    let currentTime = 0;
    const executionOrder = [];

    while (sortedProcesses.length > 0) {
      const availableProcesses = sortedProcesses.filter(
        (proc) => proc.arrivalTime <= currentTime
      );

      if (availableProcesses.length > 0) {
        availableProcesses.sort((a, b) => a.priority - b.priority);
        const currentProcess = availableProcesses[0];

        const currentIndex = processes.findIndex(
          (proc) => proc.name === currentProcess.name
        );

        if (currentTime < currentProcess.arrivalTime) {
          currentTime = currentProcess.arrivalTime;
        }

        startTime[currentIndex] = currentTime;
        completionTime[currentIndex] = currentTime + currentProcess.burstTime;

        turnaroundTime[currentIndex] =
          completionTime[currentIndex] - currentProcess.arrivalTime;

        if (currentProcess.arrivalTime === currentTime) {
          waitingTime[currentIndex] = 0;
        } else {
          waitingTime[currentIndex] =
            turnaroundTime[currentIndex] - currentProcess.burstTime;
        }

        currentTime += currentProcess.burstTime;

        executionOrder.push(currentProcess);

        sortedProcesses.splice(sortedProcesses.indexOf(currentProcess), 1);
      } else {
        currentTime = Math.min(
          ...sortedProcesses.map((proc) => proc.arrivalTime)
        );
      }
    }

    const totalWaitingTime = waitingTime.reduce((acc, time) => acc + time, 0);
    const totalTurnaroundTime = turnaroundTime.reduce(
      (acc, time) => acc + time,
      0
    );
    setWaitingTimes(waitingTime);
    setTurnaroundTimes(turnaroundTime);
    setCompletionTimes(completionTime);
    setStartTimes(startTime);
    setAverageWT(totalWaitingTime / n);
    setAverageTT(totalTurnaroundTime / n);

    const totalBurstTime = processes.reduce(
      (acc, proc) => acc + proc.burstTime,
      0
    );

    setExecutionOrder(executionOrder);

    const data = generateChartData(processes, waitingTime, completionTime);
    setChartData(data);

    const newData = generateTimelineData(processes, startTime, completionTime);
    setTimelineData(newData);

    setTotalBurstTime(totalBurstTime);
  };

  const barOptions = {
    responsive: true,

    plugins: {
      legend: {
        position: "top",
        color: "#190482",
      },
      title: {
        display: true,
        text: "Process Execution Gantt Chart",
        color: "#190482",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Processes",
          color: "#190482",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time",
          color: "#190482",
        },
      },
    },
  };

  const timelineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Process Timeline Graph",
        color: "#190482",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time",
          color: "#190482",
        },
      },
      y: {
        title: {
          display: true,
          text: "Processes",
          color: "#190482",
        },
      },
    },
  };
  return (
    <div style={{ padding: "20px" }} className="priority-top-div">
      <div className="priority-heading">
        <h1>Non-Primitive Priority Scheduling Visualization</h1>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table className="priority-input-table">
          <thead>
            <tr>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Priority </th>
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

                <td>
                  <input
                    type="number"
                    placeholder="Priority (lower is higher)"
                    value={process.priority}
                    onChange={(e) =>
                      handleChange(index, "priority", Number(e.target.value))
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addProcess}
        className=" priority-button priority-addProcess-button"
      >
        Add Process
      </button>
      <button
        onClick={removeProcess}
        className="priority-button priority-remove-button"
      >
        Remove Process
      </button>
      <button
        onClick={calculateTimes}
        className="priority-button priority-execute-button"
      >
        Execute
      </button>

      <div className="priority-calculation">
        <h2>Calculation Table</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="priority-table">
            <thead>
              <tr>
                <th>Process Name</th>
                <th>Arrival Time (AT)</th>
                <th>Burst Time (BT)</th>
                <th>Priority</th>
                <th>Completion Time (CT)</th>
                <th>Turnaround Time (TAT)</th>
                <th>Waiting Time (WT)</th>
                <th>Start Time (ST)</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process, index) => (
                <tr key={index}>
                  <td>{process.name}</td>
                  <td>{process.arrivalTime}</td>
                  <td>{process.burstTime}</td>
                  <td>{process.priority}</td>
                  <td>{completionTimes[index]}</td>
                  <td>{turnaroundTimes[index]}</td>
                  <td>{waitingTimes[index]}</td>
                  <td>{startTimes[index]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="priority-claculation-2">
          <table>
            <tbody>
              <tr>
                <th>Average Waiting Time:</th>
                <td> {averageWT.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Average Turnaround Time:</th>
                <td> {averageTT.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <ProgressBar
            processes={executionOrder}
            totalBurstTime={totalBurstTime}
            colors={colors}
            sort={false}
          />
        </div>

        <div className="priority-graph">
          <div className="priorityBar">
            <h2>Bar Graph</h2>
            <Bar data={chartData} options={barOptions} />
          </div>

          <div className="priorityTimeLine">
            <h2>Timeline Graph</h2>
            <Line data={timelineData} options={timelineOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityScheduling;
