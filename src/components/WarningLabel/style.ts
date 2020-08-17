import { makeStyles } from "@material-ui/core";

interface Props {
  isShow: boolean;
}

export const useStyles = makeStyles((theme) => ({
  root: {
    visibility: (props: Props) => (props.isShow ? "initial" : "hidden"),
  },
}));
