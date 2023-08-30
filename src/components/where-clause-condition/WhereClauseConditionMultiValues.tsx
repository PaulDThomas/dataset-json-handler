import { useContext, useEffect, useState } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_WHERE_CLAUSE_CONDITION } from "../../context/stReducer";
import { WhereClauseConditionRowProps } from "./WhereClauseConditionRow";
import { useDebounce } from "../../hooks/useDebounce";
import { WhereClauseConditionClass } from "../../main";

export const WhereClauseConditionMultiValues = ({
  id,
  canEdit,
}: WhereClauseConditionRowProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition = state.whereClauseConditions.find((w) => w.id === id);

  // Debounce
  const [currentValue, setCurrentValue] = useState<string[]>(
    (whereClauseCondition?.filteredItemValues ?? []).map((v) => v.toString()),
  );
  useEffect(
    () =>
      whereClauseCondition &&
      setCurrentValue(whereClauseCondition.filteredItemValues.map((v) => v.toString())),
    [whereClauseCondition],
  );

  const debouncedValue = useDebounce<string[]>(currentValue, 500);
  useEffect(() => {
    whereClauseCondition &&
      debouncedValue.join("\n").trim() !==
        whereClauseCondition.filteredItemValues
          .map((v) => v.toString())
          .join("\n")
          .trim() &&
      dispatch({
        operation: UPDATE_WHERE_CLAUSE_CONDITION,
        whereClauseConditions: [
          new WhereClauseConditionClass({
            ...whereClauseCondition.data,
            filteredItemValues: debouncedValue.join("\n").trim().split("\n"),
          }),
        ],
      });
  }, [debouncedValue, dispatch, whereClauseCondition]);

  return !whereClauseCondition ? (
    <></>
  ) : (
    <textarea
      value={currentValue.join("\n")}
      disabled={!canEdit}
      onChange={(e) => {
        e.stopPropagation();
        setCurrentValue(e.currentTarget.value.split("\n"));
      }}
    />
  );
};

WhereClauseConditionMultiValues.displayName = "WhereClauseConditionMultiValues";
