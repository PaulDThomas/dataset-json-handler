import { SummaryTableSchema } from "../context/SummaryTableContext";
import { ActionProps, REMOVE_COLUMN_VARIABLE } from "../context/stReducer";

export function removeColumnVariable(action: ActionProps, state: SummaryTableSchema) {
  if (action.item === undefined) throw `${REMOVE_COLUMN_VARIABLE}: No variable specified`;
  else {
    return {
      ...state,
      columns: state.columns.filter((i) => i.OID !== action.item?.OID),
    };
  }
}
