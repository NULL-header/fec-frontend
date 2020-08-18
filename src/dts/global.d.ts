interface BaseComponentProps {
  className?: string;
}

interface KeyComponentProps extends BaseComponentProps {
  key: string;
}

type BaseComponent = React.FC<BaseComponentProps>;

type BaseElement = React.ReactElement<BaseComponentProps>;

type KeyComponent = React.FC<KeyComponentProps>;

type KeyElement = React.ReactElement<KeyComponentProps>;
