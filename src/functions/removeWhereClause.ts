import { SummaryTableSchema } from "../context/SummaryTableContext";

export function removeWhereClause(deleteId: string, state: SummaryTableSchema) {
  const newState = { ...state };
  const removeWhere = state.whereClauses.find((w) => w.id === deleteId);
  if (removeWhere) {
    newState.whereClauses = newState.whereClauses.filter((w) => w.id !== deleteId);
    newState.whereClauseConditions = newState.whereClauseConditions.filter(
      (w) => w.id !== removeWhere.condition,
    );
  }
  return newState;
}
