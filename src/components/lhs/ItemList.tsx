import { useContext } from 'react';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { Accordion } from './Accordion';
import './Accordion.css';
import { DraggableItem } from './DraggableItem';

interface ItemListProps {
  id: string;
}

export const ItemList = ({ id }: ItemListProps) => {
  const { state } = useContext(SummaryTableContext);

  return (
    <Accordion
      title='Items'
      id={id}
    >
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
    </Accordion>
  );
};

ItemList.displayName = 'ItemList';
