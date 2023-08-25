import { useContext } from "react";
import { WhereClauseConditionClass, Operation } from "../../classes/WhereClauseConditionClass";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { OperationSelector } from "./OperationSelector";
import {
  REMOVE_WHERE_CLAUSE_CONDITION,
  UPDATE_WHERE_CLAUSE_CONDITION,
} from "../../context/stReducer";
import { WhereClauseConditionItem } from "./WhereClauseConditionItem";
import { WhereClauseConditionSingleValue } from "./WhereClauseConditionSingleValue";
import { WhereClauseConditionMultiValues } from "./WhereClauseConditionMultiValues";

export interface WhereClauseConditionProps {
  index: number;
  canEdit: boolean;
}

export const WhereClauseConditionRow = ({
  index,
  canEdit,
}: WhereClauseConditionProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition =
    state.whereClauseConditions.length > index ? state.whereClauseConditions[index] : null;

  if (!whereClauseCondition) return <></>;
  return (
    <div
      className="whereclausecondition-main"
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
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <span
          style={{ color: "red" }}
          onClick={
            canEdit
              ? () =>
                  dispatch({
                    operation: REMOVE_WHERE_CLAUSE_CONDITION,
                    whereClauseCondition: whereClauseCondition,
                  })
              : undefined
          }
        >
          {"\u2296"}
        </span>
      </div>
      <WhereClauseConditionItem index={index} />
      {whereClauseCondition.item && (
        <>
          <OperationSelector
            selected={whereClauseCondition.whereOperation}
            setSelected={
              canEdit
                ? (ret) => {
                    const newWhere = new WhereClauseConditionClass(
                      state.whereClauseConditions[index],
                    );
                    newWhere.whereOperation = ret as Operation;
                    dispatch({
                      operation: UPDATE_WHERE_CLAUSE_CONDITION,
                      whereClauseCondition: newWhere,
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
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                lt: (
                  <WhereClauseConditionSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                le: (
                  <WhereClauseConditionSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                gt: (
                  <WhereClauseConditionSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                ge: (
                  <WhereClauseConditionSingleValue
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                in: (
                  <WhereClauseConditionMultiValues
                    index={index}
                    canEdit={canEdit}
                  />
                ),
                not_in: (
                  <WhereClauseConditionMultiValues
                    index={index}
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
          {!whereClauseCondition.isValid && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "4px",
              }}
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
        </>
      )}
    </div>
  );
};
WhereClauseConditionRow.displayName = "WhereClauseRow";
