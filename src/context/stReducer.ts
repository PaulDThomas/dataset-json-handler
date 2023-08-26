import { AnalysisGroupClass } from "../classes/AnalysisGroup";
import { DataGroupClass } from "../classes/DataGroup";
import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { WhereClauseConditionClass } from "../classes/WhereClauseConditionClass";
import { moveColumnVariable } from "../functions/moveColumnVariable";
import { addRowVariable } from "../functions/moveRowVariable";
import { removeColumnVariable } from "../functions/removeColumnVariable";
import { removeRowVariable } from "../functions/removeRowVariable";
import { removeWhereClauseCondition } from "../functions/removeWhereClauseCondition";
import { updateGroup } from "../functions/updateGroup";
import { updateItem } from "../functions/updateItem";
import { updateWhereClauseCondition } from "../functions/updateWhereClauseCondition";
import { SummaryTableData, SummaryTableSchema } from "./SummaryTableContext";

export const ADD_ANAL_GROUP = "ADD_ANAL_GROUP";
export const ADD_DATA_GROUP = "ADD_DATA_GROUP";
export const LOAD_STATUS = "LOAD_STATUS";
export const MOVE_COLUMN_VARIABLE = "MOVE_COLUMN_VARIABLE";
export const MOVE_ROW_VARIABLE = "MOVE_ROW_VARIABLE";
export const REMOVE_COLUMN_VARIABLE = "REMOVE_COLUMN_VARIABLE";
export const REMOVE_ROW_VARIABLE = "REMOVE_ROW_VARIABLE";
export const REMOVE_WHERE_CLAUSE_CONDITION = "REMOVE_WHERE_CLAUSE_CONDITION";
export const SET_COLUMNS = "SET_COLUMNS";
export const SET_ITEMS = "SET_ITEMS";
export const SET_ROWS = "SET_ROWS";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const UPDATE_WHERE_CLAUSE_CONDITION = "UPDATE_WHERE_CLAUSE_CONDITION";

type Operation =
  | "ADD_ANAL_GROUP"
  | "ADD_DATA_GROUP"
  | "LOAD_STATUS"
  | "MOVE_COLUMN_VARIABLE"
  | "MOVE_ROW_VARIABLE"
  | "REMOVE_COLUMN_VARIABLE"
  | "REMOVE_ROW_VARIABLE"
  | "REMOVE_WHERE_CLAUSE_CONDITION"
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
  incomingStatus?: SummaryTableData;
  items?: DatasetJsonItemClass[];
  item?: DatasetJsonItemClass;
  newId?: string;
  position?: number;
  rows?: DatasetJsonItemClass[];
  whereClauseCondition?: WhereClauseConditionClass;
}

export const stReducer = (state: SummaryTableSchema, action: ActionProps): SummaryTableSchema => {
  let newState: SummaryTableSchema = { ...state };
  switch (action.operation) {
    case ADD_ANAL_GROUP:
      if (action.newId && newState.groupList.findIndex((g) => g.id === action.newId) === -1) {
        newState.groupList.push(new AnalysisGroupClass({ id: action.newId }));
      }
      break;
    case ADD_DATA_GROUP:
      if (action.newId && newState.groupList.findIndex((g) => g.id === action.newId) === -1) {
        newState.groupList.push(new DataGroupClass({ id: action.newId }));
      }
      break;
    case LOAD_STATUS:
      if (action.incomingStatus) {
        newState.rows = action.incomingStatus.rows.map((i) => new DatasetJsonItemClass(i));
        newState.columns = action.incomingStatus.columns.map((i) => new DatasetJsonItemClass(i));
        newState.target = action.incomingStatus.target
          ? new DatasetJsonItemClass(action.incomingStatus.target)
          : undefined;
        newState.statistics = action.incomingStatus.statistics;
        newState.statisticPosition = action.incomingStatus.statisticPosition;
        newState.whereClauseConditions = action.incomingStatus.whereClauseConditions.map(
          (w) => new WhereClauseConditionClass(w),
        );
        newState.groupList = action.incomingStatus.groupList.map((g) =>
          g.type === "AnalysisGroup" ? new AnalysisGroupClass(g) : new DataGroupClass(g),
        );
        newState.itemList = action.incomingStatus.itemList.map((i) => new DatasetJsonItemClass(i));
      }
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
    case UPDATE_GROUP:
      newState = updateGroup(action, newState);
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
