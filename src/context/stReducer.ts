import { AnalysisGroupClass } from "../classes/AnalysisGroupClass";
import { DataGroupClass } from "../classes/DataGroupClass";
import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { WhereClauseClass } from "../classes/WhereClauseClass";
import { loadStatus } from "../functions/loadStatus";
import { addRowVariable } from "../functions/moveRowVariable";
import { removeAnalGroupLevel } from "../functions/removeAnalGroupLevel";
import { removeRowVariable } from "../functions/removeRowVariable";
import { removeWhereClause } from "../functions/removeWhereClause";
import { setColumnAnalysisGroup } from "../functions/setColumnsAnalysisGroup";
import { refreshTable } from "../functions/refreshTable";
import { updateGroup } from "../functions/updateGroup";
import { updateItem } from "../functions/updateItem";
import { updateWhereClauseConditions } from "../functions/updateWhereClauseConditions";
import { updateWhereClauses } from "../functions/updateWhereClauses";
import { WhereClauseConditionClass } from "../main";
import { SummaryTableData, SummaryTableSchema } from "./SummaryTableContext";
import { eStatistic } from "../enums/eStatistic";

export const ADD_ANAL_GROUP = "ADD_ANAL_GROUP";
export const ADD_ANAL_GROUP_LEVELS = "ADD_ANAL_GROUP_LEVELS";
export const ADD_DATA_GROUP = "ADD_DATA_GROUP";
export const ADD_DATA_GROUP_WHERE = "ADD_DATA_GROUP_WHERE";
export const ADD_PAGE_WHERE = "ADD_PAGE_WHERE";
export const DELETE_GROUP = "DELETE_GROUP";
export const LOAD_STATUS = "LOAD_STATUS";
export const MOVE_ROW_VARIABLE = "MOVE_ROW_VARIABLE";
export const REMOVE_ROW_VARIABLE = "REMOVE_ROW_VARIABLE";
export const REMOVE_ANAL_GROUP_LEVEL = "REMOVE_ANAL_GROUP_LEVEL";
export const REMOVE_DATA_GROUP_WHERE = "REMOVE_DATA_GROUP_WHERE";
export const REMOVE_PAGE_WHERE = "REMOVE_PAGE_WHERE";
export const SET_COLUMN_ANALYSIS_GROUP = "SET_COLUMN_ANALYSIS_GROUP";
export const SET_ITEMS = "SET_ITEMS";
export const SET_ROWS = "SET_ROWS";
export const UPDATE_GROUP = "UPDATE_GROUP";
export const UPDATE_ITEM = "UPDATE_ITEM";
export const UPDATE_WHERE_CLAUSE = "UPDATE_WHERE_CLAUSE";
export const UPDATE_WHERE_CLAUSE_CONDITION = "UPDATE_WHERE_CLAUSE_CONDITION";

type StOperation =
  | "ADD_ANAL_GROUP"
  | "ADD_ANAL_GROUP_LEVELS"
  | "ADD_DATA_GROUP"
  | "ADD_DATA_GROUP_WHERE"
  | "ADD_PAGE_WHERE"
  | "DELETE_GROUP"
  | "LOAD_STATUS"
  | "MOVE_ROW_VARIABLE"
  | "REMOVE_ROW_VARIABLE"
  | "REMOVE_ANAL_GROUP_LEVEL"
  | "REMOVE_DATA_GROUP_WHERE"
  | "REMOVE_PAGE_WHERE"
  | "SET_COLUMN_ANALYSIS_GROUP"
  | "SET_ITEMS"
  | "SET_ROWS"
  | "UPDATE_GROUP"
  | "UPDATE_ITEM"
  | "UPDATE_WHERE_CLAUSE"
  | "UPDATE_WHERE_CLAUSE_CONDITION";

export interface StActionProps {
  operation: StOperation;
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

export const stReducer = (state: SummaryTableSchema, action: StActionProps): SummaryTableSchema => {
  let newState: SummaryTableSchema = { ...state };
  switch (action.operation) {
    case ADD_ANAL_GROUP:
      if (action.id && newState.groupList.findIndex((g) => g.id === action.id) === -1) {
        newState.groupList.push(new AnalysisGroupClass({ id: action.id }));
      }
      break;
    case ADD_ANAL_GROUP_LEVELS:
      if (action.id && action.whereClauses && action.whereClauseConditions) {
        const analGroup = newState.groupList.find(
          (g) => g.id === action.id && g.type === "AnalysisGroup",
        ) as AnalysisGroupClass;
        if (analGroup) {
          action.whereClauseConditions.forEach((awc) => {
            const ix = newState.whereClauseConditions.findIndex((wc) => wc.id === awc.id);
            if (ix === -1) newState.whereClauseConditions.push(awc);
          });
          action.whereClauses.forEach((aw) => {
            const ix = newState.whereClauses.findIndex((w) => w.id === aw.id);
            if (ix === -1) {
              newState.whereClauses.push(aw);
              analGroup.addLevel(aw.id);
            }
          });
          newState = refreshTable(newState);
        }
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
        const newWhere = new WhereClauseClass({ id: action.id, condition: newWhereCondition.id });
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
    case MOVE_ROW_VARIABLE:
      newState = addRowVariable(action, newState);
      if (newState.statistics.length === 0) {
        newState.statistics = Object.keys(eStatistic) as eStatistic[];
      }
      break;
    case REMOVE_ANAL_GROUP_LEVEL:
      if (action.group && action.group.type === "AnalysisGroup" && action.deleteId) {
        newState = removeAnalGroupLevel(action.group?.id, action.deleteId, state);
        newState = refreshTable(newState);
      }
      break;
    case REMOVE_ROW_VARIABLE:
      newState = removeRowVariable(action, newState);
      break;
    case REMOVE_PAGE_WHERE:
      if (action.deleteId) {
        newState.page = newState.page.filter((pw) => pw !== action.deleteId);
        newState = removeWhereClause(action.deleteId, newState);
      }
      break;
    case SET_COLUMN_ANALYSIS_GROUP:
      if (!action.group) throw `${SET_COLUMN_ANALYSIS_GROUP}: No group`;
      else newState = setColumnAnalysisGroup(action, newState);
      newState = refreshTable(newState);
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
      newState = refreshTable(newState);
      break;
    case UPDATE_ITEM:
      newState = updateItem(action, newState);
      break;
    case UPDATE_WHERE_CLAUSE:
      newState = updateWhereClauses(action, newState);
      newState = refreshTable(newState);
      break;
    case UPDATE_WHERE_CLAUSE_CONDITION:
      newState = updateWhereClauseConditions(action, newState);
      newState = refreshTable(newState);
      break;
  }
  return newState;
};
