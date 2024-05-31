import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@material-tailwind/react";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <ThemeProvider>
            <RouterProvider router={router} />
          </ThemeProvider>
          <Toaster />
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
