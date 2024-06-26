import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div style={{ height: "100vh", padding: "20px", backgroundColor: "#232323", color: "white" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>Homepage</h1>
      {/* <p style={{ fontSize: "18px", marginBottom: "30px" }}>
        This project was generated By{" "}
        <a href="https://www.dhiwise.com" style={{ color: "#87CEFA", textDecoration: "none" }}>
          Dhiwise
        </a>
        . Quickly use below links to navigate through all pages.
      </p> */}
      <ul style={{ listStyle: "none", padding: "0" }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/signup" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Signup
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/signup1" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Signup1
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/homepage" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Homepage
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/createjob" style={{ color: "#87CEFA", textDecoration: "none" }}>
            CreateJob
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/createjob1" style={{ color: "#87CEFA", textDecoration: "none" }}>
            CreateJob1
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/createjob2" style={{ color: "#87CEFA", textDecoration: "none" }}>
            CreateJob2
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/createjob3" style={{ color: "#87CEFA", textDecoration: "none" }}>
            CreateJob3
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/candidate" style={{ color: "#87CEFA", textDecoration: "none" }}>
            Candidate
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/viewresume" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ViewResume
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/screeningtestone" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ScreeningtestOne
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/screeningtesttwo" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ScreeningtestTwo
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/screeningtestthree" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ScreeningtestThree
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/screeningtestfour" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ScreeningtestFour
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/screeningtestfive" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ScreeningtestFive
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/screeningtestsix" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ScreeningtestSix
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/screeningtesteight" style={{ color: "#87CEFA", textDecoration: "none" }}>
            ScreeningtestEight
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Home;
