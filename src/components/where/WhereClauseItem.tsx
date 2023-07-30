import { useContext } from 'react';
import { DatasetJsonItemClass } from '../../classes/DatasetJsonItemClass';
import { WhereClauseClass } from '../../classes/WhereClauseClass';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { UPDATE_WHERE_CLAUSE } from '../../context/stReducer';
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
          if (ret.data instanceof DatasetJsonItemClass) {
            dispatch({
              operation: UPDATE_WHERE_CLAUSE,
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
        {state.whereClauses[index].item ? (
          <DraggableItem
            id={`whereclauseitem-${index}`}
            oid={(state.whereClauses[index].item as DatasetJsonItemClass).OID}
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
