import { SummaryTableSchema } from "../context/SummaryTableContext";
import { ActionProps } from "../context/stReducer";

export function removeWhereClauses(action: ActionProps, state: SummaryTableSchema) {
  if (action.whereClauses === undefined)
    throw `${action.operation}: No where clause conditions specified`;
  else {
    const newState = { ...state };
    const removeWhere = action.whereClauses.map((w) => w.id);
    newState.whereClauses = [...newState.whereClauses.filter((w) => !removeWhere.includes(w.id))];
    const removeWhereClauses = action.whereClauses.map((w) => w.condition ?? w.compoundExpression);
    newState.whereClauseConditions = [
      ...newState.whereClauseConditions.filter((w) => !removeWhereClauses.includes(w.id)),
    ];
    return newState;
  }
}
