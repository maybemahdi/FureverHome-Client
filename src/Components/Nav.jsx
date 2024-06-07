import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const initialTheme = localStorage.getItem("theme") || "light";
  const initialDarkMode = localStorage.getItem("checked") === "true";

  const [theme, setTheme] = useState(initialTheme);
  const [isDarkMode, setDarkMode] = useState(initialDarkMode);

  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const [openNav, setOpenNav] = React.useState(false);

  useEffect(() => {
    // Update localStorage and body class when theme changes
    localStorage.setItem("theme", theme);
    localStorage.setItem("checked", isDarkMode);
    if (theme === "dark") {
      document.body.classList.add("bg-gray-900");
      document.body.classList.remove("bg-white");
      document.body.classList.add("text-white");
      document.body.classList.remove("text-black");
    } else {
      document.body.classList.add("bg-white");
      document.body.classList.remove("bg-gray-900");
      document.body.classList.add("text-black");
      document.body.classList.remove("text-white");
    }
  }, [theme, isDarkMode]);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    setTheme(checked ? "dark" : "light");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 font-semibold flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#FF407D]"
              : "hover:text-[#FF407D] transition-all duration-300"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#FF407D]"
              : "hover:text-[#FF407D] transition-all duration-300"
          }
          to={"/petListings"}
        >
          Pet Listing
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#FF407D]"
              : "hover:text-[#FF407D] transition-all duration-300"
          }
          to={"/donationCampaigns"}
        >
          Donation Campaigns
        </NavLink>
      </li>
    </ul>
  );

  const handleLogOut = () => {
    console.log("Logged Out");
    logOut().then(() => {
      toast.success("Log Out Successful");
    });
  };

  return (
    <Navbar data-aos="zoom-in-right" className="bg-[#FFCAD4] text-black top-0 z-20 h-max max-w-full mb-5 rounded-none px-4 py-8 lg:px-8 lg:py-5">
      <div className="flex items-center justify-between z-20 relative">
        <Link to={"/"}>
          <img
            className="h-28 absolute top-[-30px] left-[-20px] md:left-0 md:top-[-30px]"
            src={logo}
            alt=""
          />
        </Link>
        <div className="flex items-center gap-4 mt-1">
          <div className="mr-5 hidden lg:block">{navList}</div>
          <div className="flex font-semibold items-center gap-x-4">
            {!user && (
              <>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#FF407D]"
                      : "hover:text-[#FF407D] transition-all duration-300"
                  }
                  to={"/login"}
                >
                  Login
                </NavLink>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#FF407D]"
                      : "hover:text-[#FF407D] transition-all duration-300"
                  }
                  to={"/register"}
                >
                  Register
                </NavLink>
              </>
            )}
            <div className="flex items-center gap-6">
              {/* installed: "react-toggle-dark-mode": "^1.1.1",  */}
              <DarkModeSwitch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={40}
              />
              {user && (
                <Menu
                  open={isMenuOpen}
                  handler={setIsMenuOpen}
                  placement="bottom-end"
                >
                  <MenuHandler>
                    <Button
                      variant="text"
                      color="blue-gray"
                      className="flex items-center rounded-full p-0"
                    >
                      <Avatar
                        variant="circular"
                        size="md"
                        alt="tania andrew"
                        withBorder={true}
                        color="blue-gray"
                        className="p-0.5"
                        referrerPolicy="no-referrer"
                        src={user?.photoURL}
                      />
                    </Button>
                  </MenuHandler>
                  <MenuList className="p-1 hidden lg:block">
                    <MenuItem onClick={() => navigate("/dashboard")}>
                      <button className="text-[#000000] text-base font-main">
                        Dashboard
                      </button>
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>
                      <button className="text-[#FF407D] font-main">
                        Log Out
                      </button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
            </div>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav} className={`${openNav ? "mt-8" : "mt-2"}`}>
        {navList}
        {user && (
          <div className="flex flex-col justify-start -mt-2">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "text-[#FF407D]"
                  : "hover:text-[#FF407D] transition-all duration-300"
              }
              to={"/dashboard"}
            >
              Dashboard
            </NavLink>
            <button
              onClick={() => {
                logOut().then(() => {
                  toast.success("Logged Out Successful");
                });
              }}
              className={
                "text-[#FF407D] border border-[#FF407D] mt-2 hover:text-[#ffffff] hover:bg-[#FF407D] transition-all duration-300"
              }
            >
              Log Out
            </button>
          </div>
        )}
      </MobileNav>
    </Navbar>
  );
};

export default Nav;
