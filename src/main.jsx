import "./utils/DarkModo";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { AdminProvider } from "./context/AdminProvide.jsx";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomProvider theme="ligth">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AdminProvider>
            <RouterProvider router={router} />
          </AdminProvider>
        </AuthProvider>
      </QueryClientProvider>
    </CustomProvider>
  </React.StrictMode>
);
