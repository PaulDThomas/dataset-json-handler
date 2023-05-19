import React, { useState } from 'react';
import './StatisticHolder.css';
import { eStatistic } from '../../interfaces/summaryInterfaces';

interface StatisticHolderProps {
  id: string;
  statistic: eStatistic;
}

export const StatisticHolder = ({ id, statistic }: StatisticHolderProps): JSX.Element => {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Drag start for ' + statistic);
    setIsBeingDragged(true);
    e.dataTransfer.setData(
      'application/json',
      JSON.stringify({ type: 'statistic', data: statistic }),
    );
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log(e);
    console.log('Drag end for ' + statistic);
    setIsBeingDragged(false);
  };

  return (
    <div
      id={id}
      className={`statistic-holder ${isBeingDragged ? 'being-dragged' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {statistic}
    </div>
  );
};
