import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_WHERE_CLAUSE_CONDITION } from "../../context/stReducer";
import { eItemType } from "../../classes/DatasetJsonItemClass";
import { WhereClauseConditionProps } from "./WhereClauseConditionRow";

export const WhereClauseConditionSingleValue = ({ index, canEdit }: WhereClauseConditionProps) => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition =
    state.whereClauseConditions.length > index ? state.whereClauseConditions[index] : null;
  if (!whereClauseCondition || !whereClauseCondition.item) return <></>;
  return (
    <input
      style={{ borderRadius: "4px", borderWidth: "1px" }}
      value={
        whereClauseCondition.filteredItemValues &&
        whereClauseCondition.filteredItemValues.length > 0
          ? whereClauseCondition.filteredItemValues[0].toString()
          : ""
      }
      type={
        [eItemType.date, eItemType.datetime, eItemType.time].includes(
          whereClauseCondition.item.type,
        )
          ? whereClauseCondition.item.type
          : undefined
      }
      onChange={
        canEdit
          ? (e) => {
              whereClauseCondition.filteredItemValues = [e.currentTarget.value];
              dispatch({
                operation: UPDATE_WHERE_CLAUSE_CONDITION,
                whereClauseCondition: whereClauseCondition,
              });
            }
          : undefined
      }
    />
  );
};
