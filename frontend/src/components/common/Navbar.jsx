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
      if (isClickScrolling.current) return;

      const sections = document.querySelectorAll("section[id]");

      let current = "Home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        if (rect.top <= 120 && rect.bottom >= 120) {
          current =
            section.id.charAt(0).toUpperCase() + section.id.slice(1);
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

  /* -------------------------------------------------------------------------- */
  /*                              Cleanup                                       */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    return () => {
      if (clickScrollTimeout.current) {
        window.clearTimeout(clickScrollTimeout.current);
      }
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                               Nav Click                                    */
  /* -------------------------------------------------------------------------- */

  const handleNavClick = (item, closeMobileMenu = false) => {
    const sectionId = item === "Home" ? "home" : item.toLowerCase();

    setActive(item);
    navigate(`/?section=${sectionId}`);

    isClickScrolling.current = true;

    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

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
    <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200 bg-white/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

        {/* Logo + Name */}
        <button
          onClick={() => handleNavClick("Home")}
          className="flex items-center gap-3"
        >
          <img
            src="/favicon.png"
            alt="Anjuman Logo"
            className="h-11 w-11 rounded-full object-contain"
          />

          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
  PATAN ANJUMAN
</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
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

          {/* Admin Buttons */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 lg:hidden"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
                    setMobileMenuOpen(false);
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