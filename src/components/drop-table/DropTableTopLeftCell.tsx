import { useContext } from "react";
import { DatasetJsonItemClass } from "../../classes/DatasetJsonItemClass";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { MOVE_ROW_VARIABLE, SET_COLUMN_ANALYSIS_GROUP } from "../../context/stReducer";
import { DropEdges } from "../drop-targets/DropEdges";
import "./DropTableTopLeftCell.css";
import { AnalysisGroupClass } from "../../main";

interface DropTableTopLeftCellProps {
  id: string;
}

export const DropTableTopLeftCell = ({ id }: DropTableTopLeftCellProps): JSX.Element => {
  const { dispatch } = useContext(SummaryTableContext);
  return (
    <th style={{ position: "relative" }}>
      <DropEdges
        id={`${id}-drop-edges`}
        onDropBottom={(ret) => {
          if (ret.data instanceof DatasetJsonItemClass) {
            dispatch({ operation: MOVE_ROW_VARIABLE, position: 0, item: ret.data });
          }
        }}
        onDropRight={(ret) => {
          if (ret.data instanceof AnalysisGroupClass)
            dispatch({ operation: SET_COLUMN_ANALYSIS_GROUP, group: ret.data });
        }}
        allowableTypes={{
          right: ["analysisgroup"],
        }}
      >
        <div className="tl-cell-holder" />
      </DropEdges>
    </th>
  );
};

DropTableTopLeftCell.displayName = "DropTabelTopLeftCell";
