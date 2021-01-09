// eslint-disable-next-line no-unused-vars
import { CSSProperties, useState } from "react";
// import { createSwitchableTheme } from "src/util/SwitchableTheme";
import { createTheme } from "switchable-theme";

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

export const themes = { light, dark };
export type ThemeNames = keyof typeof themes;

export const { useTheme, makeStyles } = createTheme(themes);
