import { useRoutes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUpPage";
import SignIn from "./pages/SignIn";
import Signup1 from "./pages/Signup1";
import CreateJob from "./pages/CreateJob";
import CreateJobOne from "./pages/CreateJobOne";
import CreateJobTwo from "./pages/CreateJobTwo";
import CreateJobThree from "./pages/CreateJobThree";
import Candidate from "./pages/Candidate";
import ViewResume from "./pages/ViewResume";
import ScreeningtestOne from "./pages/ScreeningtestOne";
import ScreeningtestTwo from "./pages/ScreeningtestTwo";
import ScreeningtestThree from "./pages/ScreeningtestThree";
import Dashboard from "./pages/Dashboard";
import WelcomePage from "./pages/Welcome";
import VerifyEmailPage from "./pages/VerifyEmail";
import AllJobs from "./pages/AllJobs";
import AllCandidates from "./pages/AllCandidates";
import ScreenTestSentCandidates from "./pages/ScreenTestSentCandidates";
import DashboardData from "./pages/DashboardData";
import DashboardProfilePage from "./pages/DashboardProfile";
import Customer from "./pages/Customer";
import CustomerCopy from "./pages/CustomerCopy";
import CustomerCopyCopy from "./pages/CustomerCopyCopy";
import FormStepsPage from "./pages/FormContent";

const ProtectedRoute = ({ children }) => {
  const email = localStorage.getItem("email");

  if (!email) {
    // Redirect them to the home page, but save the current location they were
    // trying to go to. This could be used for post-login redirection.
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <Home /> },
    { path: "*", element: <NotFound /> },
    {
      path: "/sign-up",
      element: <SignUp />,
    },
    {
      path: "/sign-in",
      element: <SignIn />,
    },
    {
      path: "/verify-email",
      element: (
        <ProtectedRoute>
          <VerifyEmailPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/welcome/:token",
      element: (
        <ProtectedRoute>
          <WelcomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/jobs/create/company-details",
      element: (
        <ProtectedRoute>
          <CreateJob />
        </ProtectedRoute>
      ),
    },
    {
      path: "/jobs/create/job-details",
      element: (
        <ProtectedRoute>
          <CreateJobOne />
        </ProtectedRoute>
      ),
    },
    {
      path: "/jobs/create/candidate-req",
      element: (
        <ProtectedRoute>
          <CreateJobTwo />
        </ProtectedRoute>
      ),
    },
    {
      path: "/jobs/create/desc",
      element: (
        <ProtectedRoute>
          <CreateJobThree />
        </ProtectedRoute>
      ),
    },
    {
      path: "/signup1",
      element: (
        <ProtectedRoute>
          <Signup1 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/all-candidates/:jobId",
      element: (
        <ProtectedRoute>
          <AllCandidates />
        </ProtectedRoute>
      ),
    },
    {
      path: "/all-jobs",
      element: (
        <ProtectedRoute>
          <AllJobs />
        </ProtectedRoute>
      ),
    },
    {
      path: "/candidate/:jobId",
      element: (
        <ProtectedRoute>
          <Candidate />
        </ProtectedRoute>
      ),
    },
    {
      path: "/viewresume/:jobId",
      element: (
        <ProtectedRoute>
          <ViewResume />
        </ProtectedRoute>
      ),
    },
    {
      path: "/screeningtestone/:jobId",
      element: (
        <ProtectedRoute>
          <ScreeningtestOne />
        </ProtectedRoute>
      ),
    },
    {
      path: "/screeningtesttwo/:jobId",
      element: (
        <ProtectedRoute>
          <ScreeningtestTwo />
        </ProtectedRoute>
      ),
    },
    {
      path: "/screeningtestthree/:jobId",
      element: (
        <ProtectedRoute>
          <ScreeningtestThree />
        </ProtectedRoute>
      ),
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/screen-test-sent/candidates",
      element: (
        <ProtectedRoute>
          <ScreenTestSentCandidates />
        </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard-window",
      element: (
        // <ProtectedRoute>
        <DashboardData />
        // </ProtectedRoute>
      ),
    },
    {
      path: "/dashboard-profile/:id",
      element: (
        // <ProtectedRoute>
        <DashboardProfilePage />
        //</ProtectedRoute>
      ),
    },
    {
      path: "/candidate-data",
      element: (
        // <ProtectedRoute>
        <Customer />
        //</ProtectedRoute>
      ),
    },
    {
      path: "/company-data",
      element: (
        // <ProtectedRoute>
        <CustomerCopy />
        //</ProtectedRoute>
      ),
    },
    {
      path: "/jobs-data",
      element: (
        // <ProtectedRoute>
        <CustomerCopyCopy />
        //</ProtectedRoute>
      ),
    },
    {
      path: "/form-content",
      element: (
        // <ProtectedRoute>
        <FormStepsPage />
        //</ProtectedRoute>
      ),
    },
  ]);

  return element;
};

export default ProjectRoutes;
