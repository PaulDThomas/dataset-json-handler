import { useContext } from "react";
import { eStatistic } from "../../enums/eStatistic";
import { DropEdges } from "../drop-targets/DropEdges";
import { DropTableBodyRow } from "./DropTableBodyRow";
import "./DropTableRowStatistic.css";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { MOVE_ROW_VARIABLE } from "../../context/stReducer";
import { DatasetJsonItemClass } from "../../main";

interface DropTableRowStatisticProps {
  id: string;
  index: number;
  statistic: eStatistic;
  last: boolean;
}

export const DropTableRowStatistic = ({
  id,
  index,
  statistic,
  last,
}: DropTableRowStatisticProps): JSX.Element => {
  const { dispatch } = useContext(SummaryTableContext);
  return (
    <tr>
      <td
        id={`${id}`}
        style={{ position: "relative", textAlign: "center" }}
      >
        <DropEdges
          id={`${id}-edge`}
          onDropBottom={
            last
              ? (ret) => {
                  if (ret.data instanceof DatasetJsonItemClass) {
                    dispatch({ operation: MOVE_ROW_VARIABLE, position: index + 1, item: ret.data });
                  }
                }
              : undefined
          }
        >
          <>{statistic}</>
        </DropEdges>
      </td>
      <DropTableBodyRow
        rowIndex={index}
        statistic={statistic}
      />
    </tr>
  );
};

DropTableRowStatistic.displayName = "DropTableRowStatistic";
