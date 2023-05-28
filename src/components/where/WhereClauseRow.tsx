import { useContext, useMemo } from 'react';
import { WhereClauseClass } from '../../classes/WhereClauseClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { OperationSelector, eOperation } from '../../enums/eOperation';
import { UPDATE_WHERE_CLAUSE } from '../../functions/reducer';

interface WhereClauseProps {
  WID: string;
  canEdit: boolean;
  setWhereClause?: (ret: WhereClauseClass) => void;
  previousVersions?: WhereClauseClass[];
}

export const WhereClauseRow = ({ WID, canEdit }: WhereClauseProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClause = useMemo(
    () => state.whereClauses.find((w) => w.WID === WID),
    [state.whereClauses, WID],
  );

  if (!whereClause) return <></>;
  return (
    <div
      className='whereclause-main'
      // onBlur={() => canEdit && setWhereClause && setWhereClause(currentValue)}
    >
      <div>{whereClause.variable?.name ?? 'No variable chosen'}</div>
      <OperationSelector
        selected={(whereClause?.whereOperation ?? '') as string}
        setSelected={
          canEdit
            ? (ret) => {
                whereClause.whereOperation = ret as eOperation;
                dispatch({ type: UPDATE_WHERE_CLAUSE, whereClause });
              }
            : undefined
        }
      />
      <div className='whereclause-values'>
        {(whereClause.filteredVariableValues &&
          whereClause.filteredVariableValues.map((v, i) => (
            <div key={i}>
              {v instanceof Date
                ? new Date(v.getTime() - v.getTimezoneOffset() * 60000)
                    .toISOString()
                    .replace(/T/, ' ')
                    .slice(0, 16)
                : v}
            </div>
          ))) ??
          'No values set'}
      </div>
    </div>
  );
};
