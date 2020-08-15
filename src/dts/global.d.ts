interface BaseComponentProps {
  className?: string;
}

type BaseComponent = React.FC<BaseComponentProps>;

type BaseElement = React.ReactElement<BaseComponentProps>;

type ComponentMap = Map<string, BaseElement>;
