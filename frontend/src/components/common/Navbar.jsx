import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

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
      setActive(
        section.charAt(0).toUpperCase() + section.slice(1)
      );
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
            section.id.charAt(0).toUpperCase() +
            section.id.slice(1);
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  /* -------------------------------------------------------------------------- */
  /*                                Cleanup                                     */
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
    const sectionId =
      item === "Home" ? "home" : item.toLowerCase();

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
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        box-border
        w-full
        max-w-none
        overflow-x-hidden
        border-b
        border-border
        bg-background/95
        shadow-sm
        backdrop-blur-xl
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Navbar Container                                                    */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          mx-0
          flex
          h-16
          w-full
          max-w-none
          min-w-0
          box-border
          items-center
          justify-between
          overflow-hidden
          px-3
          sm:h-20
          sm:px-5
          lg:mx-auto
          lg:max-w-7xl
          lg:px-8
        "
      >
        {/* ---------------------------------------------------------------- */}
        {/* Logo + Name                                                      */}
        {/* ---------------------------------------------------------------- */}

        <button
          type="button"
          onClick={() => handleNavClick("Home")}
          className="
            flex
            min-w-0
            flex-1
            shrink
            items-center
            gap-2
            overflow-hidden
            text-left
            sm:gap-3
            lg:flex-none
          "
        >
          {/* Logo */}
          <img
            src="/favicon.png"
            alt="Anjuman Logo"
            className="
              h-8
              w-8
              shrink-0
              rounded-full
              object-contain
              sm:h-11
              sm:w-11
            "
          />

          {/* Name */}
          <span
            className="
              min-w-0
              max-w-full
              truncate
              bg-gradient-to-r
              from-blue-600
              via-indigo-600
              to-purple-600
              bg-clip-text
              text-[13px]
              font-bold
              leading-none
              tracking-tight
              text-transparent
              sm:text-2xl
              md:text-3xl
              dark:from-blue-400
              dark:via-indigo-400
              dark:to-purple-400
            "
          >
            PATAN ANJUMAN
          </span>
        </button>

        {/* ---------------------------------------------------------------- */}
        {/* Desktop Navigation                                               */}
        {/* ---------------------------------------------------------------- */}

        <nav className="hidden shrink-0 items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleNavClick(item)}
              className={`relative bg-transparent text-base font-medium transition ${
                active === item
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-foreground/80 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {item}

              {active === item && (
                <span className="absolute -bottom-3 left-0 h-1 w-full rounded-full bg-blue-600 dark:bg-blue-400" />
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
                    : "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
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
                className="
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:bg-red-100
                  dark:border-red-500/30
                  dark:bg-red-500/10
                  dark:text-red-400
                  dark:hover:bg-red-500/20
                "
              >
                Logout
              </button>
            </>
          )}

          <ThemeToggle />
        </nav>

        {/* ---------------------------------------------------------------- */}
        {/* Mobile Controls                                                  */}
        {/* ---------------------------------------------------------------- */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1
            sm:gap-2
            lg:hidden
          "
        >
          {/* Theme */}
          <div className="shrink-0 scale-[0.78] sm:scale-100">
            <ThemeToggle />
          </div>

          {/* Menu */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={() =>
              setMobileMenuOpen((prev) => !prev)
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-lg
              text-foreground
              transition
              hover:bg-accent
              sm:h-11
              sm:w-11
            "
          >
            {mobileMenuOpen ? (
              <X
                size={24}
                className="sm:h-7 sm:w-7"
              />
            ) : (
              <Menu
                size={24}
                className="sm:h-7 sm:w-7"
              />
            )}
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* Mobile Menu                                                          */}
      {/* -------------------------------------------------------------------- */}

      {mobileMenuOpen && (
        <div
          className="
            box-border
            w-full
            max-w-full
            overflow-x-hidden
            border-t
            border-border
            bg-background
            lg:hidden
          "
        >
          <nav className="flex w-full flex-col p-3 sm:p-5">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() =>
                  handleNavClick(item, true)
                }
                className={`w-full rounded-lg px-4 py-3 text-left transition ${
                  active === item
                    ? "bg-blue-50 font-semibold text-blue-600 dark:bg-blue-500/10 dark:text-blue-400"
                    : "text-foreground/80 hover:bg-accent"
                }`}
              >
                {item}
              </button>
            ))}

            {isAdmin && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    navigate("/settings");
                    setMobileMenuOpen(false);
                  }}
                  className="
                    mt-3
                    w-full
                    rounded-lg
                    bg-blue-600
                    px-4
                    py-3
                    text-left
                    font-semibold
                    text-white
                  "
                >
                  ⚙ Settings
                </button>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    navigate("/?section=home");
                    setMobileMenuOpen(false);
                  }}
                  className="
                    mt-3
                    w-full
                    rounded-lg
                    bg-red-500
                    px-4
                    py-3
                    text-left
                    font-semibold
                    text-white
                  "
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