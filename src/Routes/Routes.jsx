import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import PetListings from "../Pages/PetListings";
import PetDetails from "../Pages/PetDetails";
import PrivateRoute from "../Routes/PrivateRoute";
import DonationCampaigns from "../Pages/DonationCampaigns";
import DonationDetails from "../Pages/DonationDetails";
import DashboardLayout from "../Layout/DashboardLayout";
import AddPet from "../Pages/User/AddPet";
import MyAddedPets from "../Pages/User/MyAddedPets";
import AdopReq from "../Pages/User/AdopReq";
import CreateDonationCampaign from "../Pages/User/CreateDonationCampaign";
import MyDonationCampaigns from "../Pages/User/MyDonationCampaigns";
import MyDonations from "../Pages/User/MyDonations";
import UpdatePet from "../Pages/User/UpdatePet";
import Profile from "../Pages/Profile";
import EditDonation from "../Pages/User/EditDonation";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/petListings",
        element: <PetListings />,
      },
      {
        path: "/pet/category/:category",
        element: <PetListings />,
      },
      {
        path: "/pet/:id",
        element: (
          <PrivateRoute>
            <PetDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/donationCampaigns",
        element: (
          <PrivateRoute>
            <DonationCampaigns />
          </PrivateRoute>
        ),
      },
      {
        path: "/donationCampaign/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  //dashboard layout
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <AddPet />
          </PrivateRoute>
        ),
      },
      {
        path: "myAddedPets",
        element: (
          <PrivateRoute>
            <MyAddedPets/>
          </PrivateRoute>
        ),
      },
      {
        path: "adoptionRequests",
        element: (
          <PrivateRoute>
            <AdopReq/>
          </PrivateRoute>
        ),
      },
      {
        path: "createCampaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign/>
          </PrivateRoute>
        ),
      },
      {
        path: "myDonationCampaign",
        element: (
          <PrivateRoute>
            <MyDonationCampaigns/>
          </PrivateRoute>
        ),
      },
      {
        path: "myDonations",
        element: (
          <PrivateRoute>
            <MyDonations/>
          </PrivateRoute>
        ),
      },
      {
        path: "updatePet/:id",
        element: (
          <PrivateRoute>
            <UpdatePet/>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile/>
          </PrivateRoute>
        ),
      },
      {
        path: "editDonation/:id",
        element: (
          <PrivateRoute>
            <EditDonation/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
