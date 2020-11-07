// eslint-disable-next-line no-unused-vars
import { createContext, CSSProperties } from "react";
import { createTheming } from "react-jss";

import { makeStyles } from "./util";

type ItemRecord<T> = Record<"primary" | "secondary" | "backGround", T>;

interface TextTheme {}

interface Theme {
  color: ItemRecord<CSSProperties["color"]>;
  text: ItemRecord<TextTheme>;
}

const light: Theme = {
  color: { primary: "darkgreen", secondary: "", backGround: "grey" },
  text: {
    primary: {},
    secondary: {},
    backGround: {},
  },
};

const dark: Theme = {
  color: { primary: "", secondary: "", backGround: "" },
  text: {
    primary: {},
    secondary: {},
    backGround: {},
  },
};

const themeTyping = {
  light,
  dark,
};

const themeContext = createContext(themeTyping);
const theming = createTheming(themeContext);

const passedTheming = makeStyles(theming);

export { theming, passedTheming as makeStyles };
