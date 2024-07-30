import { Text, Heading, Img } from "./..";
import React, { useState } from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";
import { baseUrl, useGoTo } from "../../lib/utils";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function Sidebar1({ ...props }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const location = useLocation();

  const goTo = useGoTo();

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}

  const handleLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/accounts/logout/`);

      if (response.status === 200) {
        // alert("Account created successfully.");
        setError("");
        goTo("/sign-up");
        localStorage.removeItem("candidateId");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Internal server error.");
      } else {
        setError("Something went wrong! please try again.");
      }
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar
      {...props}
      width="274px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      rootStyles={{ [`.${sidebarClasses.container}`]: { gap: 30 } }}
      className={`${props.className} flex flex-col h-screen pt-8 gap-[30px] top-0 sm:pt-5 bg-white-A700 shadow-xs !sticky overflow-auto`}
    >
      <Img
        src="/images/img_sidebar_logo.png"
        alt="sidebar logo"
        className="h-[50px] w-[116px] object-contain"
      />
      <Menu
        menuItemStyles={{
          button: {
            padding: "10px",
            gap: "16px",
            color: "#7c8493",
            fontWeight: 500,
            fontSize: "16px",
            [`&:hover, &.ps-active`]: {
              color: "#4640de",
              backgroundColor: "#e9ebfd !important",
            },
          },
        }}
        className="w-full self-stretch pb-4 pr-4"
      >
        <div className="flex flex-col gap-[0.22px]">
          <MenuItem
            icon={
              <Img
                src="/images/img_home.svg"
                alt="home icon"
                className="h-[24px] w-[24px]"
              />
            }
            onClick={() => goTo(`/dashboard-window`)}
            className={
              location.pathname === "/dashboard-window" ? "bg-[#e9ebfd]" : ""
            }
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={
              <Img
                src="/images/img_icon_neutrals_60.svg"
                alt="jobs icon"
                className="h-[24px] w-[24px]"
              />
            }
            // suffix={
            //   <div className="flex items-center text-white-A700 w-[24px] h-[24px] flex-col justify-center rounded-[12px] bg-brands-primary">
            //     <div className="!font-epilogue">1</div>
            //   </div>
            // }
            onClick={() => goTo(`/jobs-data`)}
            className={location.pathname === "/jobs-data" ? "bg-[#e9ebfd]" : ""}
          >
            Jobs
          </MenuItem>
          <MenuItem
            icon={
              <Img
                src="/images/img_icon_neutrals_60_24x24.svg"
                alt="candidates icon"
                className="h-[24px] w-[24px]"
              />
            }
            onClick={() => goTo(`/candidate-data`)}
            className={
              location.pathname === "/candidate-data" ? "bg-[#e9ebfd]" : ""
            }
          >
            Candidates
          </MenuItem>

          {/* <MenuItem
              icon={
                <Img
                  src="/images/img_rewind_neutrals_60.svg"
                  alt="admin icon"
                  className="h-[24px] w-[24px]"
                />
              }
            >
              Admin
            </MenuItem> */}

          <MenuItem
            icon={
              <Img
                src="/images/img_icon_24x24.svg"
                alt="companies icon"
                className="h-[24px] w-[24px]"
              />
            }
            onClick={() => goTo(`/company-data`)}
            className={
              location.pathname === "/company-data" ? "bg-[#e9ebfd]" : ""
            }
          >
            Browse Companies
          </MenuItem>

          {/* <MenuItem
              icon={
                <Img
                  src="/images/img_search_neutrals_60_24x24.svg"
                  alt="profile icon"
                  className="h-[24px] w-[24px]"
                />
              }
            >
              My Public Profile
            </MenuItem> */}
        </div>
        {/* <div className="mt-[62px] flex px-8 sm:px-5">
          <Heading
            as="p"
            className={`!font-inter tracking-[0.56px] !text-gray-900_7f_01 ${
              location.pathname === "/settings" ? "bg-[#e9ebfd]" : ""
            }`}
          >
            SETTINGS
          </Heading>
        </div> 
        <div className="mt-6 flex flex-col gap-[0.22px]">
          <MenuItem
            icon={
              <Img
                src="/images/img_search.svg"
                alt="settings icon"
                className="h-[24px] w-[24px]"
              />
            }
            className={location.pathname === "/settings" ? "bg-[#e9ebfd]" : ""}
          >
            Settings
          </MenuItem>
          <MenuItem
            icon={
              <Img
                src="/images/img_icon_1.svg"
                alt="help icon"
                className="h-[24px] w-[24px]"
              />
            }
          >
            Help Center
          </MenuItem>
        </div>*/}
        <div className="mb-4 mt-10">
          <MenuItem
            icon={
              <Img
                src="/images/img_icon_deep_orange_400.svg"
                alt="logout icon"
                className="h-[24px] w-[24px]"
              />
            }
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </div>
      </Menu>
      {/* {!collapsed ? (
        <div className="mx-3.5 flex items-center justify-end gap-4 self-stretch">
          <Img
            src="/images/img_megaphone_48x48.png"
            alt="announcement icon"
            className="h-[48px] w-[48px] object-cover"
          />
          <div className="flex flex-col items-start gap-1">
            <Heading
              size="body_large___semibold"
              as="h6"
              className="!text-color-black"
            >
              Vishnu Barla
            </Heading>
            <Text size="texts" as="p" className="!text-gray-900_7f_01">
              vishnu@email.com
            </Text>
          </div>
        </div>
      ) : null} */}
    </Sidebar>
  );
}
