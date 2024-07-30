import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="ml-2 mt-2">
      <h1>Welcome to Wiiflex!</h1>
      <br />
      <p>
        We are currently in the <strong>development</strong> phase. Please feel
        free to start using our platform:
      </p>
      <br />
      <Link to="/sign-up" style={{ color: "blue", textDecoration: "none" }}>
        Sign Up
      </Link>
      <Link to="/sign-in" style={{ color: "blue", textDecoration: "none" }}>
        Sign In
      </Link>
      {/* <Link
        to="/dashboard-window"
        style={{ color: "blue", textDecoration: "none" }}
      >
        Dashboard Page
      </Link>
      <Link
        to="/dashboard-profile"
        style={{ color: "blue", textDecoration: "none" }}
      >
        Profile Page
      </Link>
      <Link
        to="/candidate-data"
        style={{ color: "blue", textDecoration: "none" }}
      >
        Candidates data Page
      </Link> */}
      {/* <Link to="/welcome/123" style={{ color: "blue", textDecoration: "none" }}>
        Welcome Page
      </Link> */}
    </div>
  );
};
export default Home;
