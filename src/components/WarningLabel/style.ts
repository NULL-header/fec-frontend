import { makeStyles } from "@material-ui/core";

interface Props {
  isShown: boolean;
}

export const useStyles = makeStyles((theme) => ({
  root: {
    visibility: (props: Props) => (props.isShown ? "initial" : "hidden"),
  },
}));
