import React, { useState } from "react";

function enrichJobData(jobData) {
  return jobData.map((job) => {
    return {
      name: job.name || "N/A",
      created_date: job.created_date || "N/A",
      no_of_candidates: job.no_of_candidates || "N/A",
      applications: job.applications || "N/A",
      interviewed: job.interviewed || "N/A",
      rejected: job.rejected || "N/A",
      feedbackPending: job.feedbackPending || "N/A",
      offered: job.offered || "N/A",
    };
  });
}

const JobsTable = ({ jobsData }) => {
  const [activeTab, setActiveTab] = useState("jobs");

  const data = {
    jobs: enrichJobData(jobsData),

    candidates: [
      {
        name: "Steve Morgan",
        created_date: "N/A",
        no_of_candidates: "N/A",
        applications: "N/A",
        interviewed: "N/A",
        rejected: "N/A",
        feedbackPending: "N/A",
        offered: "N/A",
      },
    ],
    onboarding: [
      {
        name: "N/A",
        created_date: "N/A",
        no_of_candidates: "N/A",
        applications: "N/A",
        interviewed: "N/A",
        rejected: "N/A",
        feedbackPending: "N/A",
        offered: "N/A",
      },
    ],
  };

  function formatDateDifference(inputDate) {
    const today = new Date(); // Get the current date
    const givenDate = new Date(inputDate); // Convert input string to a Date object

    // Check if the givenDate is an Invalid Date
    if (isNaN(givenDate.getTime())) {
      return "N/A"; // Return "N/A" if the date is not valid
    }

    const differenceInTime = today - givenDate; // Difference in milliseconds
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // Convert milliseconds to days

    if (differenceInDays === 0) {
      return "today";
    } else if (differenceInDays === 1) {
      return "yesterday";
    } else {
      return `${differenceInDays} days ago`;
    }
  }

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          className={`p-2 text-gray-500 font-medium ${
            activeTab === "jobs"
              ? "border-b-2 border-[#F7AC25] !text-cyan-900"
              : "border-b-2 border-transparent"
          } hover:text-cyan-900 `}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs
        </button>
        <button
          className={`p-2 text-gray-500 font-medium ${
            activeTab === "candidates"
              ? "border-b-2 border-[#F7AC25] !text-cyan-900"
              : "border-b-2 border-transparent"
          } hover:text-cyan-900 `}
          onClick={() => setActiveTab("candidates")}
        >
          Candidates
        </button>
        <button
          className={`p-2 text-gray-500 font-medium ${
            activeTab === "onboarding"
              ? "border-b-2 border-[#F7AC25] !text-cyan-900"
              : "border-b-2 border-transparent"
          } hover:text-cyan-900 `}
          onClick={() => setActiveTab("onboarding")}
        >
          Onboarding
        </button>
      </div>
      <div className="w-full">
        <table className="w-full bg-white !rounded-lg shadow leading-normal !text-sm">
          <thead>
            <tr className="text-left">
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff]  text-sm leading-4 font-medium text-gray-600 uppercase w-[200px]">
                Role
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff] text-center text-sm leading-4 font-medium text-gray-600 uppercase">
                Posted
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff] text-center text-sm leading-4 font-medium text-gray-600 uppercase">
                Positions Left
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff] text-center text-sm leading-4 font-medium text-gray-600 uppercase">
                Applications
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff] text-center text-sm leading-4 font-medium text-gray-600 uppercase">
                Interviewed
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff] text-center text-sm leading-4 font-medium text-gray-600 uppercase">
                Rejected
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff] text-center text-sm leading-4 font-medium text-gray-600 uppercase">
                Feedback Pending
              </th>
              <th className="px-2 py-3 border-b-2 border-gray-200 bg-[#f3f8ff] text-center text-sm leading-4 font-medium text-gray-600 uppercase">
                Offered
              </th>
            </tr>
          </thead>
          <tbody className="bg-[#f3f8ff] !text-sm">
            {data[activeTab].map((item, index) => (
              <tr key={index} className="bg-white hover:bg-gray-100">
                {console.log("item:", item)}
                <td className="p-2 py-2 border-b border-gray-200 font-bold text-sm flex items-center min-h-[56px] w-[200px] break-all">
                  <div
                    className="flex items-center justify-center  bg-[#B3C6ED] rounded-full mr-2"
                    style={{ width: "40px", height: "24px" }}
                  >
                    <img
                      src="/images/bag.png"
                      alt="icon"
                      className="h-6 w-6 object-contain p-[5px]"
                    />
                  </div>
                  {item.name}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 font-bold !text-sm text-center">
                  {item.created_date
                    ? formatDateDifference(item.created_date)
                    : "N/A"}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 !text-sm text-center">
                  {item.no_of_candidates}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 !text-sm text-center">
                  {item.applications}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 !text-sm text-center">
                  {item.interviewed}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 !text-sm text-center">
                  {item.rejected}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 !text-sm text-center">
                  {item.feedbackPending}
                </td>
                <td className="px-5 py-2 border-b border-gray-200 !text-sm text-center">
                  {item.offered}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;
