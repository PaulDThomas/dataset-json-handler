import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_WHERE_CLAUSE_CONDITION } from "../../context/stReducer";
import { OperationSelector } from "./OperationSelector";
import { WhereClauseConditionItem } from "./WhereClauseConditionItem";
import { WhereClauseConditionMultiValues } from "./WhereClauseConditionMultiValues";
import { WhereClauseConditionSingleValue } from "./WhereClauseConditionSingleValue";

export interface WhereClauseConditionRowProps {
  id: string;
  canEdit: boolean;
}

export const WhereClauseConditionRow = ({
  id,
  canEdit = true,
}: WhereClauseConditionRowProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition = state.whereClauseConditions.find((wc) => wc.id === id);

  return !whereClauseCondition ? (
    <></>
  ) : (
    <div
      className="whereclausecondition-main"
      style={{
        display: "flex",
        flexDirection: "row",
        minWidth: "530px",
      }}
    >
      <WhereClauseConditionItem id={id} />
      {whereClauseCondition.item && (
        <>
          <OperationSelector
            selected={whereClauseCondition.whereOperation}
            setSelected={
              canEdit
                ? (ret) => {
                    whereClauseCondition.whereOperation = ret;
                    dispatch({
                      operation: UPDATE_WHERE_CLAUSE_CONDITION,
                      whereClauseConditions: [whereClauseCondition],
                    });
                  }
                : undefined
            }
          />
          <div
            className="whereclausecondition-values"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "2px",
            }}
          >
            {whereClauseCondition.whereOperation ? (
              {
                eq: (
                  <WhereClauseConditionSingleValue
                    id={id}
                    canEdit={canEdit}
                  />
                ),
                lt: (
                  <WhereClauseConditionSingleValue
                    id={id}
                    canEdit={canEdit}
                  />
                ),
                le: (
                  <WhereClauseConditionSingleValue
                    id={id}
                    canEdit={canEdit}
                  />
                ),
                gt: (
                  <WhereClauseConditionSingleValue
                    id={id}
                    canEdit={canEdit}
                  />
                ),
                ge: (
                  <WhereClauseConditionSingleValue
                    id={id}
                    canEdit={canEdit}
                  />
                ),
                in: (
                  <WhereClauseConditionMultiValues
                    id={id}
                    canEdit={canEdit}
                  />
                ),
                not_in: (
                  <WhereClauseConditionMultiValues
                    id={id}
                    canEdit={canEdit}
                  />
                ),
                default: <></>,
              }[whereClauseCondition.whereOperation.valueOf()]
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100%",
                  padding: "0.5rem",
                }}
              >
                No defined values
              </div>
            )}
          </div>
        </>
      )}
      {!whereClauseCondition.isValid && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "4px",
          }}
          title="Where clause condition is not valid"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            color="red"
            viewBox="0 0 16 16"
          >
            <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
      )}
    </div>
  );
};
WhereClauseConditionRow.displayName = "WhereClauseRow";
