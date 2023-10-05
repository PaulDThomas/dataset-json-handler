import { AnalysisGroup, AnalysisGroupClass } from "../classes/AnalysisGroupClass";
import { DataGroup, DataGroupClass } from "../classes/DataGroupClass";
import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { WhereClauseClass } from "../classes/WhereClauseClass";
import { WhereClauseConditionClass } from "../classes/WhereClauseConditionClass";
import { SummaryTableSchema } from "../context/SummaryTableContext";
import { StActionProps, LOAD_STATUS } from "../context/stReducer";

export function loadStatus(action: StActionProps) {
  if (action.incomingStatus === undefined) {
    throw `${LOAD_STATUS}: No incoming data`;
  } else {
    const newState: SummaryTableSchema = {
      page: action.incomingStatus.page,
      rows: action.incomingStatus.rows.map((i) => new DatasetJsonItemClass(i)),
      columnAnalysisGroup: action.incomingStatus.columnAnalysisGroup
        ? new AnalysisGroupClass(action.incomingStatus.columnAnalysisGroup)
        : null,
      columns: action.incomingStatus.columns,
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
