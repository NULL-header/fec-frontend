interface BaseComponentProps {
  className?: string;
}

type BaseComponent = React.FC<BaseComponentProps>;

type ComponentMap = Map<string, BaseComponent>;
