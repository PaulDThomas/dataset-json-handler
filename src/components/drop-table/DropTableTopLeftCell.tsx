import { useContext } from 'react';
import { DatasetJsonItemClass } from '../../classes/DatasetJsonItemClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { MOVE_COLUMN_VARIABLE, MOVE_ROW_VARIABLE } from '../../functions/reducer';
import { DropEdges } from '../drop-targets/DropEdges';
import './DropTableTopLeftCell.css';

interface DropTableTopLeftCellProps {
  id: string;
}

export const DropTableTopLeftCell = ({ id }: DropTableTopLeftCellProps): JSX.Element => {
  const { dispatch } = useContext(SummaryTableContext);
  return (
    <th style={{ position: 'relative' }}>
      <DropEdges
        id={`${id}-drop-edges`}
        onDropBottom={(ret) => {
          if (ret.data instanceof DatasetJsonItemClass) {
            dispatch({ type: MOVE_ROW_VARIABLE, position: 0, item: ret.data });
          }
        }}
        onDropRight={(ret) => {
          if (ret.data instanceof DatasetJsonItemClass)
            dispatch({ type: MOVE_COLUMN_VARIABLE, position: 0, item: ret.data });
        }}
      >
        <div className='tl-cell-holder' />
      </DropEdges>
    </th>
  );
};
