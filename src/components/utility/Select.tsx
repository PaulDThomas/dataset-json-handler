import { useEffect, useState } from 'react';

interface EnumSelectorProps {
  values: { value: string; label: string }[];
  selected: string;
  setSelected?: (ret: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export const Select = ({
  values,
  selected,
  setSelected,
  style,
  className,
}: EnumSelectorProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<string>(selected);
  useEffect(() => setCurrentValue(selected), [selected]);

  return (
    <div
      className={`selector-main ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <select
        className='selector-select'
        style={{ borderRadius: '4px', ...style }}
        value={currentValue}
        onChange={(e) => setSelected && setSelected(e.currentTarget.value)}
      >
        {values.map((k, i) => (
          <option
            key={`${i}-${k.value}`}
            value={k.value}
          >
            {k.label}
          </option>
        ))}
      </select>
    </div>
  );
};
