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
      setIsBeingDragged(true);
      e.dataTransfer.setData(
        group.type === "AnalysisGroup" ? "application/analysisgroup" : "application/datagroup",
        group.toString,
      );
    }
  };

  const handleDragEnd = () => {
    if (group) {
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
