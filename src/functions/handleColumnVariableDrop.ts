import { DataSetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { SummaryTableContextProps } from '../context/SummaryTableContext';
import { Position, DndData } from '../interfaces/summaryInterfaces';
import { moveVariable } from './moveVariable';

export const handleColumnVariableDrop = (
  position: Position,
  data: unknown,
  dnd: SummaryTableContextProps,
) => {
  // Check if data is a variable
  if (!data || (data as DndData).type !== 'variable') return;
  else {
    const newCols = moveVariable(
      dnd.columns,
      (data as DndData).data as DataSetJsonItemClass,
      position.index[0],
    );
    dnd.setColumns(newCols);
    dnd.setRows(
      dnd.rows.filter((v) => v.OID !== ((data as DndData).data as DataSetJsonItemClass).OID),
    );
  }
};
