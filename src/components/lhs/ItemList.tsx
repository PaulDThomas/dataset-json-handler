import { useContext } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import { Accordion } from "./Accordion";
import "./Accordion.css";
import { DraggableItem } from "./DraggableItem";

interface ItemListProps {
  id: string;
}

export const ItemList = ({ id }: ItemListProps) => {
  const { state } = useContext(SummaryTableContext);

  return (
    <Accordion
      title="Items"
      id={id}
    >
      {state.itemList.map((variable, index) => (
        <DraggableItem
          key={variable.itemOid ?? index}
          oid={variable.itemOid}
          id={`${id}-${variable.name}`}
        />
      ))}
    </Accordion>
  );
};

ItemList.displayName = "ItemList";
