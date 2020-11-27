// eslint-disable-next-line no-unused-vars
import { CSSProperties, useState } from "react";
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

const loading: Theme = {
  color: { primary: "", secondary: "", backGround: "" },
  text: {
    primary: {},
    secondary: {},
    backGround: {},
  },
};

export const themes = { light, dark, loading };

export const {
  createThemeProvider,
  makeStyles,
  useThemeName,
} = createSwitchableTheme(themes);
