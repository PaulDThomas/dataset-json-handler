import { useCallback, useContext } from "react";
import { SummaryTableContext, SummaryTableData } from "../../context/SummaryTableContext";
import { LOAD_STATUS } from "../../context/stReducer";

export const SaveSummaryTableButton = (): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const DoSave = useCallback(() => {
    const toSave: SummaryTableData = {
      page: state.page,
      rows: state.rows.map((i) => i.data),
      columnAnalysisGroup: state.columnAnalysisGroup?.data ?? null,
      columns: state.columns,
      target: state.target?.data,
      statistics: state.statistics,
      statisticPosition: state.statisticPosition,
      whereClauses: state.whereClauses.map((w) => w.data),
      whereClauseConditions: state.whereClauseConditions.map((w) => w.data),
      groupList: state.groupList.map((g) => g.data),
      itemList: state.itemList.map((i) => i.data),
    };
    window.localStorage.setItem("summaryTable", JSON.stringify(toSave));
  }, [state]);
  const DoLoad = useCallback(() => {
    const newStatus = JSON.parse(window.localStorage.getItem("summaryTable") ?? "{}");
    dispatch({ operation: LOAD_STATUS, incomingStatus: newStatus });
  }, [dispatch]);

  return (
    <div style={{ display: "inline-block" }}>
      <button
        disabled={window.localStorage.getItem("summaryTable") !== undefined}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          DoLoad();
        }}
      >
        Load
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          DoSave();
        }}
      >
        Save
      </button>
    </div>
  );
};

SaveSummaryTableButton.displayName = "SaveSummaryTableButton";
