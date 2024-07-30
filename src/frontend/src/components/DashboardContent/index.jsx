import React, { useEffect, useState } from "react";
import StatCard from "../StatCard";
import JobsTable from "../JobsTable";
import { Text } from "../Text";
import { useGoTo } from "../../lib/utils";
import axios from "axios";
import { baseUrl } from "../../lib/utils";

const DashboardContent = () => {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem("email") || "";
        const response = await axios.get(
          `${baseUrl}/dashboard/get_jobs_screen_tests/?email=${email}`
        );
        if (response.status === 200) {
          console.log(
            "fetchDashboardData fetched successfully:",
            response.data
          );
          setDashboardData(response.data);
        } else {
          console.error("Failed to fetch data with status:", response.status);
          alert(`Failed to fetch data (${response.status})`);
        }
      } catch (err) {
        console.error("Error fetching data in Dashboard:", err);
        alert(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  console.log("dashboardData.job_data:", dashboardData.job_data);
  return (
    <div className="p-8 space-y-6 w-[78%] bg-[#e5edf9]">
      <Text className="text-xl !font-bold !text-cyan-900 pb-5">Overview</Text>
      <div className="grid grid-cols-4 gap-y-8 gap-x-5">
        <StatCard
          total_screening_tests_count={
            dashboardData ? dashboardData.total_screening_tests_count : 0
          }
          title="Screen Test Sent"
          number="33"
          iconSrc="/images/Illustrations_one.svg"
        />
        <StatCard
          total_screening_tests_count={0}
          title="Interview Scheduled"
          number="2"
          iconSrc="/images/Illustrations_two.svg"
        />
        <StatCard
          total_screening_tests_count={0}
          title="Interview Feedback Pending"
          number="2"
          iconSrc="/images/Illustrations_three.svg"
        />
        <StatCard
          total_screening_tests_count={0}
          title="Approval Pending"
          number="2"
          iconSrc="/images/Illustrations_four.svg"
        />
        <StatCard
          total_screening_tests_count={0}
          title="Offer Acceptance Pending"
          number="2"
          iconSrc="/images/Illustrations_five.svg"
        />
        <StatCard
          total_screening_tests_count={0}
          title="Documentation Pending"
          number="2"
          iconSrc="/images/Illustrations_six.svg"
        />
        <StatCard
          total_screening_tests_count={0}
          title="Training Pending"
          number="2"
          iconSrc="/images/Illustrations_seven.svg"
        />
        <StatCard
          total_screening_tests_count={0}
          title="Supervisor Allocation Pending"
          number="2"
          iconSrc="/images/Illustrations_eight.svg"
        />
      </div>
      <Text className="text-xl !font-bold !text-cyan-900 py-2">
        Require Attention
      </Text>

      {!dashboardData.job_data ? (
        <div>Loading...</div>
      ) : (
        <JobsTable jobsData={dashboardData.job_data} />
      )}
    </div>
  );
};

export default DashboardContent;
