import { ContextMenuHandler } from '@asup/context-menu';
import { useContext, useMemo } from 'react';
import { DataSetJsonItemClass } from '../../classes/DatasetJsonItemClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { MOVE_ROW_VARIABLE, REMOVE_ROW_VARIABLE } from '../../functions/reducer';
import { DropEdges } from '../drop-targets/DropEdges';
import { DraggableVariable } from '../lhs/DraggableVariable';
import { DropTableBodyRow } from './DropTableBodyRow';
import './DropTableRowVariable.css';

interface DropTableHeaderVariableProps {
  id: string;
  index: number;
}

export const DropTableRowVariable = ({ id, index }: DropTableHeaderVariableProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const item = useMemo<DataSetJsonItemClass>(() => state.rows[index], [state.rows, index]);

  return (
    <tr key={item.name}>
      <td style={{ position: 'relative' }}>
        <ContextMenuHandler
          menuItems={[
            {
              label: 'Remove',
              action: () => dispatch({ type: REMOVE_ROW_VARIABLE, item }),
            },
          ]}
        >
          <DropEdges
            id={`${id}`}
            onDropBottom={(ret) => {
              if (ret.data instanceof DataSetJsonItemClass) {
                dispatch({ type: MOVE_ROW_VARIABLE, position: index + 1, item: ret.data });
              }
            }}
          >
            <DraggableVariable
              id={`${id}-column-header-${index}`}
              item={item}
            />
          </DropEdges>
        </ContextMenuHandler>
      </td>
      <DropTableBodyRow rowIndex={index} />
    </tr>
  );
};
