import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Navbar />

      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default PublicLayout;