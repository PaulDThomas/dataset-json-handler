import { ContextWindow } from "@asup/context-menu";
import { useContext, useState } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { ADD_PAGE_WHERE, REMOVE_PAGE_WHERE } from "../../context/stReducer";
import { WhereClauseRow } from "./WhereClauseRow";

interface SummaryTableWhereProps {
  editable?: boolean;
}

export const SummaryTableWhere = ({ editable = true }: SummaryTableWhereProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const [showWindow, setShowWindow] = useState<boolean>(false);

  return (
    <div
      className="stwhere-main"
      style={{
        height: "24px",
      }}
    >
      <div className="">
        {state.page.length} filter
        {state.page.length === 1 ? "" : "s"} applied
        <span
          className="stwhere-edit-button"
          title="Edit filters"
          style={{
            cursor: "pointer",
          }}
          onClick={() => setShowWindow(true)}
        >
          {"\u2026"}
        </span>
        <ContextWindow
          visible={showWindow}
          id={"stwhere-window"}
          title={"Where clauses"}
          onClose={() => setShowWindow(false)}
          style={{ width: "600px" }}
        >
          <div className="stwhere-main">
            {state.page.map((wid, i) => {
              const w = state.whereClauses.find((w) => w.id === wid);
              return !w ? (
                <></>
              ) : (
                <WhereClauseRow
                  key={i}
                  id={w.id}
                  showLabel={false}
                  canEdit={true}
                  removeOp={() => {
                    dispatch({ operation: REMOVE_PAGE_WHERE, deleteId: w.id });
                  }}
                />
              );
            })}
            {editable &&
              !state.page.some(
                (pw) =>
                  state.whereClauseConditions.find(
                    (wc) => wc.id === state.whereClauses.find((w) => w.id === pw)?.condition,
                  )?.isValid,
              ) && (
                <button
                  style={{ cursor: "pointer" }}
                  className="stwhere-add-where-clause"
                  disabled
                  onClick={() =>
                    dispatch({
                      operation: ADD_PAGE_WHERE,
                      id: crypto.randomUUID(),
                    })
                  }
                >
                  {"\u2295 "}
                  Add
                </button>
              )}
          </div>
        </ContextWindow>
      </div>
    </div>
  );
};

SummaryTableWhere.displayName = "SummaryTableWhere";
