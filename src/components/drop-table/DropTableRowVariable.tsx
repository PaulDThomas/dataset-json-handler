import { useContext, useMemo } from "react";
import { DatasetJsonItemClass } from "../../classes/DatasetJsonItemClass";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { MOVE_ROW_VARIABLE, REMOVE_ROW_VARIABLE } from "../../context/stReducer";
import { DropEdges } from "../drop-targets/DropEdges";
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
        <DropEdges
          id={`${id}`}
          onDropBottom={(ret) => {
            if (ret.data instanceof DatasetJsonItemClass) {
              dispatch({ operation: MOVE_ROW_VARIABLE, position: index + 1, item: ret.data });
            }
          }}
        >
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
        </DropEdges>
      </td>
      <DropTableBodyRow rowIndex={index} />
    </tr>
  );
};
