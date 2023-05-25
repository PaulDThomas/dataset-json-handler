import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import './DropTable.css';
import { DropTableColumnVariable } from './DropTableColumnVariable';
import { DropTableRowVariable } from './DropTableRowVariable';
import { DropTableTopLeftCell } from './DropTableTopLeftCell';

interface DropTableProps {
  id: string;
}

export const DropTable = ({ id }: DropTableProps): JSX.Element => {
  const summaryTableContext = useContext(SummaryTableContext);

  return (
    <div className='drop-table-holder'>
      <table
        id={id}
        className='drop-table'
      >
        <thead>
          <tr>
            <DropTableTopLeftCell id={`${id}-tl-cell`} />
            {summaryTableContext.columns.map((v, i) => (
              <DropTableColumnVariable
                key={v.OID ?? i}
                id={`${id}-header-variable-${i}`}
                index={i}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {summaryTableContext.rows.map((v, i) => (
            <DropTableRowVariable
              key={v.OID ?? i}
              id={`${id}-row-variable-${i}`}
              index={i}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
