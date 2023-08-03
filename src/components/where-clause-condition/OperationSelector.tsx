import { Operation, Operations } from '../../classes/WhereClauseConditionClass';
import { Select } from '../utility/Select';

interface OperationSelectorProps {
  selected: Operation;
  setSelected?: (ret: Operation) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const OperationSelector = ({
  selected,
  setSelected,
  style,
  className,
}: OperationSelectorProps): JSX.Element => {
  const vals: { value: string; label: string }[] = [...Operations];
  if (!vals.map((v) => v.value).includes(selected)) {
    vals.splice(0, 0, { label: '-- Select --', value: '' });
  }
  return (
    <Select
      className={`eoperation-selector ${className}`}
      style={{ width: '170px', ...style }}
      values={vals}
      selected={selected}
      setSelected={setSelected ? (ret) => setSelected(ret as Operation) : undefined}
    />
  );
};

OperationSelector.displayName = 'OperationSelector';
