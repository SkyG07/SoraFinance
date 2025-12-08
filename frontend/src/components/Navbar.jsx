import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = ({ token, onLogout }) => {
  const location = useLocation();
  const [theme, setTheme] = useState("aqua");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "aqua" ? "sunset" : "aqua");

  const navItems = [
    { name: "Dashboard", path: token ? "/dashboard" : "/" },
    { name: "Transactions", path: "/transactions" },
    { name: "AI Recommendations", path: "/ai-recommendations" },
  ];

  return (
    <header className="bg-base-100 border-b border-base-content/10 shadow-sm">
      <div className="mx-auto max-w-7xl p-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to={token ? "/dashboard" : "/"}
          className="text-3xl font-bold text-primary font-mono tracking-tight"
        >
          SoraFinance
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {token
            ? navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`hover:text-primary transition font-medium ${
                    location.pathname === item.path ? "text-primary font-semibold" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))
            : <>
                <Link to="/login" className="btn btn-sm btn-outline">Sign In</Link>
                <Link to="/register" className="btn btn-sm btn-primary">Sign Up</Link>
              </>}

          <button className="btn btn-sm btn-ghost" onClick={toggleTheme}>
            {theme === "aqua" ? <Moon className="size-5" /> : <Sun className="size-5" />}
          </button>

          {token && (
            <button onClick={onLogout} className="btn btn-sm btn-error gap-2">
              <LogOut className="size-4" /> Logout
            </button>
          )}
        </div>

        {/* Mobile menu */}
        <button
          className="btn btn-sm btn-ghost md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        {menuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 bg-base-200 p-4 rounded-xl shadow">
            {token
              ? navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`hover:text-primary transition ${
                      location.pathname === item.path ? "text-primary font-bold" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))
              : <>
                  <Link to="/login" className="btn btn-sm btn-outline w-full">Sign In</Link>
                  <Link to="/register" className="btn btn-sm btn-primary w-full">Sign Up</Link>
                </>}

            <button className="btn btn-sm btn-secondary w-full" onClick={toggleTheme}>
              {theme === "aqua" ? "Night Mode" : "Day Mode"}
            </button>
            {token && (
              <button onClick={onLogout} className="btn btn-sm btn-error w-full gap-2">
                <LogOut className="size-4" /> Logout
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
