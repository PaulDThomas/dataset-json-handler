import { SummaryTableContextProps } from '../context/SummaryTableContext';
import { SummaryVariable } from '../interfaces/DatasetJsonItem';

export const deleteColumnVariable = (index: number, dnd: SummaryTableContextProps) => {
  // Check if data is a variable
  if (index >= dnd.columns.length) return;
  else {
    console.log('Delete column variable');
    const newCols: SummaryVariable[] = [...dnd.columns];
    newCols.splice(index, 1);
    dnd.setColumns(newCols);
  }
};
