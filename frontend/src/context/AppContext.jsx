
import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [refreshDashboard, setRefreshDashboard] = useState(false);

  const triggerDashboardRefresh = () => {
    setRefreshDashboard(prev => !prev);
  };

  return (
    <AppContext.Provider value={{ refreshDashboard, triggerDashboardRefresh }}>
      {children}
    </AppContext.Provider>
  );

};