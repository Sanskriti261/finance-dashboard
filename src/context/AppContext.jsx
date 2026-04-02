import { createContext, useState, useEffect } from "react";
import { transactionsData } from "../data/mockData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  //  Load from localStorage safely
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");

      if (!saved) return transactionsData;

      const parsed = JSON.parse(saved);

      //  fallback if empty or invalid
      return Array.isArray(parsed) && parsed.length > 0
        ? parsed
        : transactionsData;

    } catch (error) {
      console.error("Error loading transactions:", error);
      return transactionsData;
    }
  });

  const [role, setRole] = useState("admin");
  const [filter, setFilter] = useState("all");

  //  Dark Mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  //  Save transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  //  Save theme
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        setTransactions,
        role,
        setRole,
        filter,
        setFilter,
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};