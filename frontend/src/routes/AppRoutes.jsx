import { Routes, Route } from "react-router-dom";

import PublicLayout from "@/layouts/PublicLayout";

import HomePage from "@/pages/public/HomePage";
import CertificatePage from "@/pages/public/CertificatePage";
import ProjectPage from "@/pages/public/ProjectPage";
import AdminLogin from "@/pages/admin/AdminLogin";
import SettingsPage from "@/pages/admin/SettingsPage";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/certificate/:id" element={<CertificatePage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Route>

      <Route path="/admin-login" element={<AdminLogin />} />
      <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;