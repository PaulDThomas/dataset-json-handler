import { DatasetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { WhereClauseClass } from '../classes/WhereClauseClass';
import { SummaryTableSchema } from '../context/SummaryTableContext';
import { updateWhereClause } from '../functions/updateWhereClause';
import { moveColumnVariable } from './moveColumnVariable';
import { addRowVariable } from './moveRowVariable';
import { removeColumnVariable } from './removeColumnVariable';
import { removeRowVariable } from './removeRowVariable';
import { removeWhereClause } from './removeWhereClause';
import { updateItem } from './updateItem';

export const MOVE_COLUMN_VARIABLE = 'MOVE_COLUMN_VARIABLE';
export const MOVE_ROW_VARIABLE = 'MOVE_ROW_VARIABLE';
export const REMOVE_COLUMN_VARIABLE = 'REMOVE_COLUMN_VARIABLE';
export const REMOVE_ROW_VARIABLE = 'REMOVE_ROW_VARIABLE';
export const REMOVE_WHERE_CLAUSE = 'REMOVE_WHERE_CLAUSE';
export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ROWS = 'SET_ROWS';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_WHERE_CLAUSE = 'UPDATE_WHERE_CLAUSE';

type Operation =
  | 'MOVE_COLUMN_VARIABLE'
  | 'MOVE_ROW_VARIABLE'
  | 'REMOVE_COLUMN_VARIABLE'
  | 'REMOVE_ROW_VARIABLE'
  | 'REMOVE_WHERE_CLAUSE'
  | 'SET_COLUMNS'
  | 'SET_ITEMS'
  | 'SET_ROWS'
  | 'UPDATE_ITEM'
  | 'UPDATE_WHERE_CLAUSE';

export interface ActionProps {
  operation: Operation;
  items?: DatasetJsonItemClass[];
  item?: DatasetJsonItemClass;
  position?: number;
  rows?: DatasetJsonItemClass[];
  columns?: DatasetJsonItemClass[];
  whereClause?: WhereClauseClass;
}

export const reducer = (state: SummaryTableSchema, action: ActionProps): SummaryTableSchema => {
  let newState: SummaryTableSchema = { ...state };
  switch (action.operation) {
    case MOVE_COLUMN_VARIABLE:
      newState = moveColumnVariable(action, newState);
      break;
    case MOVE_ROW_VARIABLE:
      newState = addRowVariable(action, newState);
      break;
    case REMOVE_COLUMN_VARIABLE:
      newState = removeColumnVariable(action, newState);
      break;
    case REMOVE_ROW_VARIABLE:
      newState = removeRowVariable(action, newState);
      break;
    case REMOVE_WHERE_CLAUSE:
      newState = removeWhereClause(action, newState);
      break;
    case SET_COLUMNS:
      if (!action.columns) throw `${SET_COLUMNS}: No columns`;
      else newState.columns = action.columns;
      break;
    case SET_ITEMS:
      if (!action.items) throw `${SET_ITEMS}: No items`;
      else newState.itemList = action.items;
      break;
    case SET_ROWS:
      if (!action.rows) throw `${SET_ROWS}: No rows`;
      else newState.rows = action.rows;
      break;
    case UPDATE_ITEM:
      newState = updateItem(action, newState);
      break;
    case UPDATE_WHERE_CLAUSE:
      newState = updateWhereClause(action, newState);
      break;
  }
  console.dir(newState);
  return newState;
};
