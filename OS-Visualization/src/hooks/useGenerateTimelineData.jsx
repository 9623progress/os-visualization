import React from "react";

const useGenerateTimelineData = (colors) => {
  const generateTimelineData = (sortedProcesses, startTime, completionTime) => {
    let maxCompletion = 0;
    for (let i = 0; i < completionTime.length; i++) {
      if (maxCompletion < completionTime[i]) {
        maxCompletion = completionTime[i];
      }
    }
    const dataSets = sortedProcesses.map((process, i) => ({
      label: process.name,
      data: Array.from({ length: maxCompletion + 1 }, (_, j) =>
        j >= startTime[i] && j < completionTime[i] ? i + 1 : NaN
      ),
      borderColor: colors[i % colors.length],
      backgroundColor: colors[i % colors.length],
      fill: false,
      stepped: true,
    }));

    const data = {
      labels: Array.from({ length: maxCompletion + 1 }, (_, i) => i),
      datasets: dataSets,
    };

    return data;
  };

  return { generateTimelineData };
};

export default useGenerateTimelineData;
