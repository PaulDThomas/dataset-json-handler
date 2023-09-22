import { SummaryTableSchema } from "../context/SummaryTableContext";
import { StActionProps, UPDATE_WHERE_CLAUSE_CONDITION } from "../context/stReducer";

export function updateWhereClauseConditions(action: StActionProps, state: SummaryTableSchema) {
  if (action.whereClauseConditions === undefined)
    throw `${UPDATE_WHERE_CLAUSE_CONDITION}: No where clause conditions specified`;
  else {
    const newState = { ...state };
    action.whereClauseConditions.forEach((aw) => {
      const ix = state.whereClauseConditions.findIndex((sw) => sw.id === aw.id);
      if (ix === -1) newState.whereClauseConditions.push(aw);
      else newState.whereClauseConditions.splice(ix, 1, aw);
    });
    return newState;
  }
}
