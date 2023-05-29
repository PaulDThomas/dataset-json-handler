import { useContext } from 'react';
import './DropTableBodyRow.css';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface DropTableBodyRowProps {
  rowIndex: number;
}

export const DropTableBodyRow = ({ rowIndex: index }: DropTableBodyRowProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);

  return (
    <>
      {state.columns.map((item, ci) => (
        <td key={item.OID ?? ci}>
          <div
            className='data-cell'
            style={{ textAlign: 'center' }}
          >
            {state.rows[index].label}
            <br />
            x
            <br />
            {item.label}
          </div>
        </td>
      ))}
    </>
  );
};
