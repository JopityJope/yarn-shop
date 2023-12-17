import { createContext, useState, useContext } from "react";

const YarnContext = createContext();

export const YarnProvider = ({ children }) => {
  const [yarns, setYarns] = useState([]);

  const contextValue = {
    yarns,
    setYarns,
  };

  return (
    <YarnContext.Provider value={contextValue}>{children}</YarnContext.Provider>
  );
};

export const useYarnContext = () => {
  return useContext(YarnContext);
};
