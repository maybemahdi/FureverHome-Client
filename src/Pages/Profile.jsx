import { Helmet } from "react-helmet-async";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  return (
    <div className="flex justify-center items-center my-auto h-[80vh]">
      <Helmet>
        <title>Profile | FureverHome</title>
      </Helmet>
      <div data-aos="zoom-in-right" className="bg-white shadow-lg rounded-2xl w-full md:w-3/5">
        <img
          alt="profile"
          src="https://wallpapercave.com/wp/wp9109600.jpg"
          className="w-full mb-4 rounded-t-lg h-36 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-[#FF407D] rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user.email}</span>
              </p>

              <div>
                <button
                  disabled
                  className="disabled:bg-[#d74c6379] disabled:cursor-not-allowed bg-[#FF407D] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#c2496f] block mb-1"
                >
                  Update Profile
                </button>
                <button
                  disabled
                  className="disabled:bg-[#d74c6379] disabled:cursor-not-allowed bg-[#FF407D] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#c2496f]"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
