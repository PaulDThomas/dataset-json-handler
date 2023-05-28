import { SummaryTableSchema } from '../context/SummaryTableContext';
import { ActionProps, UPDATE_WHERE_CLAUSE } from './reducer';

export function updateWhereClause(action: ActionProps, state: SummaryTableSchema) {
  if (action.whereClause === undefined) throw `${UPDATE_WHERE_CLAUSE}: No where clause`;
  else {
    const ix = state.whereClauses.findIndex((w) => w.WID === (action.whereClause?.WID ?? ''));
    if (ix === -1)
      state = {
        ...state,
        whereClauses: [...state.whereClauses, action.whereClause],
      };
    else state.whereClauses[ix] = action.whereClause;
  }
  return state;
}
