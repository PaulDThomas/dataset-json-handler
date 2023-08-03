import { DatasetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { WhereClauseConditionClass } from '../classes/WhereClauseConditionClass';
import { SummaryTableSchema } from './SummaryTableContext';
import { updateWhereClauseCondition } from '../functions/updateWhereClauseCondition';
import { moveColumnVariable } from '../functions/moveColumnVariable';
import { addRowVariable } from '../functions/moveRowVariable';
import { removeColumnVariable } from '../functions/removeColumnVariable';
import { removeRowVariable } from '../functions/removeRowVariable';
import { removeWhereClauseCondition } from '../functions/removeWhereClauseCondition';
import { updateItem } from '../functions/updateItem';

export const MOVE_COLUMN_VARIABLE = 'MOVE_COLUMN_VARIABLE';
export const MOVE_ROW_VARIABLE = 'MOVE_ROW_VARIABLE';
export const REMOVE_COLUMN_VARIABLE = 'REMOVE_COLUMN_VARIABLE';
export const REMOVE_ROW_VARIABLE = 'REMOVE_ROW_VARIABLE';
export const REMOVE_WHERE_CLAUSE_CONDITION = 'REMOVE_WHERE_CLAUSE_CONDITION';
export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_ITEMS = 'SET_ITEMS';
export const SET_ROWS = 'SET_ROWS';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const UPDATE_WHERE_CLAUSE_CONDITION = 'UPDATE_WHERE_CLAUSE_CONDITION';

type Operation =
  | 'MOVE_COLUMN_VARIABLE'
  | 'MOVE_ROW_VARIABLE'
  | 'REMOVE_COLUMN_VARIABLE'
  | 'REMOVE_ROW_VARIABLE'
  | 'REMOVE_WHERE_CLAUSE_CONDITION'
  | 'SET_COLUMNS'
  | 'SET_ITEMS'
  | 'SET_ROWS'
  | 'UPDATE_ITEM'
  | 'UPDATE_WHERE_CLAUSE_CONDITION';

export interface ActionProps {
  operation: Operation;
  items?: DatasetJsonItemClass[];
  item?: DatasetJsonItemClass;
  position?: number;
  rows?: DatasetJsonItemClass[];
  columns?: DatasetJsonItemClass[];
  whereClauseCondition?: WhereClauseConditionClass;
}

export const stReducer = (state: SummaryTableSchema, action: ActionProps): SummaryTableSchema => {
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
    case REMOVE_WHERE_CLAUSE_CONDITION:
      newState = removeWhereClauseCondition(action, newState);
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
    case UPDATE_WHERE_CLAUSE_CONDITION:
      newState = updateWhereClauseCondition(action, newState);
      break;
  }
  console.dir(newState);
  return newState;
};
