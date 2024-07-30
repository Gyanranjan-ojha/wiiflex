import React from "react";
import { Text } from "../Text";
import { Img } from "../Img";
import { Button } from "../Button";
import { useGoTo } from "../../lib/utils";
import { useLocation } from "react-router-dom";

const Navbar = ({ isScreenTestPage = false, id }) => {
  const user = localStorage.getItem("email") || "user";
  const goTo = useGoTo();
  const location = useLocation();

  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  console.log("isDashboardRoute:", isDashboardRoute);
  return (
    <nav className="sticky top-0 z-50 bg-white-A700 flex flex-col items-center self-stretch shadow-md">
      <div className="flex items-center relative justify-between w-full px-4 py-2 md:flex-col md:items-stretch md:py-5">
        <div
          className="flex-shrink-0 cursor-pointer"
          onClick={() => goTo(`/all-candidates/${id}`)}
        >
          <Img
            src="/images/img_wiiflex_softwar.png"
            alt="wiiflexsoftwar"
            className="h-[50px] object-cover md:w-full"
          />
        </div>
        {!isScreenTestPage && (
          <ul className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 flex-grow flex gap-[25px] justify-center items-start md:order-3 md:mt-4 md:space-x-0 md:space-y-3 md:flex-col">
            <li>
              <a
                href="/all-jobs"
                // className="text-light_blue-700 hover:scale-105 hover:text-light_blue-700 transition-transform duration-300"
                className={`hover:scale-105 transition-transform duration-300 ${
                  !isDashboardRoute
                    ? "text-light_blue-700"
                    : "text-gray-800 hover:text-light_blue-700"
                }`}
              >
                Active Jobs
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                // className="text-gray-800 hover:scale-105 hover:text-light_blue-700 transition-transform duration-300"
                className={`hover:scale-105 transition-transform duration-300 ${
                  isDashboardRoute
                    ? "text-light_blue-700"
                    : "text-gray-800 hover:text-light_blue-700"
                }`}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/dashboard-window"
                // className="text-gray-800 hover:scale-105 hover:text-light_blue-700 transition-transform duration-300"
                className={`hover:scale-105 transition-transform duration-300 ${
                  isDashboardRoute
                    ? "text-light_blue-700"
                    : "text-gray-800 hover:text-light_blue-700"
                }`}
              >
                Admin Dashboard
              </a>
            </li>
          </ul>
        )}
        <div className="flex items-center space-x-4 flex-shrink-0 md:order-2">
          {!isScreenTestPage && (
            <Button
              size="4xl"
              className="min-w-[100px] px-6 h-11 rounded-[25px] font-dmsans font-medium sm:px-5 transition-transform duration-300 hover:scale-105"
              onClick={() => goTo("/jobs/create/company-details")}
            >
              Post Job
            </Button>
          )}
          {!isScreenTestPage && (
            <a href="#">
              <Img
                src="/images/img_shape.svg"
                alt="shape"
                className="h-[20px]"
              />
            </a>
          )}
          <div className="flex items-center">
            <div className="flex flex-col rounded-[23px] bg-gray-200">
              <a href="#">
                <Img
                  src="/images/img_rectangle.png"
                  alt="image"
                  className="h-11 w-11 rounded-[22px] object-cover"
                />
              </a>
            </div>
            <Text
              as="p"
              className="ml-2.5 !text-cyan-900 max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap"
              title="John Doe"
            >
              {user}
            </Text>
          </div>
        </div>
      </div>

      <div className="h-px w-full self-stretch bg-gray-500_19" />
    </nav>
  );
};

export default Navbar;
