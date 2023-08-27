import { ContextWindow } from "@asup/context-menu";
import { useContext, useState } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { ADD_PAGE_WHERE } from "../../context/stReducer";
import { WhereClauseConditionRow } from "./WhereClauseConditionRow";

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
        {state.whereClauseConditions.length} filter
        {state.whereClauseConditions.length === 1 ? "" : "s"} applied
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
              const w = state.whereClauseConditions.find((w) => w.id === wid);
              return !w ? (
                <></>
              ) : (
                <WhereClauseConditionRow
                  key={i}
                  id={w.id}
                  canEdit={true}
                />
              );
            })}
            {editable && !state.whereClauseConditions.some((w) => !w.isValid) && (
              <div
                className="stwhere-add-where-clause"
                onClick={() => dispatch({ operation: ADD_PAGE_WHERE, newId: crypto.randomUUID() })}
              >
                {"\u2295 "}
                Add where clause
              </div>
            )}
          </div>
        </ContextWindow>
      </div>
    </div>
  );
};

SummaryTableWhere.displayName = "SummaryTableWhere";
