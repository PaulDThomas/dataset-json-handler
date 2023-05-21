import { useContext, useMemo } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { handleRowVariableDrop } from '../../functions/handleRowVariableDrop';
import { SummaryVariable } from '../../interfaces/DatasetJsonItem';
import { DropEdges } from '../drop-targets/DropEdges';
import { VariableHolder } from '../lhs/VariableHolder';
import { DropTableBodyRow } from './DropTableBodyRow';
import './DropTableRowVariable.css';
import { ContextMenuHandler } from '@asup/context-menu';
import { deleteRowVariable } from '../../functions/deleteRowVariable';

interface DropTableHeaderVariableProps {
  id: string;
  index: number;
}

export const DropTableRowVariable = ({ id, index }: DropTableHeaderVariableProps): JSX.Element => {
  const summaryTableContext = useContext(SummaryTableContext);
  const variable = useMemo<SummaryVariable>(
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
            <VariableHolder
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
