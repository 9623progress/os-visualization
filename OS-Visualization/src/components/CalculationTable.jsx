import React from "react";

const CalculationTable = ({
  processes,
  waitingTimes,
  turnaroundTimes,
  completionTimes,
  averageWT,
  averageTT,
  cpuUtilization,
}) => {
  return (
    <table className="RoundRobin-table">
      <thead>
        <tr>
          <th>Process</th>
          <th>Arrival Time</th>
          <th>Burst Time</th>
          <th>Waiting Time</th>
          <th>Turnaround Time</th>
          <th>Completion Time</th>
        </tr>
      </thead>
      <tbody>
        {processes.map((process, index) => (
          <tr key={index}>
            <td>{process.name}</td>
            <td>{process.arrivalTime}</td>
            <td>{process.burstTime}</td>
            <td>{waitingTimes[index]}</td>
            <td>{turnaroundTimes[index]}</td>
            <td>{completionTimes[index]}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Average Waiting Time</td>
          <td colSpan="3">{averageWT.toFixed(2)}</td>
        </tr>
        <tr>
          <td colSpan="3">Average Turnaround Time</td>
          <td colSpan="3">{averageTT.toFixed(2)}</td>
        </tr>
        <tr>
          <td colSpan="3">CPU Utilization</td>
          <td colSpan="3">{cpuUtilization.toFixed(2)}%</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default CalculationTable;
