// for DisplayContainer and base of components
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

// for input
interface RaisedData {
  value: string;
  isRegular: boolean;
}

type GetRaisedData = () => RaisedData;

type SetGetMethod = (f: GetRaisedData) => void;

type RaisedRecord = Record<string, GetRaisedData>;
