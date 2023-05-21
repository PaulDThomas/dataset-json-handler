import { useContext } from 'react';
import { handleColumnVariableDrop } from '../../functions/handleColumnVariableDrop';
import { handleRowVariableDrop } from '../../functions/handleRowVariableDrop';
import { DropEdges } from '../drop-targets/DropEdges';
import './DropTableTopLeftCell.css';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface DropTableTopLeftCellProps {
  id: string;
}

export const DropTableTopLeftCell = ({ id }: DropTableTopLeftCellProps): JSX.Element => {
  const summaryTableContext = useContext(SummaryTableContext);
  return (
    <th style={{ position: 'relative' }}>
      <DropEdges
        id={`${id}-drop-edges`}
        onDropBottom={(ret) =>
          handleRowVariableDrop({ location: 'row', index: [0] }, ret, summaryTableContext)
        }
        onDropRight={(ret) =>
          handleColumnVariableDrop({ location: 'column', index: [0] }, ret, summaryTableContext)
        }
      >
        <div className='tl-cell-holder' />
      </DropEdges>
    </th>
  );
};
