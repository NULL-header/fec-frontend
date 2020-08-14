import { makeStyles } from "@material-ui/core";

interface Props {
  isCurrent: boolean;
}

export const useStyles = makeStyles((theme) => ({
  container: {
    display: (props: Props) => (props.isCurrent ? "initial" : "none"),
  },
}));
