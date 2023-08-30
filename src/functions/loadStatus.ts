import { AnalysisGroup, AnalysisGroupClass } from "../classes/AnalysisGroup";
import { DataGroup, DataGroupClass } from "../classes/DataGroup";
import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { WhereClauseClass } from "../classes/WhereClauseClass";
import { WhereClauseConditionClass } from "../classes/WhereClauseConditionClass";
import { SummaryTableSchema } from "../context/SummaryTableContext";
import { ActionProps, LOAD_STATUS } from "../context/stReducer";

export function loadStatus(action: ActionProps) {
  if (action.incomingStatus === undefined) {
    throw `${LOAD_STATUS}: No incoming data`;
  } else {
    const newState: SummaryTableSchema = {
      page: action.incomingStatus.page,
      rows: action.incomingStatus.rows.map((i) => new DatasetJsonItemClass(i)),
      columns: action.incomingStatus.columns.map((i) => new DatasetJsonItemClass(i)),
      target: action.incomingStatus.target
        ? new DatasetJsonItemClass(action.incomingStatus.target)
        : undefined,
      statistics: action.incomingStatus.statistics,
      statisticPosition: action.incomingStatus.statisticPosition,
      whereClauses: action.incomingStatus.whereClauses.map((w) => new WhereClauseClass(w)),
      whereClauseConditions: action.incomingStatus.whereClauseConditions.map(
        (w) => new WhereClauseConditionClass(w),
      ),
      groupList: action.incomingStatus.groupList.map((g) =>
        g.type === "AnalysisGroup"
          ? new AnalysisGroupClass(g as AnalysisGroup)
          : new DataGroupClass(g as DataGroup),
      ),
      itemList: action.incomingStatus.itemList.map((i) => new DatasetJsonItemClass(i)),
    };
    return newState;
  }
}
