import React from "react";

interface DisplayContainerProps extends BaseComponentProps {
  componentMap: ComponentMap;
  currentName: string;
}

export const DisplayContainer: React.FC<DisplayContainerProps> = (props) => {
  const ContainerOptional = props.componentMap.get(props.currentName);
  const Container =
    ContainerOptional == null
      ? (props: any) => <div>error!!</div>
      : ContainerOptional;

  return <Container className={props.className} />;
};
