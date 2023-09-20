import { SummaryTableSchema } from "../context/SummaryTableContext";
import { AnalysisGroupClass } from "../main";

export function removeAnalGroupLevel(groupId: string, deleteId: string, state: SummaryTableSchema) {
  const newState = { ...state };
  const analGroup = newState.groupList.find(
    (g) => g.id === groupId && g.type === "AnalysisGroup",
  ) as AnalysisGroupClass;
  if (analGroup) {
    analGroup.levels = analGroup.levels?.filter((l) => l !== deleteId) ?? null;
  }
  // This should be in its own function
  const whereClause = state.whereClauses.find((w) => w.id === deleteId);
  if (whereClause) {
    newState.whereClauseConditions = newState.whereClauseConditions.filter(
      (wc) => wc.id !== whereClause.condition,
    );
    newState.whereClauses = newState.whereClauses.filter((w) => w.id !== deleteId);
  }
  return newState;
}
