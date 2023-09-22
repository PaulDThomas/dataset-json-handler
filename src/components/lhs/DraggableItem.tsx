import { ContextMenuHandler, ContextWindow, iMenuItem } from "@asup/context-menu";
import React, { useContext, useMemo, useState } from "react";
import { DSJContext } from "../../context/DSJContextProvider";
import { ItemProperties } from "../utility/ItemProperties";
import "./DraggableItem.css";

interface DraggableItemProps {
  id: string;
  oid: string;
  otherActions?: iMenuItem[];
}

export const DraggableItem = ({ id, oid, otherActions }: DraggableItemProps): JSX.Element => {
  const { state } = useContext(DSJContext);
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
  const [showProperties, setShowProperties] = useState<boolean>(false);

  const item = useMemo(() => state.datasetJson?.items.find((i) => i.OID === oid), [oid, state]);

  const handleDragStart = (e: React.DragEvent) => {
    if (item) {
      setIsBeingDragged(true);
      e.dataTransfer.setData("application/datasetjsonitem", item.toString);
    }
  };

  const handleDragEnd = () => {
    if (item) {
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
