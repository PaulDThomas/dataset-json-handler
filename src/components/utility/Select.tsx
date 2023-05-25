import { useEffect, useState } from 'react';

interface EnumSelectorProps {
  values: string[];
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
    <div className={`enumselector-main ${className}`}>
      <select
        style={style}
        value={currentValue}
        onChange={(e) => setCurrentValue(e.currentTarget.value)}
        onBlur={(e) => setSelected && setSelected(e.currentTarget.value)}
      >
        {values.map((k, i) => (
          <option
            key={`${i}${k}`}
            value={k}
          >
            {k}
          </option>
        ))}
      </select>
    </div>
  );
};
