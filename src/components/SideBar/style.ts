import { makeStyles } from "src/util";

export const styles = makeStyles({
  root: {
    backgroundColor: "darkgreen",
    display: "flex",
    flexDirection: "column",
    "&>a": {
      margin: "30% 10%",

      "&>button": {
        width: "100%",
      },
    },
  },
});
