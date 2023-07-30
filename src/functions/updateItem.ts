import { SummaryTableSchema } from '../context/SummaryTableContext';
import { ActionProps, UPDATE_ITEM } from '../context/stReducer';

export function updateItem(action: ActionProps, state: SummaryTableSchema) {
  if (action.item === undefined) throw `${UPDATE_ITEM}: No item`;
  else {
    const newState = { ...state };
    const ix = state.itemList.findIndex((i) => i.OID === action.item?.OID);
    if (ix === -1) {
      newState.itemList.push(action.item);
    } else {
      newState.itemList.splice(ix, 1, action.item);
    }
    return newState;
  }
}
