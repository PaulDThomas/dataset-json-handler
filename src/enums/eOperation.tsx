import { eOperation } from '../classes/WhereClauseClass';
import { Select } from '../components/utility/Select';

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

OperationSelector.displayName = 'OperationSelector';
