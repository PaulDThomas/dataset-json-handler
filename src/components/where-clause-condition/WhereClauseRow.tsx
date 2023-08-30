import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { REMOVE_PAGE_WHERE } from "../../context/stReducer";
import { WhereClauseConditionRow } from "./WhereClauseConditionRow";

export interface WhereClauseRowProps {
  id: string;
  showLabel?: boolean;
  canEdit?: boolean;
}

export const WhereClauseRow = ({
  id,
  showLabel = true,
  canEdit = true,
}: WhereClauseRowProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClause = state.whereClauses.find((w) => w.id === id);

  return !whereClause ? (
    <></>
  ) : (
    <div
      className="whereclause-main"
      style={{
        display: "flex",
        flexDirection: "row",
        minWidth: "530px",
      }}
    >
      <div
        className="whereclausecondition-remove-holder"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <span
          style={{ color: "red", cursor: "pointer" }}
          onClick={
            canEdit
              ? () =>
                  dispatch({
                    operation: REMOVE_PAGE_WHERE,
                    whereClauses: [whereClause],
                  })
              : undefined
          }
        >
          {"\u2296"}
        </span>
        {showLabel && (
          <>
            <span>{whereClause.order}</span>
            <span
              style={{
                marginLeft: "4px",
              }}
            >
              {whereClause.label}
            </span>
          </>
        )}
        {whereClause.condition && (
          <WhereClauseConditionRow
            id={whereClause.condition}
            canEdit={canEdit}
          />
        )}
      </div>
    </div>
  );
};
