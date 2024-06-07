import { FaCat, FaUsers } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { FiGitPullRequest } from "react-icons/fi";
import { IoLogoOctocat } from "react-icons/io";
import { BiDonateHeart } from "react-icons/bi";
import {
  MdCampaign,
  MdCreateNewFolder,
  MdOutlineAddToPhotos,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <h3 className="md:text-center pl-4 md:pl-0 text-xl md:text-2xl font-bold underline">
       Admin Dashboard
      </h3>
      <nav>
        {/* admin routes */}
        <NavLink
          to="/dashboard"
          end
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <FaUsers className="w-5 h-5" />

          <span className="mx-4 font-medium">Users</span>
        </NavLink>
        <NavLink
          to="allPets"
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <IoLogoOctocat className="w-5 h-5" />

          <span className="mx-4 font-medium">All Pets</span>
        </NavLink>
        <NavLink
          to="allDonations"
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <BiDonateHeart className="w-5 h-5" />

          <span className="mx-4 font-medium">All Donations</span>
        </NavLink>

        {/* common routes */}
        <NavLink
          to="addPet"
          end
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <MdOutlineAddToPhotos className="w-5 h-5" />

          <span className="mx-4 font-medium">Add A Pet</span>
        </NavLink>
        <NavLink
          to="myAddedPets"
          className={({ isActive }) =>
            `flex items-center px-4 my-4 transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <FaCat className="w-5 h-5" />

          <span className="mx-4 font-medium">My Added Pets</span>
        </NavLink>
        <NavLink
          to="adoptionRequests"
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <FiGitPullRequest className="w-5 h-5" />

          <span className="mx-4 font-medium">Adoption Requests</span>
        </NavLink>
        <NavLink
          to="createCampaign"
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <MdCreateNewFolder className="w-5 h-5" />

          <span className="mx-4 font-medium">Create Campaign</span>
        </NavLink>
        <NavLink
          to="myDonationCampaign"
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <MdCampaign className="w-5 h-5" />

          <span className="mx-4 font-medium">My Donation Campaign</span>
        </NavLink>
        <NavLink
          to="myDonations"
          className={({ isActive }) =>
            `flex items-center px-4 my-4  transition-colors duration-300 transform   ${
              isActive ? "text-[#FF407D]" : "text-black"
            }`
          }
        >
          <FaBuildingUser className="w-5 h-5" />

          <span className="mx-4 font-medium">My Donations</span>
        </NavLink>
      </nav>
    </>
  );
};

export default AdminMenu;
