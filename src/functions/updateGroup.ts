import { SummaryTableSchema } from "../context/SummaryTableContext";
import { ActionProps } from "../context/stReducer";

export function updateGroup(action: ActionProps, state: SummaryTableSchema) {
  if (action.group === undefined) throw `${action.operation}: No group`;
  else {
    const newState = { ...state };
    const ix = state.groupList.findIndex((g) => g.id === action.group?.id);
    if (ix === -1) {
      newState.groupList.push(action.group);
    } else {
      newState.groupList.splice(ix, 1, action.group);
    }
    return newState;
  }
}
