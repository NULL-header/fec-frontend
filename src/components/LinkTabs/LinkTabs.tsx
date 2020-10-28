import React, { useMemo } from "react";
import { LinkButton } from "src/components";

type LinkButtonType = typeof LinkButton;

interface Props extends BaseComponentProps {
  base: string;
  children: React.ReactElement<
    React.ComponentProps<LinkButtonType>,
    LinkButtonType
  >[];
}

const Component: React.FC<Props> = (props) => {
  const rendered = useMemo(
    () =>
      props.children.map((e, i) =>
        React.cloneElement(e, { base: props.base, key: i })
      ),
    [props.children, props.base]
  );
  return <div className={props.className}>{rendered}</div>;
};

const LinkTabs = React.memo(Component);
LinkTabs.displayName = "LinkTabs";

export { LinkTabs };
