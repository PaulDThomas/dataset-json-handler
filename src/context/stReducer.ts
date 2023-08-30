import { AnalysisGroupClass } from "../classes/AnalysisGroup";
import { DataGroupClass } from "../classes/DataGroup";
import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { WhereClauseClass } from "../classes/WhereClauseClass";
import { loadStatus } from "../functions/loadStatus";
import { moveColumnVariable } from "../functions/moveColumnVariable";
import { addRowVariable } from "../functions/moveRowVariable";
import { removeColumnVariable } from "../functions/removeColumnVariable";
import { removeRowVariable } from "../functions/removeRowVariable";
import { removeWhereClauses } from "../functions/removeWhereClauses";
import { updateGroup } from "../functions/updateGroup";
import { updateItem } from "../functions/updateItem";
import { updateWhereClauseConditions } from "../functions/updateWhereClauseConditions";
import { WhereClauseConditionClass } from "../main";
import { SummaryTableData, SummaryTableSchema } from "./SummaryTableContext";

export const ADD_ANAL_GROUP = "ADD_ANAL_GROUP";
export const ADD_ANAL_GROUP_LEVELS = "ADD_ANAL_GROUP_LEVELS";
export const ADD_DATA_GROUP = "ADD_DATA_GROUP";
export const ADD_DATA_GROUP_WHERE = "ADD_DATA_GROUP_WHERE";
export const ADD_PAGE_WHERE = "ADD_PAGE_WHERE";
export const DELETE_GROUP = "DELETE_GROUP";
export const LOAD_STATUS = "LOAD_STATUS";
export const MOVE_COLUMN_VARIABLE = "MOVE_COLUMN_VARIABLE";
export const MOVE_ROW_VARIABLE = "MOVE_ROW_VARIABLE";
export const REMOVE_COLUMN_VARIABLE = "REMOVE_COLUMN_VARIABLE";
export const REMOVE_ROW_VARIABLE = "REMOVE_ROW_VARIABLE";
export const REMOVE_ANAL_GROUP_LEVEL = "REMOVE_ANAL_GROUP_LEVEL";
export const REMOVE_DATA_GROUP_WHERE = "REMOVE_DATA_GROUP_WHERE";
export const REMOVE_PAGE_WHERE = "REMOVE_PAGE_WHERE";
export const SET_COLUMNS = "SET_COLUMNS";
export const SET_ITEMS = "SET_ITEMS";
export const SET_ROWS = "SET_ROWS";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const UPDATE_WHERE_CLAUSE_CONDITION = "UPDATE_WHERE_CLAUSE_CONDITION";

type Operation =
  | "ADD_ANAL_GROUP"
  | "ADD_ANAL_GROUP_LEVELS"
  | "ADD_DATA_GROUP"
  | "ADD_DATA_GROUP_WHERE"
  | "ADD_PAGE_WHERE"
  | "DELETE_GROUP"
  | "LOAD_STATUS"
  | "MOVE_COLUMN_VARIABLE"
  | "MOVE_ROW_VARIABLE"
  | "REMOVE_COLUMN_VARIABLE"
  | "REMOVE_ROW_VARIABLE"
  | "REMOVE_ANAL_GROUP_LEVELS"
  | "REMOVE_DATA_GROUP_WHERE"
  | "REMOVE_PAGE_WHERE"
  | "SET_COLUMNS"
  | "SET_ITEMS"
  | "SET_ROWS"
  | "UPDATE_GROUP"
  | "UPDATE_ITEM"
  | "UPDATE_WHERE_CLAUSE_CONDITION";

export interface ActionProps {
  operation: Operation;
  columns?: DatasetJsonItemClass[];
  group?: DataGroupClass | AnalysisGroupClass;
  deleteId?: string;
  id?: string;
  incomingStatus?: SummaryTableData;
  items?: DatasetJsonItemClass[];
  item?: DatasetJsonItemClass;
  position?: number;
  rows?: DatasetJsonItemClass[];
  whereClauses?: WhereClauseClass[];
  whereClauseConditions?: WhereClauseConditionClass[];
}

export const stReducer = (state: SummaryTableSchema, action: ActionProps): SummaryTableSchema => {
  let newState: SummaryTableSchema = { ...state };
  switch (action.operation) {
    case ADD_ANAL_GROUP:
      if (action.id && newState.groupList.findIndex((g) => g.id === action.id) === -1) {
        newState.groupList.push(new AnalysisGroupClass({ id: action.id }));
      }
      break;
    case ADD_DATA_GROUP:
      if (action.id && newState.groupList.findIndex((g) => g.id === action.id) === -1) {
        newState.groupList.push(new DataGroupClass({ id: action.id }));
      }
      break;
    case ADD_PAGE_WHERE:
      if (action.id && newState.whereClauses.findIndex((w) => w.id === action.id) === -1) {
        const newWhereCondition = new WhereClauseConditionClass({ id: crypto.randomUUID() });
        const newWhere = new WhereClauseClass({ id: action.id, conditionId: newWhereCondition.id });
        newState.whereClauses.push(newWhere);
        newState.whereClauseConditions.push(newWhereCondition);
        newState.page.push(newWhere.id);
      }
      break;
    case DELETE_GROUP:
      if (action.deleteId && newState.groupList.findIndex((g) => g.id === action.deleteId) !== -1) {
        const ix = newState.groupList.findIndex((g) => g.id === action.deleteId);
        newState.groupList.splice(ix, 1);
      }
      break;
    case LOAD_STATUS:
      newState = loadStatus(action);
      break;
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
    case REMOVE_PAGE_WHERE:
      newState.page = newState.page.filter(
        (pw) => !action.whereClauses?.map((w) => w.id)?.includes(pw),
      );
      newState = removeWhereClauses(action, newState);
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
    case UPDATE_GROUP:
      newState = updateGroup(action, newState);
      break;
    case UPDATE_ITEM:
      newState = updateItem(action, newState);
      break;
    case UPDATE_WHERE_CLAUSE_CONDITION:
      newState = updateWhereClauseConditions(action, newState);
      break;
  }
  return newState;
};
