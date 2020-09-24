import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: "100vh",
    display: "flex",
    justifyContent: "center",
  },
  cloth: {
    width: "60%",
    marginTop: "20%",
    marginBottom: "40%",
    display: "flex",
  },
  container: {
    margin: "20%",
  },
}));
