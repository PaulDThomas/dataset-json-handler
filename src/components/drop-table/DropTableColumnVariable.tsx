import { ContextMenuHandler } from '@asup/context-menu';
import { useContext, useMemo } from 'react';
import { DatasetJsonItemClass } from '../../classes/DatasetJsonItemClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { MOVE_COLUMN_VARIABLE, REMOVE_COLUMN_VARIABLE } from '../../functions/reducer';
import { DropEdges } from '../drop-targets/DropEdges';
import { DraggableItem } from '../lhs/DraggableItem';
import { StatisticHolder } from '../lhs/StatisticHolder';
import './DropTableColumnVariable.css';

interface DropTableHeaderVariableProps {
  id: string;
  index: number;
}

export const DropTableColumnVariable = ({
  id,
  index,
}: DropTableHeaderVariableProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);
  const item = useMemo<DatasetJsonItemClass>(() => state.columns[index], [index, state.columns]);

  return (
    <th
      key={item.name}
      style={{ position: 'relative' }}
    >
      <ContextMenuHandler
        menuItems={[
          {
            label: 'Remove',
            action: () => dispatch({ type: REMOVE_COLUMN_VARIABLE, item }),
          },
        ]}
        style={{ width: '100%', height: '100%' }}
      >
        <DropEdges
          id={id}
          onDropRight={(ret) => {
            if (ret.data instanceof DatasetJsonItemClass)
              dispatch({ type: MOVE_COLUMN_VARIABLE, position: index + 1, item: ret.data });
          }}
        >
          <>
            <DraggableItem
              id={`${id}-column-header-${index}`}
              oid={item.OID}
            />
            {state.statisticPosition === 'column' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {state.statistics.map((s, i) => (
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
