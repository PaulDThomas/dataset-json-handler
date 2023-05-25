import { useContext } from 'react';
import './DropTableBodyRow.css';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface DropTableBodyRowProps {
  rowIndex: number;
}

export const DropTableBodyRow = ({ rowIndex: index }: DropTableBodyRowProps): JSX.Element => {
  const summaryTableContext = useContext(SummaryTableContext);

  return (
    <>
      {summaryTableContext.columns.map((variable, ci) => (
        <td key={variable.OID ?? ci}>
          <div
            className='data-cell'
            style={{ textAlign: 'center' }}
          >
            {summaryTableContext.rows[index].label}
            <br />
            x
            <br />
            {variable.label}
          </div>
        </td>
      ))}
    </>
  );
};
