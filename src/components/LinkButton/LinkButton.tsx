import React from "react";
import { Link } from "react-router-dom";

interface Props extends BaseComponentProps {
  to: string;
  children: React.ReactNode;
}

const Component: React.FC<Props> = (props) => {
  return (
    <Link to={props.to}>
      <button>{props.children}</button>
    </Link>
  );
};

const LinkButton = React.memo(Component);
LinkButton.displayName = "LinkButton";

export { LinkButton };
