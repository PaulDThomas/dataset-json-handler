import { useContext } from 'react';
import { DraggableItem } from './DraggableItem';
import './ItemList.css';
import { SummaryTableContext } from '../../context/SummaryTableContext';

interface ItemListProps {
  id: string;
}

export const ItemList = ({ id }: ItemListProps) => {
  const { state } = useContext(SummaryTableContext);

  return (
    <div
      className='item-list simpletable-main small-scrollbar'
      id={id}
    >
      <div className='simpletable-holder'>
        {state.itemList
          .filter(
            (v) =>
              !state.columns.map((c) => c.name).includes(v.name) &&
              !state.rows.map((r) => r.name).includes(v.name) &&
              state.target?.name !== v.name,
          )
          .map((variable, index) => (
            <DraggableItem
              key={variable.OID ?? index}
              oid={variable.OID}
              id={`${id}-${variable.name}`}
            />
          ))}
      </div>
    </div>
  );
};
