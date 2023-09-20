import { useContext } from "react";
import { AnalysisGroupClass } from "../../classes/AnalysisGroup";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { ADD_ANAL_GROUP_LEVELS } from "../../context/stReducer";
import { WhereClauseClass, WhereClauseConditionClass } from "../../main";

interface AddNewLevelButtonProps {
  id: string;
}

function createWhereClauseAndCondition(order: number, label = "New level") {
  const newWhereClauseCondition = new WhereClauseConditionClass();
  const newWhereClause = new WhereClauseClass({
    order,
    label,
    condition: newWhereClauseCondition.id,
  });
  return { newWhereClauses: [newWhereClause], newWhereClauseConditions: [newWhereClauseCondition] };
}

export const AddNewLevelButton = ({ id }: AddNewLevelButtonProps) => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const group = state.groupList.find((g) => g.id === id && g.type === "AnalysisGroup") as
    | AnalysisGroupClass
    | undefined;

  const { newWhereClauses, newWhereClauseConditions } = createWhereClauseAndCondition(
    Math.max(
      ...(group?.levels?.map((l) => state.whereClauses.find((w) => w.id === l)?.order ?? 0) ?? [0]),
    ) + 1,
  );

  return !group ? (
    <></>
  ) : (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch({
            operation: ADD_ANAL_GROUP_LEVELS,
            id,
            whereClauses: newWhereClauses,
            whereClauseConditions: newWhereClauseConditions,
          });
        }}
        title="Add new level"
        className="add-new-level-button"
      >
        Add new level
      </button>
    </>
  );
};

AddNewLevelButton.displayName = "AddNewLevelButton";
