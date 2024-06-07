import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { FaGithub } from "react-icons/fa";
import LoadingSkeleton from "../Components/LoadingSkeleton";

const Register = () => {
  const {
    createUser,
    googleLogin,
    update,
    setUpdate,
    loading,
    githubLogin,
    updateUserProfile,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    // console.log(name, email, password, image);
    const formData = new FormData();
    formData.append("image", image);
    try {
      setLoading(true);
      // upload image and get image url
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );
      // console.log(data.data.display_url);
      const result = await createUser(email, password);
      await updateUserProfile(name, data.data.display_url);
      setUpdate(!update);
      console.log(result);
      form.reset();
      navigate(location.state ? location.state : "/");
      toast.success("User Created Successfully");
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.message);
    } finally {
      // Ensure loading state is turned off after the process is complete
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      navigate(location.state ? location.state : "/");
      toast.success("SignUp Successful");
    } catch (err) {
      toast.error(err.message);
    }
  };
  const handleGithubLogin = async () => {
    try {
      await githubLogin();
      navigate(location.state ? location.state : "/");
      toast.success("SignUp Successful");
    } catch (err) {
      toast.error(err.message);
    }
  };
  if (loading) return <LoadingSkeleton type={'card'} />;
  return (
    <div className="flex justify-center items-center min-h-screen my-10">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-200 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-600">Welcome to FureverHome</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-[#FF407D] w-full rounded-md py-3 text-white"
            >
              Continue
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Sign up with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </button>
        <button
          onClick={handleGithubLogin}
          className="flex justify-center items-center space-x-2 border mx-3 mb-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FaGithub size={32} />

          <p>Continue with Github</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-rose-500 text-[#FF407D]"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
