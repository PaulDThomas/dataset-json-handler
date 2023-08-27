import React, { useContext, useMemo, useState } from "react";
import { SummaryTableContext } from "../../context/SummaryTableContext";
import "./DraggableGroupId.css";

interface DraggableGroupIdProps {
  id: string;
}

export const DraggableGroupId = ({ id }: DraggableGroupIdProps): JSX.Element => {
  const { state } = useContext(SummaryTableContext);
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);

  const group = useMemo(() => state.groupList.find((g) => g.id === id), [id, state.groupList]);

  const handleDragStart = (e: React.DragEvent) => {
    if (group) {
      console.log("Drag start for " + group.label);
      setIsBeingDragged(true);
      e.dataTransfer.setData("application/datasetjsonitem", group.toString);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (group) {
      console.log(e);
      console.log("Drag end for " + group.label);
      setIsBeingDragged(false);
    }
  };

  return !group ? (
    <></>
  ) : (
    <div
      id={id}
      className={`group-id-holder ${isBeingDragged ? "being-dragged" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span className="id-holder">{group.id}</span>
    </div>
  );
};

DraggableGroupId.displayName = "DraggableGroupId";
