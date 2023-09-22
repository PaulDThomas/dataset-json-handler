import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";
import { Accordion } from "./Accordion";
import "./Accordion.css";
import { DraggableItem } from "./DraggableItem";

interface ItemListProps {
  id: string;
}

export const ItemList = ({ id }: ItemListProps) => {
  const { state } = useContext(DSJContext);

  return (
    <Accordion
      title="Items"
      id={id}
    >
      {state.datasetJson?.items.map((variable, index) => (
        <DraggableItem
          key={variable.OID ?? index}
          oid={variable.OID}
          id={`${id}-${variable.name}`}
        />
      ))}
    </Accordion>
  );
};

ItemList.displayName = "ItemList";
