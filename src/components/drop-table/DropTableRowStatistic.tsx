import { eStatistic } from "../../enums/eStatistic";
import { DropTableBodyRow } from "./DropTableBodyRow";
import "./DropTableRowStatistic.css";

interface DropTableRowStatisticProps {
  id: string;
  index: number;
  statistic: eStatistic;
}

export const DropTableRowStatistic = ({
  id,
  index,
  statistic,
}: DropTableRowStatisticProps): JSX.Element => {
  return (
    <tr>
      <td
        id={`${id}`}
        style={{ position: "relative", textAlign: "center" }}
      >
        {statistic}
      </td>
      <DropTableBodyRow
        rowIndex={index}
        statistic={statistic}
      />
    </tr>
  );
};
