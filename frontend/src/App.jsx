import AppRoutes from "@/routes/AppRoutes";
import ScrollProgress from "./components/common/ScrollProgress";
import BackToTop from "./components/common/BackToTop";

function App() {
  return (
    <>
  <ScrollProgress />
    <BackToTop/>
  <AppRoutes />
</>
  );
}

export default App;