import React from "react";
import FCFS from "./components/FCFS";
import SJF from "./components/SJF";
import RoundRobin from "./components/RoundRobin";
import PriorityScheduling from "./components/PriorityScheduling";
import Home from "./components/Home";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/fcfs",
          element: <FCFS />,
        },
        {
          path: "/sjf",
          element: <SJF />,
        },
        {
          path: "/ps",
          element: <PriorityScheduling />,
        },
        {
          path: "/rr",
          element: <RoundRobin />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
