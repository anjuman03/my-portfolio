import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("admin_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAdmin(true);
    }
    setLoading(false);
  }, []);

  const login = (jwt) => {
    localStorage.setItem("admin_token", jwt);
    setToken(jwt);
    setIsAdmin(true);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider value={{ token, isAdmin, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);