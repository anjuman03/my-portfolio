import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAdmin, logout } = useAdminAuth();

  const navItems = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Certifications",
    "Contact",
  ];

  const [active, setActive] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Guards the scroll-spy from fighting a click-triggered smooth scroll
  const isClickScrolling = useRef(false);
  const clickScrollTimeout = useRef(null);

  /* -------------------------------------------------------------------------- */
  /*                               Route Active                                 */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const path = location.pathname;
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (path.startsWith("/project")) {
      setActive("Projects");
      return;
    }

    if (path.startsWith("/certificate")) {
      setActive("Certifications");
      return;
    }

    if (path === "/settings") {
      setActive("Settings");
      return;
    }

    if (path === "/" && section) {
      setActive(section.charAt(0).toUpperCase() + section.slice(1));
      return;
    }

    if (path === "/") {
      setActive("Home");
    }
  }, [location]);

  /* -------------------------------------------------------------------------- */
  /*                               Scroll Spy                                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      // Skip recalculation while we're mid-smooth-scroll from a nav click
      if (isClickScrolling.current) return;

      const sections = document.querySelectorAll("section[id]");

      let current = "Home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          current = section.id.charAt(0).toUpperCase() + section.id.slice(1);
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // Clean up any pending timeout on unmount
  useEffect(() => {
    return () => {
      if (clickScrollTimeout.current) {
        window.clearTimeout(clickScrollTimeout.current);
      }
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               Nav Click Handler                            */
  /* -------------------------------------------------------------------------- */

  const handleNavClick = (item, closeMobileMenu = false) => {
    const sectionId = item === "Home" ? "home" : item.toLowerCase();

    setActive(item);
    navigate(`/?section=${sectionId}`);

    isClickScrolling.current = true;

    // Wait a tick for the route/DOM to settle, then scroll to the section
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    // Re-enable scroll spy once the smooth scroll has likely finished
    if (clickScrollTimeout.current) {
      window.clearTimeout(clickScrollTimeout.current);
    }
    clickScrollTimeout.current = window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 800);

    if (closeMobileMenu) {
      setMobileMenuOpen(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                   JSX                                      */
  /* -------------------------------------------------------------------------- */

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        {" "}
        <button
          onClick={() => handleNavClick("Home")}
          className="text-2xl font-bold text-blue-600 sm:text-3xl"
        >
          Portfolio
        </button>
        <nav className="hidden items-center gap-8 lg:flex">
          {" "}
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`relative bg-transparent text-base font-medium transition ${
                active === item
                  ? "text-blue-600"
                  : "text-slate-700 hover:text-blue-600"
              }`}
            >
              {item}

              {active === item && (
                <span className="absolute -bottom-3 left-0 h-1 w-full rounded-full bg-blue-600" />
              )}
            </button>
          ))}
          {isAdmin && (
            <>
              <button
                type="button"
                onClick={() => {
                  setActive("Settings");
                  navigate("/settings");
                }}
                className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                  active === "Settings"
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                ⚙ Settings
              </button>

              <button
                type="button"
                onClick={() => {
                  logout();
                  setActive("Home");
                  navigate("/?section=home");
                }}
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Logout
              </button>
            </>
          )}
        </nav>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 lg:hidden"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="flex flex-col p-5">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => handleNavClick(item, true)}
                className={`rounded-lg px-4 py-3 text-left transition ${
                  active === item
                    ? "bg-blue-50 font-semibold text-blue-600"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ))}

            {isAdmin && (
              <>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setMobileMenuOpen(false);
                  }}
                  className="mt-3 rounded-lg bg-blue-600 px-4 py-3 text-left font-semibold text-white"
                >
                  ⚙ Settings
                </button>

                <button
                  onClick={() => {
                    logout();
                    navigate("/?section=home");
                  }}
                  className="mt-3 rounded-lg bg-red-500 px-4 py-3 text-left font-semibold text-white"
                >
                  Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;