import React, { createContext, useContext, useState } from "react";
import { createTheming } from "react-jss";
import update from "immutability-helper";

import { makeStyles as CurriedMakeStyles, getCurrent } from "src/util";

export const createSwitchableTheme = function <Theme, ThemeName extends string>(
  themes: Record<ThemeName, Theme>
) {
  const ThemeContext = createContext({} as Theme);
  const Theming = createTheming(ThemeContext);
  const makeStyles = CurriedMakeStyles(Theming);
  type UseThemeNameValue = UseContextValue<ThemeName>;
  const ThemeNameContext = createContext({} as UseThemeNameValue);

  const createThemeProvider = (
    defaultThemeName: ThemeName,
    onChangeTheme?: (arg: ThemeName) => void
  ) => {
    const Component: React.FC<{ children: React.ReactNode }> = (props) => {
      const [themeNames, setThemeNames] = useState([defaultThemeName]);
      const setThemeName = ((arg) => {
        if (onChangeTheme != null) onChangeTheme(arg);
        setThemeNames(update(themeNames, { $push: [arg] }));
      }) as UseThemeNameValue[1];
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
    return ThemeProvider;
  };
  const useThemeName = () => useContext(ThemeNameContext);
  return { createThemeProvider, makeStyles, useThemeName };
};
