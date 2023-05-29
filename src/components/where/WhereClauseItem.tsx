import { useContext } from 'react';
import { DataSetJsonItemClass } from '../../classes/DatasetJsonItemClass';
import { WhereClauseClass } from '../../classes/WhereClauseClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { UPDATE_WHERE_CLAUSE } from '../../functions/reducer';
import { DropTarget } from '../drop-targets/DropTarget';
import { DraggableItem } from '../lhs/DraggableItem';

interface WhereClauseItemProps {
  index: number;
}

export const WhereClauseItem = ({ index }: WhereClauseItemProps): JSX.Element => {
  const { state, dispatch } = useContext(SummaryTableContext);

  return (
    <div
      className='itemholder-main'
      style={{
        position: 'relative',
        width: '166px',
        height: '40px',
      }}
    >
      <DropTarget
        id={`whereclauseitem-${index}-droptarget`}
        type='center'
        dropAction={(ret) => {
          if (ret.data instanceof DataSetJsonItemClass) {
            dispatch({
              type: UPDATE_WHERE_CLAUSE,
              whereClause: new WhereClauseClass({
                WID: state.whereClauses[index]?.WID,
                item: ret.data,
                whereOperation: state.whereClauses[index]?.whereOperation ?? null,
                filteredItemValues: state.whereClauses[index]?.filteredItemValues,
              }),
            });
          }
        }}
      >
        {state.whereClauses[index] ? (
          <DraggableItem
            id={`whereclauseitem-${index}`}
            item={state.whereClauses[index].item}
          />
        ) : (
          <div
            id={`whereclauseitem-${index}`}
            className='item-holder'
          />
        )}
      </DropTarget>
    </div>
  );
};
