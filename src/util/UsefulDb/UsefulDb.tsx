import React, { useContext, createContext } from "react";

export const createUsefulDb = function <
  T extends Record<string, string>,
  U extends Record<keyof T, Dexie.Table<any, number>>
>(dbWrapped: IndexedDbWrapper<T, U>) {
  const db = dbWrapped.makeDb();
  const DbContext = createContext({} as typeof db);
  const Component: React.FC<{ children: React.ReactNode }> = (props) => {
    return <DbContext.Provider value={db}>{props.children}</DbContext.Provider>;
  };
  const DbProvider = React.memo(Component);
  const useDb = () => useContext(DbContext);
  return { useDb, DbProvider };
};
