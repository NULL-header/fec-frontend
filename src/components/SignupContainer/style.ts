import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    width: "100%",
  },
  button: {
    display: "block",
    margin: "30% auto",
    width: "100px",
  },
}));
