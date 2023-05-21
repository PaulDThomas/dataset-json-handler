import { SummaryTableContextProps } from '../context/SummaryTableContext';
import { DndData, Position, eStatistic } from '../interfaces/summaryInterfaces';
import { moveStatistic } from './moveStatistic';

export const handleStatisticDrop = (
  position: Position,
  data: unknown,
  dnd: SummaryTableContextProps,
) => {
  // Check if data is a variable
  if (!data || (data as DndData).type !== 'statistic') return;
  else {
    const newStatistics = moveStatistic(
      dnd.statistics,
      (data as DndData).data as eStatistic,
      position.index[0],
    );
    dnd.setDndTableSchema &&
      dnd.setDndTableSchema({
        columns: dnd.columns,
        rows: dnd.rows,
        target: dnd.target,
        statisticPosition: position.location,
        statistics: newStatistics,
      });
  }
};
