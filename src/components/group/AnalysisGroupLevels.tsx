import { useContext } from "react";
import { AnalysisGroup } from "../../classes/AnalysisGroup";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { WhereClauseRow } from "../where-clause-condition/WhereClauseRow";
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
      {analysisGroup.levels?.map((level, i) => (
        <div key={i}>
          <WhereClauseRow
            id={level}
            canEdit
            showLabel
          />
        </div>
      ))}
    </div>
  );
};

AnalGroupLevels.displayName = "GroupLevels";
