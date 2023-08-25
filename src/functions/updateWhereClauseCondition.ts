import { SummaryTableSchema } from "../context/SummaryTableContext";
import { ActionProps, UPDATE_WHERE_CLAUSE_CONDITION } from "../context/stReducer";

export function updateWhereClauseCondition(action: ActionProps, state: SummaryTableSchema) {
  if (action.whereClauseCondition === undefined)
    throw `${UPDATE_WHERE_CLAUSE_CONDITION}: No where clause condition`;
  else {
    let newState = { ...state };
    const ix = state.whereClauseConditions.findIndex(
      (w) => w.id === (action.whereClauseCondition?.id ?? ""),
    );
    if (ix === -1)
      newState = {
        ...newState,
        whereClauseConditions: [...state.whereClauseConditions, action.whereClauseCondition],
      };
    else newState.whereClauseConditions.splice(ix, 1, action.whereClauseCondition);
    return newState;
  }
}
