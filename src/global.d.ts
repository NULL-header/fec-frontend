interface BaseComponentProps {
  className?: string;
}

type ComponentMap = Map<string, React.FC<BaseComponentProps>>;
