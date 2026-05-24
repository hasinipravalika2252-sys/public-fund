import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [trDate, setTrDate] = useState("");

  return (
    <AppContext.Provider value={{ trDate, setTrDate }}>
      {children}
    </AppContext.Provider>
  );
};