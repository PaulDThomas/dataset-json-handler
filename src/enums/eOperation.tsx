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
  const vals = [
    ...Object.keys(eOperation).map((k, i) => ({
      value: k,
      label: Object.values(eOperation)[i].toString(),
    })),
  ];
  if (!vals.map((v) => v.value).includes(selected)) {
    vals.splice(0, 0, { label: '-- Select --', value: '' });
  }
  return (
    <Select
      className={`eoperation-selector ${className}`}
      style={{ width: '170px', ...style }}
      values={vals}
      selected={selected}
      setSelected={setSelected ? (ret) => setSelected(ret) : undefined}
    />
  );
};

OperationSelector.displayName = 'OperationSelector';
