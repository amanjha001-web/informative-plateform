import { useCallback, useEffect, useMemo, useState } from "react";

import ThemeContext from "./ThemeContext";

const THEME_STORAGE_KEY = "admin-theme";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }, []);

  const changeTheme = useCallback((newTheme) => {
    if (newTheme !== "light" && newTheme !== "dark") {
      return;
    }

    setTheme(newTheme);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      isLight: theme === "light",
      toggleTheme,
      changeTheme,
    }),
    [theme, toggleTheme, changeTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
