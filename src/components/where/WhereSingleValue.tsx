import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { UPDATE_WHERE_CLAUSE } from '../../context/stReducer';
import { eItemType } from '../../classes/DatasetJsonItemClass';
import { WhereClauseProps } from './WhereClauseRow';

export const WhereSingleValue = ({ index, canEdit }: WhereClauseProps) => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClause = state.whereClauses.length > index ? state.whereClauses[index] : null;
  if (!whereClause || !whereClause.item) return <></>;
  return (
    <input
      style={{ borderRadius: '4px', borderWidth: '1px' }}
      value={
        whereClause.filteredItemValues && whereClause.filteredItemValues.length > 0
          ? whereClause.filteredItemValues[0].toString()
          : ''
      }
      type={
        [eItemType.date, eItemType.datetime, eItemType.time].includes(whereClause.item.type)
          ? whereClause.item.type
          : undefined
      }
      onChange={
        canEdit
          ? (e) => {
              whereClause.filteredItemValues = [e.currentTarget.value];
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
