import { SummaryTableSchema } from '../context/SummaryTableContext';
import { moveVariable } from './moveVariable';
import { MOVE_ROW_VARIABLE, ActionProps } from './reducer';

export function addRowVariable(action: ActionProps, state: SummaryTableSchema) {
  if (action.item === undefined) throw `${MOVE_ROW_VARIABLE}: No variable specified`;
  else if (action.position === undefined) throw `${MOVE_ROW_VARIABLE}: No position defined`;
  else if (action.position > state.rows.length) throw `${MOVE_ROW_VARIABLE}: Position is too high`;
  else {
    return {
      ...state,
      columns: state.columns.filter((i) => i.OID !== action.item?.OID),
      rows: moveVariable(state.rows, action.item, action.position),
    };
  }
}
