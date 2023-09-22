import { useContext, useMemo } from "react";
import { DatasetJsonItemClass } from "../../classes/DatasetJsonItemClass";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { REMOVE_ROW_VARIABLE } from "../../context/stReducer";
import { DraggableItem } from "../lhs/DraggableItem";
import { DropTableBodyRow } from "./DropTableBodyRow";
import "./DropTableRowVariable.css";

interface DropTableRowVariableProps {
  id: string;
  index: number;
}

export const DropTableRowVariable = ({ id, index }: DropTableRowVariableProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const item = useMemo<DatasetJsonItemClass>(() => state.rows[index], [state.rows, index]);

  return (
    <tr>
      <td style={{ position: "relative" }}>
        <DraggableItem
          id={`${id}-column-header-${index}`}
          oid={item.OID}
          otherActions={[
            {
              label: "Remove",
              action: () => {
                dispatch({ operation: REMOVE_ROW_VARIABLE, item });
              },
            },
          ]}
        />
      </td>
      <DropTableBodyRow rowIndex={index} />
    </tr>
  );
};

DropTableRowVariable.displayName = "DropTableBodyRow";
