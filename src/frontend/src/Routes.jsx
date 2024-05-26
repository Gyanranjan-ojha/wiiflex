import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Signup from "pages/Signup";
import Signup1 from "pages/Signup1";
import Homepage from "pages/Homepage";
import CreateJob from "pages/CreateJob";
import CreateJob1 from "pages/CreateJob1";
import CreateJob2 from "pages/CreateJob2";
import CreateJob3 from "pages/CreateJob3";
import Candidate from "pages/Candidate";
import ViewResume from "pages/ViewResume";
import ScreeningtestOne from "pages/ScreeningtestOne";
import ScreeningtestTwo from "pages/ScreeningtestTwo";
import ScreeningtestThree from "pages/ScreeningtestThree";
import ScreeningtestFour from "pages/ScreeningtestFour";
import ScreeningtestFive from "pages/ScreeningtestFive";
import ScreeningtestSix from "pages/ScreeningtestSix";
import ScreeningtestEight from "pages/ScreeningtestEight";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "createjob",
      element: <CreateJob />,
    },
    {
      path: "createjob1",
      element: <CreateJob1 />,
    },
    {
      path: "createjob2",
      element: <CreateJob2 />,
    },
    {
      path: "createjob3",
      element: <CreateJob3 />,
    },
    {
      path: "signup1",
      element: <Signup1 />,
    },
    {
      path: "homepage",
      element: <Homepage />,
    },
    {
      path: "candidate",
      element: <Candidate />,
    },
    {
      path: "viewresume",
      element: <ViewResume />,
    },
    {
      path: "screeningtestone",
      element: <ScreeningtestOne />,
    },
    {
      path: "screeningtesttwo",
      element: <ScreeningtestTwo />,
    },
    {
      path: "screeningtestthree",
      element: <ScreeningtestThree />,
    },
    {
      path: "screeningtestfour",
      element: <ScreeningtestFour />,
    },
    {
      path: "screeningtestfive",
      element: <ScreeningtestFive />,
    },
    {
      path: "screeningtestsix",
      element: <ScreeningtestSix />,
    },
    {
      path: "screeningtesteight",
      element: <ScreeningtestEight />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
