import { SummaryTableSchema } from "../context/SummaryTableContext";
import { WhereClauseClass } from "../main";

export const refreshTable = (state: SummaryTableSchema): SummaryTableSchema => {
  const newState = { ...state };
  if (state.columnAnalysisGroup) {
    newState.columns = (
      state.columnAnalysisGroup.levels
        ?.map((l) => newState.whereClauses.find((w) => w.id === l) ?? "No label found")
        .filter((w) => w !== "No label found") as WhereClauseClass[]
    )
      .sort((a, b) => a.order - b.order)
      .map((wc) => wc.label) ?? ["No group levels present"];
  } else {
    newState.columns = [];
  }
  return newState;
};
