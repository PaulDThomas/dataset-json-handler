import { useCallback, useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { LOAD_STATUS } from "../../context/stReducer";

export const SaveSummaryTableButton = () => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const DoSave = useCallback(() => {
    window.localStorage.setItem(
      "summaryTable",
      JSON.stringify({
        rows: state.rows.map((i) => i.data),
        columns: state.columns.map((i) => i.data),
        target: state.target?.data,
        statistics: state.statistics,
        statisticPosition: state.statisticPosition,
        whereClauseConditions: state.whereClauseConditions.map((i) => i.data),
        groupList: state.groupList.map((i) => i.data),
        itemList: state.itemList.map((i) => i.data),
      }),
    );
  }, [state]);
  const DoLoad = useCallback(() => {
    const newStatus = JSON.parse(window.localStorage.getItem("summaryTable") ?? "{}");
    dispatch({ operation: LOAD_STATUS, incomingStatus: newStatus });
  }, [dispatch]);

  return (
    <div style={{ display: "inline-block" }}>
      <button
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
