import { SummaryTableSchema } from '../context/SummaryTableContext';
import { ActionProps, REMOVE_WHERE_CLAUSE } from './reducer';

export function removeWhereClause(action: ActionProps, state: SummaryTableSchema) {
  if (action.whereClause === undefined) throw `${REMOVE_WHERE_CLAUSE}: No where clause specified`;
  else {
    const newState = { ...state };
    const ix = state.whereClauses.findIndex((w) => w.WID === (action.whereClause?.WID ?? ''));
    if (ix > -1) newState.whereClauses.splice(ix, 1);
    return newState;
  }
}
