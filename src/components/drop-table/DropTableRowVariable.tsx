import { ContextMenuHandler } from '@asup/context-menu';
import { useContext, useMemo } from 'react';
import { DataSetJsonItemClass } from '../../classes/DatasetJsonItemClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { deleteRowVariable } from '../../functions/deleteRowVariable';
import { handleRowVariableDrop } from '../../functions/handleRowVariableDrop';
import { DropEdges } from '../drop-targets/DropEdges';
import { DraggableVariable } from '../lhs/DraggableVariable';
import { DropTableBodyRow } from './DropTableBodyRow';
import './DropTableRowVariable.css';

interface DropTableHeaderVariableProps {
  id: string;
  index: number;
}

export const DropTableRowVariable = ({ id, index }: DropTableHeaderVariableProps): JSX.Element => {
  const summaryTableContext = useContext(SummaryTableContext);
  const variable = useMemo<DataSetJsonItemClass>(
    () => summaryTableContext.rows[index],
    [index, summaryTableContext.rows],
  );

  return (
    <tr key={variable.name}>
      <td style={{ position: 'relative' }}>
        <ContextMenuHandler
          menuItems={[
            {
              label: 'Remove',
              action: () => deleteRowVariable(index, summaryTableContext),
            },
          ]}
        >
          <DropEdges
            id={`${id}`}
            onDropBottom={(ret) =>
              handleRowVariableDrop(
                { location: 'row', index: [index + 1] },
                ret,
                summaryTableContext,
              )
            }
          >
            <DraggableVariable
              id={`${id}-column-header-${index}`}
              variable={variable}
            />
          </DropEdges>
        </ContextMenuHandler>
      </td>
      <DropTableBodyRow rowIndex={index} />
    </tr>
  );
};
