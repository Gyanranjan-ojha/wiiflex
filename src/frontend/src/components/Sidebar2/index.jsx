import { Img, Heading } from "./..";
import React from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function Sidebar2({ ...props }) {
  const [collapsed, setCollapsed] = React.useState(false);

  //use this function to collapse/expand the sidebar
  //function collapseSidebar() {
  //    setCollapsed(!collapsed)
  //}

  return (
    <Sidebar
      {...props}
      width="242px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      rootStyles={{ [`.${sidebarClasses.container}`]: { gap: 12 } }}
      className={`${props.className} flex flex-col h-screen pt-[18px] gap-3 top-0 bg-color-white !sticky overflow-auto`}
    >
      <Img
        src="/images/img_sidebar_logo.png"
        alt="sidebar logo"
        className="ml-[30px] h-[50px] w-[116px] object-contain"
      />
      <Menu
        menuItemStyles={{
          button: {
            padding: "10px 10px 10px 40px",
            gap: "16px",
            backgroundColor: "#f8f8fd",
            color: "#7C8493",
            fontWeight: 600,
            fontSize: "14px",
            [`&:hover, &.ps-active`]: { backgroundColor: "#4880ff !important" },
          },
        }}
        className="mb-1 w-full self-stretch"
      >
        <div>
          <div>
            <div>
              <div>
                <MenuItem
                  icon={
                    <Img
                      src="/images/home_icon.svg"
                      alt="dashboard icon"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  icon={
                    <Img
                      src="/images/messenger_icon.svg"
                      alt="dashboard icon alt"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  Jobs
                </MenuItem>
              </div>
              <div>
                <MenuItem
                  icon={
                    <Img
                      src="/images/chat_icon.svg"
                      alt="products icon"
                      className="h-[30px] w-[16px]"
                    />
                  }
                >
                  Candidates
                </MenuItem>
                <MenuItem
                  icon={
                    <Img
                      src="/images/search_icon.svg"
                      alt="products icon alt"
                      className="h-[30px] w-[16px]"
                    />
                  }
                >
                  Admin
                </MenuItem>
              </div>
              <div>
                <MenuItem
                  icon={
                    <Img
                      src="/images/company_icon.png"
                      alt="favorites icon"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  Browse Companies
                </MenuItem>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_dashboard.svg"
                      alt="favorites icon alt"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  My Public Profile
                </MenuItem>
              </div>
              <div>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_megaphone.svg"
                      alt="inbox icon"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  Inbox
                </MenuItem>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_dashboard.svg"
                      alt="messenger icon"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  Messenger
                </MenuItem>
              </div>
              <div>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_megaphone.svg"
                      alt="order icon"
                      className="h-[30px] w-[20px]"
                    />
                  }
                >
                  Order Lists
                </MenuItem>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_dashboard.svg"
                      alt="order icon alt"
                      className="h-[30px] w-[20px]"
                    />
                  }
                >
                  Order Lists
                </MenuItem>
              </div>
              <div>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_megaphone.svg"
                      alt="stock icon"
                      className="h-[30px] w-[16px]"
                    />
                  }
                >
                  Product Stock
                </MenuItem>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_dashboard.svg"
                      alt="e-commerce icon"
                      className="h-[30px] w-[20px]"
                    />
                  }
                >
                  E-commerce
                </MenuItem>
              </div>
            </div>
          </div>
          <div className="h-px bg-gray-300_19" />

          <div>
            <div>
              <div>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_megaphone.svg"
                      alt="logout icon"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  Logout
                </MenuItem>
                <MenuItem
                  icon={
                    <Img
                      src="/images/img_dashboard.svg"
                      alt="settings icon alt"
                      className="h-[30px] w-[22px]"
                    />
                  }
                >
                  Settings
                </MenuItem>
              </div>
              <MenuItem
                icon={
                  <Img
                    src="/images/img_dashboard.svg"
                    alt="logout icon final"
                    className="h-[30px] w-[22px]"
                  />
                }
              >
                Logout
              </MenuItem>
            </div>
          </div>
        </div>
      </Menu>
    </Sidebar>
  );
}
