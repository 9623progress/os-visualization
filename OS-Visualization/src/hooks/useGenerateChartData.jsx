import React, { useState } from "react";

const useGenerateChartData = (colors) => {
  //   const [data, setData] = useState([]);

  const generateChartData = (sortedProcesses, waitingTime, turnaroundTime) => {
    const newData = {
      labels: sortedProcesses.map((proc) => proc.name),
      datasets: [
        {
          label: "Burst Time",
          data: sortedProcesses.map((proc) => proc.burstTime),
          backgroundColor: colors[0],
          stack: "Stack 0",
          borderColor: "#190482",
        },
        {
          label: "Waiting Time",
          data: waitingTime,
          backgroundColor: colors[1],
          stack: "Stack 0",
          borderColor: "#190482",
        },
        {
          label: "Turnaround Time",
          data: turnaroundTime,
          backgroundColor: colors[2],
          stack: "Stack 0",
          borderColor: "#190482",
        },
      ],
    };

    // setData(newData);
    return newData;
  };

  return { generateChartData };
};

export default useGenerateChartData;
