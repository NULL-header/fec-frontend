import { makeStyles } from "src/theme";

export const useStyles = makeStyles()((theme) => ({
  root: {
    backgroundColor: theme.color.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: "0",
    "&>a": {
      padding: "10px 5px",
    },
  },
}));
