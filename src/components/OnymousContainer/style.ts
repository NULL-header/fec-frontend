import { makeStyles } from "src/theme";

export const useStyles = makeStyles()((theme) => ({
  root: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {},
  main: {
    flexGrow: 1,
  },
  info: {
    backgroundColor: theme.light.color.backGround,
    width: "100px",
  },
}));
