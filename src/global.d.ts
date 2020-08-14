interface BaseComponent {
  className: string;
}

type ComponentMap = Map<string, React.FC<BaseComponent>>;
