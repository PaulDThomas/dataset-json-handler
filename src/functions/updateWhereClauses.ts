import { SummaryTableSchema } from "../context/SummaryTableContext";
import { StActionProps } from "../context/stReducer";

export function updateWhereClauses(action: StActionProps, state: SummaryTableSchema) {
  if (action.whereClauses === undefined) throw `${action.operation}: No where clauses specified`;
  else {
    const newState = { ...state };
    action.whereClauses.forEach((aw) => {
      const ix = state.whereClauses.findIndex((sw) => sw.id === aw.id);
      if (ix === -1) newState.whereClauses.push(aw);
      else newState.whereClauses.splice(ix, 1, aw);
    });
    return newState;
  }
}
