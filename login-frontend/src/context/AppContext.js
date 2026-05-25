import { createContext } from "react";

export const AppContext = createContext({
  trDate: new Date().toISOString().split("T")[0]
});