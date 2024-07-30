import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";

import { useTable, usePagination } from "react-table";
import Sidebar1 from "../../components/Sidebar1";
import { Heading, Img, Input } from "../../components";
import ReactPaginate from "react-paginate";
import { baseUrl } from "../../lib/utils";

const Header = ({ email }) => {
  return (
    <div className="flex items-center justify-between p-4 w-full">
      {/* <div className="text-lg font-semibold">Welcome back, Team!</div> */}
      <div className="relative">
        {/* <input
          type="text"
          placeholder="Search..."
          className="pl-10 pr-4 py-2 border rounded-md"
        />
        <svg
          className="absolute left-2 top-2 w-4 h-4 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.95 4.95a1 1 0 01-1.414 1.414l-4.95-4.95zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
            clipRule="evenodd"
          />
        </svg> */}
        {/* <Input
          name="search"
          placeholder={`Search...`}
          // value={formData.jobTitle}
          // onChange={handleInputChange}
          className="mt-[30px] h-[70px]  rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
          inputClassName="font-bold"
        /> */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Input
            name="search"
            placeholder={`Search...`}
            // value={formData.jobTitle}
            // onChange={handleInputChange}
            className="h-[70px]  rounded border-[0.5px] border-gray-200_03 pl-3.5 pr-[35px] text-sm font-bold text-cyan-900 sm:pr-5"
            inputClassName="font-bold"
            prefix={
              <img
                src="/images/search.svg"
                alt="search"
                className="h-[16px] pr-2"
                // onClick={toggleDropdown}
              />
            }
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Img src="/images/bell.svg" alt="bell-icon" className="" />
        <div className="text-gray-500">{email}</div>
      </div>
    </div>
  );
};

const data = [
  {
    customer: "Jack",
    domain: "Python",
    jobsApplied: 3,
    status: "Paid",
  },
  {
    customer: "Fort Myers",
    domain: "Data Science",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Benjamin",
    domain: "REACT",
    jobsApplied: 4,
    status: "Paid",
  },
  {
    customer: "Flanagan",
    domain: "Product Management",
    jobsApplied: 0,
    status: "Error",
  },
  {
    customer: "Nicoletti",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Robert",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Rankin",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 3,
    status: "Pending",
  },
  {
    customer: "Clementine",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Mitchell",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Jackk",
    domain: "Python",
    jobsApplied: 3,
    status: "Paid",
  },
  {
    customer: "Fort Myerss",
    domain: "Data Science",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Benjaminn",
    domain: "REACT",
    jobsApplied: 4,
    status: "Paid",
  },
  {
    customer: "Flanagann",
    domain: "Product Management",
    jobsApplied: 0,
    status: "Error",
  },
  {
    customer: "Nicolettii",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Robertt",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Rankinn",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 3,
    status: "Pending",
  },
  {
    customer: "Clementinee",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Mitchelll",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Alice",
    domain: "Web Development",
    jobsApplied: 5,
    status: "Paid",
  },
  {
    customer: "Bob",
    domain: "Mobile Development",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Charlie",
    domain: "Cybersecurity",
    jobsApplied: 1,
    status: "Pending",
  },
  {
    customer: "Dave",
    domain: "DevOps",
    jobsApplied: 4,
    status: "Error",
  },
  {
    customer: "Eve",
    domain: "Data Analysis",
    jobsApplied: 3,
    status: "Paid",
  },
  {
    customer: "Frank",
    domain: "Cloud Computing",
    jobsApplied: 2,
    status: "Pending",
  },
  {
    customer: "Grace",
    domain: "AI & ML",
    jobsApplied: 6,
    status: "Paid",
  },
  {
    customer: "Hank",
    domain: "Blockchain",
    jobsApplied: 1,
    status: "Error",
  },
  {
    customer: "Ivy",
    domain: "Networking",
    jobsApplied: 3,
    status: "Paid",
  },
  {
    customer: "Jackie",
    domain: "Python",
    jobsApplied: 4,
    status: "Paid",
  },
  {
    customer: "Ken",
    domain: "Data Science",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Laura",
    domain: "REACT",
    jobsApplied: 3,
    status: "Pending",
  },
  {
    customer: "Mason",
    domain: "Product Management",
    jobsApplied: 0,
    status: "Error",
  },
  {
    customer: "Nina",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Oscar",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Paul",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 3,
    status: "Pending",
  },
  {
    customer: "Quincy",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Riley",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Steve",
    domain: "Python",
    jobsApplied: 3,
    status: "Paid",
  },
  {
    customer: "Tim",
    domain: "Data Science",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Uma",
    domain: "REACT",
    jobsApplied: 4,
    status: "Paid",
  },
  {
    customer: "Violet",
    domain: "Product Management",
    jobsApplied: 0,
    status: "Error",
  },
  {
    customer: "Will",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
  {
    customer: "Xena",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 2,
    status: "Paid",
  },
  {
    customer: "Yara",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 3,
    status: "Pending",
  },
  {
    customer: "Zane",
    domain: "2371 Reppert Coal Road",
    jobsApplied: 1,
    status: "Paid",
  },
];

const CustomerCopy = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = localStorage.getItem("email") || "username";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${baseUrl}/dashboard/get_all_companies`
        ); // Replace with your API endpoint

        console.log("get_all_companies.data:", response.data);
        if (response.status === 200) setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Company name",
        accessor: "company_name",
      },
      {
        Header: "Location",
        accessor: "location",
      },

      {
        Header: "Job Posts",
        accessor: "total_jobs_count",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ cell: { value } }) => (
          <Heading
            as="p"
            className={`rounded-[12px] text-center !text-color-white !font-bold px-4 py-1 ${
              value !== "open" ? "bg-[#FCBE2D]" : "bg-teal-a700"
            }`}
          >
            {value}
          </Heading>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 8 }, // Pass our hoisted table state
    },
    usePagination
  );
  // return <
  return (
    <div className="flex p-4 bg-[#fdfdfd]">
      <Sidebar1 />
      <div className="" style={{ width: `calc(100vw - 291px)` }}>
        <Header email={email} />
        <Heading
          size="3xl"
          as="h1"
          className="text-[#2D2D2D] font-semibold pl-4 mt-9 mb-16"
        >
          Companies
        </Heading>
        <div className="p-4 bg-white-A700">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200 "
          >
            <thead className="bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    {error}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-4">
                    No data available
                  </td>
                </tr>
              ) : (
                page.map((row, index) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          key={index}
                          {...cell.getCellProps()}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={({ selected }) => gotoPage(selected)}
              containerClassName={"flex space-x-2"}
              pageClassName={"px-2 py-1 border rounded"}
              activeClassName={"bg-gray-500 text-color-white"}
              previousClassName={"px-2 py-1 border rounded"}
              nextClassName={"px-2 py-1 border rounded"}
              breakLinkClassName={"px-2 py-1 border rounded"}
            />
            <p className="text-center mt-2 text-gray-600">
              {pageIndex * pageSize + 1} -{" "}
              {Math.min((pageIndex + 1) * pageSize, data.length)} of{" "}
              {data.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCopy;
