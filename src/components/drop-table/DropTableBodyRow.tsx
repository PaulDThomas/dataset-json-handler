import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { eStatistic } from "../../enums/eStatistic";
import "./DropTableBodyRow.css";

interface DropTableBodyRowProps {
  rowIndex: number;
  statistic?: eStatistic;
}

export const DropTableBodyRow = ({
  rowIndex: index,
  statistic,
}: DropTableBodyRowProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);
  const columnAnalysisGroup = state.columnAnalysisGroup;

  return (
    <>
      {state.columns.map((item, i) => (
        <td key={`${columnAnalysisGroup?.id ?? "no-group"}-${i}`}>
          {statistic && (
            <div
              className="data-cell"
              style={{ textAlign: "center" }}
            >
              <>{`${statistic}(`}</>
              {state.rows[index].label} x {`${columnAnalysisGroup?.label ?? "No group"}["${item}"]`}
              {")"}
            </div>
          )}
        </td>
      ))}
    </>
  );
};

DropTableBodyRow.displayName = "DropTableBodyRow";
