import { DataSetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { SummaryTableContextProps } from '../context/SummaryTableContext';

export const deleteColumnVariable = (index: number, dnd: SummaryTableContextProps) => {
  // Check if data is a variable
  if (index >= dnd.columns.length) return;
  else {
    console.log('Delete column variable');
    const newCols: DataSetJsonItemClass[] = [...dnd.columns];
    newCols.splice(index, 1);
    dnd.setColumns(newCols);
  }
};
