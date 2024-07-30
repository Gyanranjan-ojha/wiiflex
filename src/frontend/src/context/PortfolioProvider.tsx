import React, { createContext, useContext, useState, ReactNode } from "react";
import { Portfolio } from "../lib/utils";

type PortfolioContextType = {
  portfolio: Portfolio | null;
  setPortfolio: (portfolio: Portfolio) => void;
  clearPortfolio: () => void;
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [portfolio, setPortfolioState] = useState<Portfolio | null>(() => {
    const storedPortfolio = localStorage.getItem("portfolio");
    return storedPortfolio ? JSON.parse(storedPortfolio) : null;
  });

  const setPortfolio = (portfolio: Portfolio) => {
    setPortfolioState(portfolio);
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  };

  const clearPortfolio = () => {
    setPortfolioState(null);
    localStorage.removeItem("portfolio");
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, setPortfolio, clearPortfolio }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
