import { SummaryTableSchema } from "../context/SummaryTableContext";
import { ActionProps } from "../context/stReducer";
import { AnalysisGroupClass } from "../main";

export const setColumnAnalysisGroup = (
  action: ActionProps,
  state: SummaryTableSchema,
): SummaryTableSchema => {
  if (action.group === undefined) throw `${action.operation}: No group`;
  else if (!(action.group instanceof AnalysisGroupClass))
    throw `${action.operation}: Analysis group must be used`;
  else {
    const newState = { ...state };
    newState.columnAnalysisGroup = action.group as AnalysisGroupClass;
    newState.columns = action.group.levels?.map(
      (l) => newState.whereClauses.find((w) => w.id === l)?.label ?? "No label found",
    ) ?? ["No group levels present"];
    return newState;
  }
};
