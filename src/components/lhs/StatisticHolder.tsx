import { eStatistic } from "enums/eStatistic";
import React, { useState } from "react";
import "./StatisticHolder.css";

interface StatisticHolderProps {
  id: string;
  statistic: eStatistic;
}

export const StatisticHolder = ({ id, statistic }: StatisticHolderProps): JSX.Element => {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent) => {
    setIsBeingDragged(true);
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ type: "statistic", data: statistic }),
    );
  };

  const handleDragEnd = () => {
    setIsBeingDragged(false);
  };

  return (
    <div
      id={id}
      className={`statistic-holder ${isBeingDragged ? "being-dragged" : ""}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {statistic}
    </div>
  );
};
