const algo = [
  {
    heading: "First Come First Serve (FCFS) Algorithm",
    info: "First Come First Serve (FCFS) is the simplest CPU scheduling algorithm in operating systems. In FCFS, processes are executed in the order they arrive, without considering their priority or burst time. Once a process starts executing, it runs to completion before the next one begins.While easy to implement, FCFS can lead to issues like the convoy effect,where shorter processes get delayed by longer ones, resulting ininefficient CPU utilization and higher waiting times for shorter tasks.",
    example: [
      "Imagine you're at a movie ticket counter, and there’s a queue of people. The counter follows the First Come, First Serve principle: whoever arrives first gets their ticket first. No matter if the first person takes a long time or the next person needs just a quick confirmation, they serve the first person fully before moving on to the next. ",
      "In FCFS CPU scheduling, processes are like people in the queue. The process that arrives first is executed first, and it runs until it finishes. The next process has to wait until the previous one completes, regardless of how long each process takes.",
    ],
    url: "/fcfs",
  },
  {
    heading: "Non-Preemptive Shortest Job First (SJF)",
    info: "Non-Preemptive Shortest Job First (SJF) is a CPU scheduling algorithm where the process with the shortest burst time (execution time) is selected for execution next. Once the CPU starts executing a process, it runs until completion without being interrupted, even if a new process with a shorter burst time arrives during its execution.",
    example: [
      "Imagine you're at a coffee shop where customers are served based on how quickly their orders can be prepared. Instead of serving in the order they arrive, the barista decides to serve the person with the shortest order first. If one customer only wants a cup of black coffee, they’ll be served before someone who orders a complex latte, even if they arrived later. Once the barista starts working on a customer's order, they finish it before moving on to the next.",

      "In SJF CPU scheduling, processes are treated like customer orders. The process with the shortest burst time (execution time) is executed first, even if it arrived after other processes. Once a process starts, it runs to completion before the next shortest process is chosen.",
    ],
    url: "sjf",
  },
  {
    heading: "Non-Preemptive Priority Scheduling",
    info: "Non-Preemptive Priority Scheduling is a CPU scheduling algorithm where processes are assigned priorities, and the process with the highest priority is selected for execution. Once a process starts execution, it runs to completion without being interrupted, even if a new process with a higher priority arrives.",
    example: [
      "Imagine you're at a hospital emergency room where patients are treated based on the severity of their condition, not based on when they arrived. If someone with a minor injury arrived before a patient in critical condition, the doctors would treat the critically ill patient first. Once the doctor starts treating a patient, they don’t stop until they are fully treated, even if another more critical patient arrives later.",
      "In Priority Scheduling (Non-preemptive), processes are treated like patients in the emergency room. Each process is assigned a priority, and the one with the highest priority is executed first. Once a process starts running, it completes before the next highest priority process is selected, regardless of when other processes arrive.",
    ],
    url: "ps",
  },
  {
    heading: "Round Robin (RR)",
    info: "Round Robin (RR) is a CPU scheduling algorithm designed to handle time-sharing systems. It assigns a fixed time unit, called a time quantum or time slice, to each process in the ready queue. The CPU cycles through all the processes, giving each a fair share of the CPU for the duration of the time quantum.",
    example: [
      "Imagine you're playing a game at a playground where everyone takes turns on the swing. Each child gets a fixed amount of time on the swing, say 5 minutes, and then they have to let the next person take their turn. If someone doesn't finish swinging in their allotted time, they go to the back of the line and wait for another turn, but everyone gets a chance to swing in equal time slices.",
      "In Round Robin CPU scheduling, processes are like the children on the swing. Each process is given a fixed time quantum (like 5 minutes on the swing). If a process isn't done within that time, it’s paused and placed at the end of the queue while the next process gets a turn. This continues in a cyclic manner, ensuring every process gets a fair share of the CPU time.",
    ],
    url: "rr",
  },
];

export default algo;
