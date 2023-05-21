import { SummaryTableContextProps } from '../context/SummaryTableContext';
import { SummaryVariable } from '../interfaces/DatasetJsonItem';
import { Position, DndData } from '../interfaces/summaryInterfaces';
import { moveVariable } from './moveVariable';

export const handleRowVariableDrop = (
  position: Position,
  data: unknown,
  dnd: SummaryTableContextProps,
) => {
  // Check if data is a variable
  if (!data || (data as DndData).type !== 'variable') return;
  else {
    const newRows = moveVariable(
      dnd.rows,
      (data as DndData).data as SummaryVariable,
      position.index[0],
    );
    dnd.setRows(newRows);
    dnd.setColumns(
      dnd.columns.filter((v) => v.OID !== ((data as DndData).data as SummaryVariable).OID),
    );
  }
};
