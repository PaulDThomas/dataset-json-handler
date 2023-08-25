import { SummaryTableSchema } from "../context/SummaryTableContext";
import { ActionProps, REMOVE_ROW_VARIABLE } from "../context/stReducer";

export function removeRowVariable(action: ActionProps, state: SummaryTableSchema) {
  if (action.item === undefined) throw `${REMOVE_ROW_VARIABLE}: No variable specified`;
  else {
    return {
      ...state,
      rows: state.rows.filter((i) => i.OID !== action.item?.OID),
    };
  }
}
