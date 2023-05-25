import { DataSetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { SummaryTableContextProps } from '../context/SummaryTableContext';

export const deleteRowVariable = (index: number, dnd: SummaryTableContextProps) => {
  // Check if data is a variable
  if (index >= dnd.rows.length) return;
  else {
    console.log('Delete row variable');
    const newRows: DataSetJsonItemClass[] = [...dnd.rows];
    newRows.splice(index, 1);
    dnd.setRows(newRows);
  }
};
