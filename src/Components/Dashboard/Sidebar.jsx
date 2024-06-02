import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/logo.png";
import useRole from "../../Hooks/useRole";
import UserMenu from "./Menu/UserMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const { role } = useRole();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-[#FFCAD4] text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer relative top-[-20px] p-4 h-[80px] font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logo}
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button bg-[#FFCAD4] p-4 focus:outline-none"
        >
          <AiOutlineBars color="#FF407D" className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#FFCAD4] w-72 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden h-16 md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src={logo}
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            {role === "User" && (
              <UserMenu/>
            )}
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  ${
                isActive ? "text-[#FF407D]" : "text-black"
              }`
            }
          >
            <FcSettings color="#111111" className="w-5 h-5" />

            <span className="mx-4 font-medium">Profile</span>
          </NavLink>
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-black transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
