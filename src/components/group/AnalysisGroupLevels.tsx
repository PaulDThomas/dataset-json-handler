import { useContext } from "react";
import { AnalysisGroupClass } from "../../classes/AnalysisGroupClass";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { REMOVE_ANAL_GROUP_LEVEL } from "../../context/stReducer";
import { WhereClauseRow } from "../where-clause-condition/WhereClauseRow";
import { AddDataLevelsButton } from "./AddDataLevelsButton";
import { AddNewLevelButton } from "./AddNewLevelButton";

interface AnalGroupLevelsProps {
  id: string;
}
export const AnalGroupLevels = ({ id }: AnalGroupLevelsProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);

  const analysisGroup = state.groupList.find((g) => g.id === id && g.type === "AnalysisGroup") as
    | AnalysisGroupClass
    | undefined;

  return !analysisGroup ? (
    <></>
  ) : (
    <div className="group-levels-display">
      <AddDataLevelsButton id={id} />
      <AddNewLevelButton id={id} />
      <table className="group-levels-table">
        <tbody>
          {analysisGroup.levels
            ?.sort(
              (a, b) =>
                (state.whereClauses?.find((w) => a === w.id)?.order ?? 0) -
                (state.whereClauses?.find((w) => b === w.id)?.order ?? 0),
            )
            .map((level) => (
              <WhereClauseRow
                key={level}
                id={level}
                canEdit
                showLabel
                removeOp={() => {
                  dispatch({
                    operation: REMOVE_ANAL_GROUP_LEVEL,
                    group: analysisGroup,
                    deleteId: level,
                  });
                }}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

AnalGroupLevels.displayName = "GroupLevels";
