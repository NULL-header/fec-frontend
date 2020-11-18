import React, { createContext, useContext, useState } from "react";
import { createTheming } from "react-jss";
import update from "immutability-helper";

import { makeStyles as CurriedMakeStyles, getCurrent } from "src/util";

type UseContextValue<T> = [T, (arg: T) => void];

export const createSwitchableTheme = function <Theme, ThemeName extends string>(
  themes: Record<ThemeName, Theme>
) {
  return function (defaultThemeName: ThemeName) {
    const ThemeContext = createContext({} as Theme);
    const Theming = createTheming(ThemeContext);
    const makeStyles = CurriedMakeStyles(Theming);
    type UseThemeNameValue = UseContextValue<ThemeName>;
    const ThemeNameContext = createContext({} as UseThemeNameValue);

    const Component: React.FC<{ children: React.ReactNode }> = (props) => {
      const [themeNames, setThemeNames] = useState([defaultThemeName]);
      const setThemeName = ((arg) =>
        setThemeNames(
          update(themeNames, { $push: [arg] })
        )) as UseThemeNameValue[1];
      const currentName = getCurrent(themeNames);
      const theme = themes[currentName];
      const themeContextValue = [
        currentName,
        setThemeName,
      ] as UseThemeNameValue;

      return (
        <ThemeNameContext.Provider value={themeContextValue}>
          <Theming.ThemeProvider theme={theme as any}>
            {props.children}
          </Theming.ThemeProvider>
        </ThemeNameContext.Provider>
      );
    };
    const ThemeProvider = React.memo(Component);
    const useThemeName = () => useContext(ThemeNameContext);
    return { ThemeProvider, makeStyles, useThemeName };
  };
};
