import { SummaryTableSchema } from '../context/SummaryTableContext';
import { ActionProps, REMOVE_WHERE_CLAUSE_CONDITION } from '../context/stReducer';

export function removeWhereClauseCondition(action: ActionProps, state: SummaryTableSchema) {
  if (action.whereClauseCondition === undefined)
    throw `${REMOVE_WHERE_CLAUSE_CONDITION}: No where clause condition specified`;
  else {
    const newState = { ...state };
    const ix = state.whereClauseConditions.findIndex(
      (w) => w.id === (action.whereClauseCondition?.id ?? ''),
    );
    if (ix > -1) newState.whereClauseConditions.splice(ix, 1);
    return newState;
  }
}
