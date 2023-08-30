import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_WHERE_CLAUSE_CONDITION } from "../../context/stReducer";
import { eItemType } from "../../classes/DatasetJsonItemClass";
import { WhereClauseConditionRowProps } from "./WhereClauseConditionRow";
import { DebouncedInput } from "../utility/DebouncedInput";

export const WhereClauseConditionSingleValue = ({
  id,
  canEdit,
}: WhereClauseConditionRowProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition = state.whereClauseConditions.find((w) => w.id === id);

  return !whereClauseCondition ? (
    <></>
  ) : (
    <DebouncedInput
      style={{ borderRadius: "4px", borderWidth: "1px" }}
      value={
        whereClauseCondition.filteredItemValues &&
        whereClauseCondition.filteredItemValues.length > 0
          ? whereClauseCondition.filteredItemValues[0].toString()
          : ""
      }
      type={
        (
          [eItemType.date, eItemType.datetime, eItemType.time] as (eItemType | undefined)[]
        ).includes(whereClauseCondition.item?.type)
          ? (whereClauseCondition.item?.type.valueOf() as "date" | "datetime" | "time")
          : undefined
      }
      setValue={(ret) => {
        if (canEdit) {
          whereClauseCondition.filteredItemValues = [ret];
          dispatch({
            operation: UPDATE_WHERE_CLAUSE_CONDITION,
            whereClauseConditions: [whereClauseCondition],
          });
        }
      }}
    />
  );
};

WhereClauseConditionSingleValue.displayName = "WhereClauseConditionSingleValue";
