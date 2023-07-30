import { SummaryTableSchema } from '../context/SummaryTableContext';
import { ActionProps, UPDATE_WHERE_CLAUSE } from '../context/stReducer';

export function updateWhereClause(action: ActionProps, state: SummaryTableSchema) {
  if (action.whereClause === undefined) throw `${UPDATE_WHERE_CLAUSE}: No where clause`;
  else {
    let newState = { ...state };
    const ix = state.whereClauses.findIndex((w) => w.WID === (action.whereClause?.WID ?? ''));
    if (ix === -1)
      newState = {
        ...newState,
        whereClauses: [...state.whereClauses, action.whereClause],
      };
    else newState.whereClauses.splice(ix, 1, action.whereClause);
    return newState;
  }
}
