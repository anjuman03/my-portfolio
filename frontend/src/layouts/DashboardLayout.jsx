import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;