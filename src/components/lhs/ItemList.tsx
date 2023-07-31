import { useContext, useState } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import './Accordion.css';
import { DraggableItem } from './DraggableItem';

interface ItemListProps {
  id: string;
}

export const ItemList = ({ id }: ItemListProps) => {
  const { state } = useContext(SummaryTableContext);
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <div
      className='item-list'
      id={id}
    >
      <div
        className='accordion-title'
        onClick={() => setExpanded(!expanded)}
      >
        <div className={`accordion-pre ${expanded ? 'expanded' : 'closed'}`}>{'\u2BC5'}</div>
        <span id={`accordion-title-${id}`}>Items</span>
      </div>
      <div className={`accordion-holder ${expanded ? 'expanded' : 'closed'}`}>
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

ItemList.displayName = 'ItemList';
