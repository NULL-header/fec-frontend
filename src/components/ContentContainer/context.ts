import { createContext } from "react";

const defaultValue = {
  isLogin: false,
  setIsLogin: (arg: boolean) => {
    return;
  },
};

export const LoginStateContext = createContext(defaultValue);
