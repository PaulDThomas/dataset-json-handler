import { useContext, useMemo } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { handleStatisticDrop } from '../../functions/handleColumnStatisticDrop';
import { handleColumnVariableDrop } from '../../functions/handleColumnVariableDrop';
import { SummaryVariable } from '../../interfaces/DatasetJsonItem';
import { DropEdges } from '../drop-targets/DropEdges';
import { StatisticHolder } from '../lhs/StatisticHolder';
import { VariableHolder } from '../lhs/VariableHolder';
import './DropTableColumnVariable.css';
import { ContextMenuHandler } from '@asup/context-menu';
import { deleteColumnVariable } from '../../functions/deleteColumnVariable';

interface DropTableHeaderVariableProps {
  id: string;
  index: number;
}

export const DropTableColumnVariable = ({
  id,
  index,
}: DropTableHeaderVariableProps): JSX.Element => {
  const summaryTableContext = useContext(SummaryTableContext);
  const variable = useMemo<SummaryVariable>(
    () => summaryTableContext.columns[index],
    [index, summaryTableContext.columns],
  );

  return (
    <th
      key={variable.name}
      style={{ position: 'relative' }}
    >
      <ContextMenuHandler
        menuItems={[
          {
            label: 'Remove',
            action: () => deleteColumnVariable(index, summaryTableContext),
          },
        ]}
        style={{ width: '100%', height: '100%' }}
      >
        <DropEdges
          id={id}
          onDropRight={(ret) =>
            handleColumnVariableDrop(
              { location: 'column', index: [index + 1] },
              ret,
              summaryTableContext,
            )
          }
          onDropBottom={(ret) =>
            handleStatisticDrop(
              { location: 'column', index: [index + 1] },
              ret,
              summaryTableContext,
            )
          }
        >
          <>
            <VariableHolder
              id={`${id}-column-header-${index}`}
              variable={variable}
            />
            {summaryTableContext.statisticPosition === 'column' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {summaryTableContext.statistics.map((s, i) => (
                  <StatisticHolder
                    key={i}
                    id={`${id}-statistic-${i}`}
                    statistic={s}
                  />
                ))}
              </div>
            )}
          </>
        </DropEdges>
      </ContextMenuHandler>
    </th>
  );
};
