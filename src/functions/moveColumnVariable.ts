import { SummaryTableSchema } from "../context/SummaryTableContext";
import { moveVariable } from "./moveVariable";
import { ActionProps, MOVE_COLUMN_VARIABLE } from "../context/stReducer";

export function moveColumnVariable(action: ActionProps, state: SummaryTableSchema) {
  if (action.item === undefined) throw `${MOVE_COLUMN_VARIABLE}: No variable specified`;
  else if (action.position === undefined) throw `${MOVE_COLUMN_VARIABLE}: No position defined`;
  else if (action.position > state.columns.length)
    throw `${MOVE_COLUMN_VARIABLE}: Position is too high`;
  else {
    return {
      ...state,
      columns: moveVariable(state.columns, action.item, action.position),
      rows: state.rows.filter((i) => i.OID !== action.item?.OID),
    };
  }
}
