import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { SettingsProvider } from "@/context/SettingsContext";

import App from "./App";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminAuthProvider>
      <SettingsProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </BrowserRouter>
      </QueryClientProvider>
      </SettingsProvider>
    </AdminAuthProvider>
  </React.StrictMode>
);