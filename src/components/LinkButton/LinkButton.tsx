import React, { useMemo } from "react";
import { Link } from "react-router-dom";

interface Props extends BaseComponentProps {
  to: string;
  base?: string;
  children: React.ReactNode;
}

const Component: React.FC<Props> = (props) => {
  const url = useMemo(() => (props.base == null ? "" : props.base) + props.to, [
    props.base,
    props.to,
  ]);
  return (
    <Link to={url}>
      <button>{props.children}</button>
    </Link>
  );
};

const LinkButton = React.memo(Component);
LinkButton.displayName = "LinkButton";

export { LinkButton };
