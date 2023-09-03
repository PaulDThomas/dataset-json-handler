import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { REMOVE_PAGE_WHERE, UPDATE_WHERE_CLAUSE } from "../../context/stReducer";
import { WhereClauseConditionRow } from "./WhereClauseConditionRow";
import { DebouncedInput } from "../utility/DebouncedInput";

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
    <tr
      className="whereclause-main"
      style={{
        minWidth: "530px",
      }}
    >
      <td
        className="whereclausecondition-remove-holder"
        style={{
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
      </td>
      {showLabel && (
        <>
          <td>
            <span>
              <input
                type="number"
                value={whereClause.order}
                style={{ width: "40px" }}
                onChange={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  whereClause.order = parseInt(e.currentTarget.value) ?? 0;
                  dispatch({ operation: UPDATE_WHERE_CLAUSE, whereClauses: [whereClause] });
                }}
              />
            </span>
          </td>
          <td>
            <span
              style={{
                marginLeft: "4px",
              }}
            >
              {/* {whereClause.label} */}
              <DebouncedInput
                type="text"
                value={whereClause.label}
                setValue={(ret) => {
                  whereClause.label = ret;
                  dispatch({ operation: UPDATE_WHERE_CLAUSE, whereClauses: [whereClause] });
                }}
              />
            </span>
          </td>
        </>
      )}
      <td>
        {whereClause.condition && (
          <WhereClauseConditionRow
            id={whereClause.condition}
            canEdit={canEdit}
          />
        )}
      </td>
    </tr>
  );
};
