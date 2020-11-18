// eslint-disable-next-line no-unused-vars
import { CSSProperties } from "react";

import { createSwitchableTheme } from "src/util/SwitchableTheme";

type ItemRecord<T> = Record<"primary" | "secondary" | "backGround", T>;

interface TextTheme {}

interface Theme {
  color: ItemRecord<CSSProperties["color"]>;
  text: ItemRecord<TextTheme>;
}

const light: Theme = {
  color: { primary: "green", secondary: "", backGround: "grey" },
  text: {
    primary: {},
    secondary: {},
    backGround: {},
  },
};

const dark: Theme = {
  color: { primary: "darkgreen", secondary: "", backGround: "green" },
  text: {
    primary: {},
    secondary: {},
    backGround: {},
  },
};

const themes = { light, dark };
const { ThemeProvider, makeStyles, useThemeName } = createSwitchableTheme(
  themes
)("light");

export { ThemeProvider, makeStyles, useThemeName, themes };
