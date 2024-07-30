import { Helmet } from "react-helmet";
import { CloseSVG } from "../../assets/images";
import { Heading, SelectBox, Img, Input } from "../../components";
import { ReactTable } from "../../components/ReactTable";
import Sidebar2 from "../../components/Sidebar2";
import Sidebar1 from "../../components/Sidebar1";
import { createColumnHelper } from "@tanstack/react-table";
import React, { Fragment, useEffect, useState } from "react";
import { baseUrl, useGoTo } from "../../lib/utils";
import axios from "axios";

const dropDownOptions = [
  { label: "Option1", value: "option1" },
  { label: "Option2", value: "option2" },
  { label: "Option3", value: "option3" },
];
const tableData = [
  {
    roleName: "Sr. Data Scientist",
    location: "Hyderabad",
    dateText: "12/02/2024 ",
    numberText: "3",
    salaryText: "$0",
    statusText: "Delivered",
  },
  {
    roleName: "Full-Stack Developer",
    location: "Pune",
    dateText: "12/02/2024 ",
    numberText: "1",
    salaryText: "$0",
    statusText: "Pending",
  },
  {
    roleName: "Sr. Python Developer",
    location: "Bengaluru",
    dateText: "12/02/2024 ",
    numberText: "4",
    salaryText: "$0",
    statusText: "Pending",
  },
];
const mockData = [
  {
    title: "Total Candidates",
    logo: "/images/card_one_logo.svg", // Placeholder for logo image
    number: "0",
    trend: 0,
    trendText: "Up from yesterday",
    trendType: "up",
  },
  {
    title: "Total Jobs",
    logo: "/images/card_two_logo.svg", // Placeholder for logo image
    number: "0",
    trend: 0,
    trendText: "Up from past week",
    trendType: "up",
  },
  // {
  //   title: "Total Sales",
  //   logo: "/images/card_three_logo.svg", // Placeholder for logo image
  //   number: "$0",
  //   trend: -0,
  //   trendText: "Down from yesterday",
  //   trendType: "down",
  // },
  {
    title: "Pending Jobs",
    logo: "/images/card_four_logo.svg", // Placeholder for logo image
    number: "0",
    trend: 0,
    trendText: "Up from yesterday",
    trendType: "up",
  },
];

const Card = ({
  title,
  logo,
  number,
  trend,
  trendText,
  trendType,
  onClick,
  adminData,
}) => {
  let displayNumber;
  if (title === "Total Jobs") {
    displayNumber = adminData?.total_jobs_count ?? 0;
  } else if (title === "Total Candidates") {
    displayNumber = adminData?.total_candidates_count ?? 0;
  } else if (title === "Pending Jobs") {
    displayNumber = adminData?.total_pending_jobs_count ?? 0;
  } else {
    displayNumber = number;
  }

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-color-white h-auto rounded-xl shadow-md p-4 flex flex-col justify-between w-64 relative transition-transform duration-300 ease-in-out hover:-translate-y-1"
    >
      <div className="flex items-center mb-4">
        <h2 className="text-sm font-bold text-gray-500 flex-1">{title}</h2>
        <img src={logo} alt="logo" className="h-12 w-12" />
      </div>
      <div className="text-3xl font-bold mb-2">{displayNumber}</div>
    </div>
  );
};

export default function DashboardData() {
  const goTo = useGoTo();
  const [adminData, setAdminData] = useState([]);
  const [priorityJobs, setpriorityJobs] = useState([]);

  const email = localStorage.getItem("email") || "username";

  const [searchBarValue, setSearchBarValue] = React.useState("");
  const tableColumns = React.useMemo(() => {
    const tableColumnHelper = createColumnHelper();
    return [
      tableColumnHelper.accessor("role_name", {
        cell: (info) => (
          <Heading as="p" className="!text-gray-900_cc">
            {info?.getValue?.()}
          </Heading>
        ),
        header: (info) => (
          <Heading
            as="p"
            className="py-3 pl-6 !font-bold text-left !text-gray-900 sm:pl-5"
          >
            Role Name
          </Heading>
        ),
        meta: { width: "236px" },
      }),
      tableColumnHelper.accessor("city", {
        cell: (info) => (
          <Heading as="p" className="!text-gray-900_cc">
            {info?.getValue?.()}
          </Heading>
        ),
        header: (info) => (
          <Heading
            as="p"
            className="py-3 pl-6 text-left !font-bold !text-gray-900"
          >
            Location
          </Heading>
        ),
        meta: { width: "218px" },
      }),
      tableColumnHelper.accessor("created_at", {
        cell: (info) => (
          <Heading as="p" className="!text-gray-900_cc">
            {info?.getValue?.()}
          </Heading>
        ),
        header: (info) => (
          <Heading
            as="p"
            className="py-3 pl-6 text-left !font-bold !text-gray-900"
          >
            Date{" "}
          </Heading>
        ),
        meta: { width: "228px" },
      }),
      tableColumnHelper.accessor("no_of_candidates", {
        cell: (info) => (
          <Heading as="p" className="!text-gray-900_cc">
            {info?.getValue?.()}
          </Heading>
        ),
        header: (info) => (
          <Heading
            as="p"
            className="py-3 pl-5 text-left !font-bold !text-gray-900"
          >
            No.
          </Heading>
        ),
        meta: { width: "108px" },
      }),
      tableColumnHelper.accessor("salary", {
        cell: (info) => (
          <Heading as="p" className="!text-gray-900_cc">
            {info?.getValue?.()}
          </Heading>
        ),
        header: (info) => (
          <Heading
            as="p"
            className="pb-2.5 pt-3.5 pl-6 text-left !font-bold !text-gray-900"
          >
            Salary
          </Heading>
        ),
        meta: { width: "154px" },
      }),
      tableColumnHelper.accessor("status", {
        cell: (info) => (
          <Heading
            as="p"
            className={`rounded-[12px] text-center !text-color-white !font-bold px-4 py-1 ${
              info?.getValue?.() === "Pending" ? "bg-[#FCBE2D]" : "bg-teal-a700"
            }`}
          >
            {info?.getValue?.()}
          </Heading>
        ),
        header: (info) => (
          <Heading
            as="p"
            className="py-3 pl-[26px] pr-[34px] !font-bold !text-gray-900 sm:px-5"
          >
            Status
          </Heading>
        ),
        meta: { width: "130px" },
      }),
    ];
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/dashboard/get_admin_data`
          // {
          //   params: { question: searchString },
          // }
        );

        if (response.status === 200) {
          console.log("response.data:", response.data);
          if (response.data?.priority_jobs.length) {
            setpriorityJobs(response.data.priority_jobs);
          }
          return response.data;
        }
        return [];
      } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
      }
    };
    fetchAdminData().then(setAdminData);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Manage Your E-commerce and Tasks</title>
        <meta
          name="description"
          content="Access your admin dashboard to manage products, orders, and tasks efficiently. Keep track of your e-commerce performance, stock levels, and team activities all in one place."
        />
      </Helmet>
      <div className="flex h-auto w-full items-start md:h-auto">
        {/* sidebar section */}
        <Sidebar1 />

        {/* header section */}
        <div
          className="bg-gray-100 min-h-screen h-auto"
          style={{ width: `calc(100vw - 291px)` }}
        >
          <div className="h-full md:h-auto">
            <div className="mb-[86px] flex flex-col gap-6">
              <header>
                <div className="flex items-end gap-5 bg-color-white px-[30px] py-3 md:flex-col sm:px-5">
                  <div className="flex w-full items-center justify-end gap-5 md:w-full">
                    <div className="flex justify-center items-center">
                      <button
                        className="flex items-center justify-center bg-blue-600 text-color-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700"
                        onClick={() => goTo(`/jobs/create/company-details`)}
                      >
                        <svg
                          className="h-6 w-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                        Post a job
                      </button>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        className="flex items-center justify-center bg-blue-600 text-color-white font-bold py-2 px-4 rounded shadow hover:bg-blue-700"
                        // onClick={() => goTo(`/dashboard-profile`)}
                        onClick={() => goTo(`/form-content`)}
                      >
                        <svg
                          className="h-6 w-6 mr-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                        Post an applicant
                      </button>
                    </div>
                    <div className="flex w-auto items-center justify-center gap-[18px] self-center">
                      <a href="#">
                        <Img
                          src="/images/img_mobile.svg"
                          alt="mobile image"
                          className="h-[44px] w-[44px]"
                        />
                      </a>
                      <div className="flex flex-1 items-center justify-center gap-4">
                        <div className="flex flex-1 flex-col items-start">
                          <Heading as="p" className="!font-bold !text-gray-800">
                            {email}
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-gray-700_01"
                          >
                            Admin
                          </Heading>
                        </div>
                        <a href="#">
                          <Img
                            src="/images/nav-more-icon.svg"
                            alt="mobile image"
                            className="h-[18px] w-[18px]"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <div className="px-[30px] sm:px-5 h-auto">
                <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
                <div className="flex space-x-6  h-auto pb-3">
                  {mockData.map((item, index) => {
                    const handleClick = () => {
                      console.log("handleClick:");
                      if (item.title === "Total Jobs") goTo("/jobs-data");
                      else if (item.title === "Total Candidates")
                        goTo("/candidate-data");
                      else if (item.title === "Pending Jobs")
                        goTo("/jobs-data");
                    };
                    return (
                      <Card
                        key={index}
                        title={item.title}
                        logo={item.logo}
                        number={item.number}
                        trend={item.trend}
                        trendText={item.trendText}
                        trendType={item.trendType}
                        onClick={handleClick}
                        adminData={adminData}
                      />
                    );
                  })}
                </div>
              </div>

              {/* sales chart section */}
              {/* <div className="px-[30px] sm:px-5">
                <div className="flex flex-col gap-9 rounded-[14px] bg-color-white p-7 shadow-md sm:p-5">
                  <div className="flex items-center justify-between gap-5">
                    <Heading
                      size="headingmd"
                      as="h1"
                      className="!text-gray-900"
                    >
                      Sales Details
                    </Heading>
                    <SelectBox
                      shape="round"
                      indicator={
                        <Img
                          src="/images/img_arrowdown.svg"
                          alt="arrow_down"
                          className="h-[10px] w-[10px] ml-2"
                        />
                      }
                      name="Month Dropdown"
                      placeholder={`October`}
                      options={dropDownOptions}
                      className="w-[12%] h-7 pr-[15px] border-[0.6px] border-solid border-blue_gray-100_03 font-semibold sm:pr-5"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="flex items-start justify-between gap-5 md:flex-col">
                      <div className="flex flex-col items-start gap-10">
                        <Heading
                          size="headingxs"
                          as="h2"
                          className="!text-blue_gray-900_66"
                        >
                          100%
                        </Heading>
                        <Heading
                          size="headingxs"
                          as="h3"
                          className="!text-blue_gray-900_66"
                        >
                          80%
                        </Heading>
                        <Heading
                          size="headingxs"
                          as="h4"
                          className="!text-blue_gray-900_66"
                        >
                          60%
                        </Heading>
                        <Heading
                          size="headingxs"
                          as="h5"
                          className="!text-blue_gray-900_66"
                        >
                          40%
                        </Heading>
                        <Heading
                          size="headingxs"
                          as="h6"
                          className="!text-blue_gray-900_66"
                        >
                          20%
                        </Heading>
                      </div>
                      <div className="mt-2 flex flex-1 flex-col gap-4 self-end md:self-stretch sm:self-auto">
                        <div className="opacity-70">
                          <div className="flex flex-col items-start gap-1">
                            <div className="h-px self-stretch border-[0.5px] border-solid border-gray-200 bg-color-white" />
                            <div className="ml-[242px] flex h-[26px] items-start bg-[url(/public/images/img_top_sale.svg)] bg-cover bg-no-repeat md:ml-0 md:h-auto">
                              <Heading
                                size="headingxs"
                                as="p"
                                className="mb-1.5 !font-bold"
                              >
                                64,3664.77
                              </Heading>
                            </div>
                            <div className="relative h-[204px] self-stretch">
                              <Img
                                src="/images/img_graph.png"
                                alt="graph image"
                                className="absolute bottom-[1.36px] left-0 right-0 m-auto h-[194px] flex-1 object-cover"
                              />
                              <Img
                                src="/images/img_point.svg"
                                alt="point image"
                                className="absolute bottom-0 left-[0.00px] top-0 my-auto h-[204px] w-[94%]"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mr-9 flex flex-wrap justify-between gap-5 md:mr-0">
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            5k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            10k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            15k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            20k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            25k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            30k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            35k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            40k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            45k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            50k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            55k
                          </Heading>
                          <Heading
                            size="headingxs"
                            as="p"
                            className="!text-blue_gray-900_66"
                          >
                            60k
                          </Heading>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* priority tasks section */}
              <div className="px-[30px] sm:px-5">
                <div className="flex flex-col gap-6 rounded-[14px] bg-color-white p-[30px] shadow-md sm:p-5">
                  <div className="flex items-start justify-between gap-5">
                    <Heading
                      size="headingmd"
                      as="h4"
                      className="self-center !text-gray-900"
                    >
                      Top Priority
                    </Heading>
                    {/* <SelectBox
                      shape="round"
                      indicator={
                        <Img
                          src="/images/img_arrowdown.svg"
                          alt="arrow_down"
                          className="h-[10px] w-[10px] ml-2"
                        />
                      }
                      name="Priority Dropdown"
                      placeholder={`October`}
                      options={dropDownOptions}
                      className="w-[12%] h-7 pr-[15px] border-[0.6px] border-solid border-blue_gray-100_03 font-semibold sm:pr-5"
                      menuClassName="w-80"
                    /> */}
                  </div>
                  {priorityJobs.length ? (
                    <ReactTable
                      size="xs"
                      bodyProps={{ className: "" }}
                      headerProps={{
                        className: "bg-gray-100_01 flex-wrap rounded-[12px]",
                      }}
                      rowDataProps={{ className: "flex-wrap" }}
                      className="md:whitespace-no-wrap mb-1.5 md:block md:overflow-x-auto"
                      columns={tableColumns}
                      // data={tableData}
                      data={priorityJobs}
                    />
                  ) : (
                    <p>No Data Found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
