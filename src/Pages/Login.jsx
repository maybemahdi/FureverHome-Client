import useAuth from "../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Login = () => {
  const {
    googleLogin,
    signIn,
    setUpdate,
    githubLogin,
    update,
    loading,
    setLoading,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await signIn(email, password);
      setUpdate(!update);
      navigate(location.state ? location.state : "/");
      toast.success("Logged in Successful");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleLogin();
      navigate(location.state ? location.state : "/");
      toast.success("Login Successful");
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
  return (
    <div data-aos="zoom-in-right" className="flex justify-center items-center min-h-screen">
      <Helmet>
        <title>Login | FureverHome</title>
      </Helmet>
      <div
        className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900"
      >
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
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
                // data-temp-mail-org="0"
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
                autoComplete="current-password"
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
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-600">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
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
          Don&apos;t have an account yet?{" "}
          <Link to="/register" className="hover:underline text-[#FF407D]">
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
