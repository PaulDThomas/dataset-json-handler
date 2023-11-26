import { useCallback, useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { UPDATE_WHERE_CLAUSE_CONDITION } from "../../context/stReducer";
import { useDebounce } from "../../hooks/useDebounce";
import { WhereClauseConditionClass } from "../../main";
import { WhereClauseConditionRowProps } from "./WhereClauseConditionRow";

export const WhereClauseConditionMultiValues = ({
  id,
  canEdit,
}: WhereClauseConditionRowProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const whereClauseCondition = state.whereClauseConditions.find((w) => w.id === id);

  const update = useCallback(
    (ret: string) =>
      dispatch({
        operation: UPDATE_WHERE_CLAUSE_CONDITION,
        whereClauseConditions: [
          new WhereClauseConditionClass({
            ...whereClauseCondition?.data,
            filteredItemValues: ret.split("\n").map((v) => v.trim()),
          }),
        ],
      }),
    [dispatch, whereClauseCondition?.data],
  );

  const { currentValue, setCurrentValue } = useDebounce(
    (whereClauseCondition?.filteredItemValues ?? []).map((v) => v.toString()).join("\n"),
    update,
    2000,
  );

  return !whereClauseCondition ? (
    <></>
  ) : (
    <textarea
      value={currentValue}
      disabled={!canEdit}
      onChange={(e) => {
        e.preventDefault();
        setCurrentValue(e.currentTarget.value);
      }}
      onBlur={(e) => {
        e.preventDefault();
        update(e.currentTarget.value);
      }}
    />
  );
};

WhereClauseConditionMultiValues.displayName = "WhereClauseConditionMultiValues";
