import { Select } from '../components/utility/Select';

export enum eOperation {
  eq = 'Equals',
  lt = 'Less than',
  le = 'Less than or equal to',
  gt = 'Greater than',
  ge = 'Greater than or equal to',
  miss = 'Missing',
  not_miss = 'Not missing',
  in = 'In',
  not_in = 'Not in',
}

interface OperationSelectorProps {
  selected: string;
  setSelected?: (ret: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const OperationSelector = ({
  selected,
  setSelected,
  style,
  className,
}: OperationSelectorProps): JSX.Element => {
  return (
    <Select
      className={`eoperation-selector ${className}`}
      style={{ width: '170px', ...style }}
      values={Object.keys(eOperation).map((k, i) => ({
        value: k,
        label: Object.values(eOperation)[i],
      }))}
      selected={selected}
      setSelected={setSelected ? (ret) => setSelected(ret) : undefined}
    />
  );
};
