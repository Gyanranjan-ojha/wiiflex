import ErrorBoundary from "../../components/ErrorBoundry";
import Navbar from "../../components/Navbar";
import UpcomingMeetings from "../../components/UpcomingMeetings";
import DashboardContent from "../../components/DashboardContent";

const Dashboard = () => {
  return (
    <ErrorBoundary>
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="flex">
          <DashboardContent />
          <UpcomingMeetings />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;
