import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import "./DropTable.css";
import { DropTableColumnVariable } from "./DropTableColumnVariable";
import { DropTableRowVariable } from "./DropTableRowVariable";
import { DropTableTopLeftCell } from "./DropTableTopLeftCell";

interface DropTableProps {
  id: string;
}

export const DropTable = ({ id }: DropTableProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);

  return (
    <div className="drop-table-holder">
      <table
        id={id}
        className="drop-table"
      >
        <thead>
          <tr>
            <DropTableTopLeftCell id={`${id}-tl-cell`} />
            {state.columns.map((v, i) => (
              <DropTableColumnVariable
                key={`${i}`}
                id={`${id}-header-${i}`}
                index={i}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {state.rows.map((v, i) => (
            <DropTableRowVariable
              key={`${i}:${v.OID}`}
              id={`${id}-row-variable-${i}`}
              index={i}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
