import { useContext } from "react";
import { AnalysisGroup } from "../../classes/AnalysisGroup";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { WhereClauseRow } from "../where-clause-condition/WhereClauseRow";
import { AddNewLevelButton } from "./AddNewLevelButton";
import { AddDataLevelsButton } from "./AddDataLevelsButton";

interface AnalGroupLevelsProps {
  id: string;
}
export const AnalGroupLevels = ({ id }: AnalGroupLevelsProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);

  const analysisGroup = state.groupList.find((g) => g.id === id && g.type === "AnalysisGroup") as
    | AnalysisGroup
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
            .map((level, i) => (
              <WhereClauseRow
                key={i}
                id={level}
                canEdit
                showLabel
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

AnalGroupLevels.displayName = "GroupLevels";
