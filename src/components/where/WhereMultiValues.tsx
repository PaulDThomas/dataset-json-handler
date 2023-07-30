import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { UPDATE_WHERE_CLAUSE } from '../../functions/reducer';
import { WhereClauseProps } from './WhereClauseRow';

export const WhereMultiValues = ({ index, canEdit }: WhereClauseProps) => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClause = state.whereClauses.length > index ? state.whereClauses[index] : null;
  if (!whereClause || !whereClause.item) return <></>;
  return (
    <textarea
      value={
        whereClause.filteredItemValues && whereClause.filteredItemValues.length > 0
          ? whereClause.filteredItemValues.join('\n').toString()
          : ''
      }
      onChange={
        canEdit
          ? (e) => {
              whereClause.filteredItemValues = [...e.currentTarget.value.trim().split('\n')];
              dispatch({
                operation: UPDATE_WHERE_CLAUSE,
                whereClause: whereClause,
              });
            }
          : undefined
      }
    />
  );
};
