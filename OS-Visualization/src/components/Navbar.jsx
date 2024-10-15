import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.style.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    navigate(selectedValue);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-home">
        Home
      </Link>

      <select
        name="visualization"
        aria-label="Choose a scheduling algorithm"
        onChange={handleSelectChange}
      >
        <option value="">Select scheduling Algorithm</option>
        <option value="/fcfs">First Come First Serve</option>
        <option value="/sjf">Non-preemptive Shortest Job First</option>
        <option value="/ps">Non-preemptive Priority Scheduling</option>
        <option value="/rr">Round Robin</option>
      </select>
    </nav>
  );
};

export default Navbar;
