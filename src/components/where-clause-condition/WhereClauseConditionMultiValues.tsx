import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { UPDATE_WHERE_CLAUSE_CONDITION } from '../../context/stReducer';
import { WhereClauseConditionProps } from './WhereClauseConditionRow';

export const WhereClauseConditionMultiValues = ({ index, canEdit }: WhereClauseConditionProps) => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition =
    state.whereClauseConditions.length > index ? state.whereClauseConditions[index] : null;
  if (!whereClauseCondition || !whereClauseCondition.item) return <></>;
  return (
    <textarea
      value={
        whereClauseCondition.filteredItemValues &&
        whereClauseCondition.filteredItemValues.length > 0
          ? whereClauseCondition.filteredItemValues.join('\n').toString()
          : ''
      }
      onChange={
        canEdit
          ? (e) => {
              whereClauseCondition.filteredItemValues = [
                ...e.currentTarget.value.trim().split('\n'),
              ];
              dispatch({
                operation: UPDATE_WHERE_CLAUSE_CONDITION,
                whereClauseCondition: whereClauseCondition,
              });
            }
          : undefined
      }
    />
  );
};
