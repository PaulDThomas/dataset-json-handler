import { useEffect, useState } from 'react';
import { eOperation } from '../../enums/eOperation';
import { Select } from '../utility/Select';
import { WhereClauseClass } from '../../classes/WhereClauseClass';

interface WhereClauseProps {
  whereClause: WhereClauseClass;
  canEdit: boolean;
  setWhereClause?: (ret: WhereClauseClass) => void;
  previousVersions?: WhereClauseClass[];
}

export const WhereClauseRow = ({
  whereClause,
  canEdit,
  setWhereClause,
}: WhereClauseProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<WhereClauseClass>(whereClause);
  useEffect(() => setCurrentValue(whereClause), [whereClause]);

  return (
    <div
      className='whereclause-main'
      onBlur={() => canEdit && setWhereClause && setWhereClause(currentValue)}
    >
      <div className='whereclause-var'>{whereClause.variable?.name}</div>
      <Select
        values={Object.keys(eOperation)}
        selected={whereClause.whereOperation as string}
        setSelected={(ret) => {
          whereClause.whereOperation = ret as eOperation;
          console.log(whereClause);
          setCurrentValue(whereClause);
        }}
      />
      <div className='whereclause-values'>
        {whereClause.filteredVariableValues &&
          whereClause.filteredVariableValues.map((v, i) => (
            <div key={i}>
              {v instanceof Date
                ? new Date(v.getTime() - v.getTimezoneOffset() * 60000)
                    .toISOString()
                    .replace(/T/, ' ')
                    .slice(0, 16)
                : v}
            </div>
          ))}
      </div>
    </div>
  );
};
