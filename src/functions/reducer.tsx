import { DataSetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { WhereClauseClass } from '../classes/WhereClauseClass';
import { SummaryTableSchema } from '../context/SummaryTableContext';
import { updateWhereClause } from '../functions/updateWhereClause';
import { moveColumnVariable } from './moveColumnVariable';
import { addRowVariable } from './moveRowVariable';
import { removeColumnVariable } from './removeColumnVariable';
import { removeRowVariable } from './removeRowVariable';
import { removeWhereClause } from './removeWhereClause';

export const MOVE_COLUMN_VARIABLE = 'MOVE_COLUMN_VARIABLE';
export const MOVE_ROW_VARIABLE = 'MOVE_ROW_VARIABLE';
export const REMOVE_COLUMN_VARIABLE = 'REMOVE_COLUMN_VARIABLE';
export const REMOVE_ROW_VARIABLE = 'REMOVE_ROW_VARIABLE';
export const REMOVE_WHERE_CLAUSE = 'REMOVE_WHERE_CLAUSE';
export const SET_COLUMNS = 'SET_COLUMNS';
export const SET_ROWS = 'SET_ROWS';
export const UPDATE_WHERE_CLAUSE = 'UPDATE_WHERE_CLAUSE';

export interface ActionProps {
  type: string;
  item?: DataSetJsonItemClass;
  position?: number;
  rows?: DataSetJsonItemClass[];
  columns?: DataSetJsonItemClass[];
  whereClause?: WhereClauseClass;
}

export const reducer = (state: SummaryTableSchema, action: ActionProps): SummaryTableSchema => {
  let newState = { ...state };
  switch (action.type) {
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
    case SET_ROWS:
      if (!action.rows) throw `${SET_ROWS}: No rows`;
      else newState.rows = action.rows;
      break;
    case UPDATE_WHERE_CLAUSE:
      newState = updateWhereClause(action, newState);
      break;
  }
  console.dir(newState);
  return newState;
};
