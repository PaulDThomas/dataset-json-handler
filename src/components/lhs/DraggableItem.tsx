import { ContextMenuHandler, ContextWindow, iMenuItem } from "@asup/context-menu";
import React, { useContext, useMemo, useState } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import "./DraggableItem.css";
import { ItemProperties } from "../utility/ItemProperties";

interface DraggableItemProps {
  id: string;
  oid: string;
  otherActions?: iMenuItem[];
}

export const DraggableItem = ({ id, oid, otherActions }: DraggableItemProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
  const [showProperties, setShowProperties] = useState<boolean>(false);

  const item = useMemo(() => state.itemList.find((i) => i.OID === oid), [oid, state]);

  const handleDragStart = (e: React.DragEvent) => {
    if (item) {
      console.log("Drag start for " + item.name);
      setIsBeingDragged(true);
      e.dataTransfer.setData("application/datasetjsonitem", item.toString);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (item) {
      console.log(e);
      console.log("Drag end for " + item.name);
      setIsBeingDragged(false);
    }
  };

  return (
    <>
      <ContextMenuHandler
        menuItems={
          item
            ? [
                ...(otherActions ?? []),
                { label: "Properties", action: () => setShowProperties(true) },
              ]
            : []
        }
      >
        <div
          id={id}
          className={`item-holder ${isBeingDragged ? "being-dragged" : ""}`}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {item?.name ?? <em>Drop item here</em>}
        </div>
      </ContextMenuHandler>
      {item && (
        <ContextWindow
          id={"item-properties-window"}
          visible={showProperties}
          title={`${item?.label} properties`}
          onClose={() => setShowProperties(false)}
        >
          <ItemProperties oid={oid} />
        </ContextWindow>
      )}
    </>
  );
};

DraggableItem.displayName = "DraggableItem";
