# OS Process Scheduling Visualization Tool

This project provides a graphical tool to visualize **Operating System (OS) Process Scheduling Algorithms**, including Round Robin, First-Come-First-Serve (FCFS), Shortest Job First (SJF), and Priority Scheduling. The tool offers dynamic input for process details and displays timeline and stacked bar graphs for better understanding of scheduling behavior.

## Features

- **Dynamic Input**: Input processes dynamically with properties such as burst time, arrival time, and priority
- **Scheduling Algorithms**:
  - **Round Robin**: Implements time-sharing with user-defined time quantum.
  - **FCFS (First Come First Serve)**: Simple scheduling based on arrival time.
  - **SJF (Shortest Job First)**: Selects process with the shortest burst time.
  - **Priority Scheduling**: Assigns priority levels for scheduling.
- **Visualization**:
  - **Timeline Graph**: Displays the timeline of process execution based on scheduling.
  - **Stacked Bar Graph**: Shows entire process execution visually, combining subparts.
- **Automatic Process Naming**: Processes are auto-named (P1, P2, etc.) for simplicity.
- **CPU Utilization & Turnaround Time**: Calculate and display key metrics like average waiting time, turnaround time, and CPU utilization.



## Tech Stack

- **Frontend**: React (using Vite as a build tool)
- **Visualization**: recharts,react-chartjs-2,charts.js


## How to Run the Project

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/9623progress/os-visualization
   
