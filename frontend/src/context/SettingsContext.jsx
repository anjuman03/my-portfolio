import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);

  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/settings`
      );

      setSettings(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        fetchSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () =>
  useContext(SettingsContext);