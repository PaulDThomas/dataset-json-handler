import React, { useState } from 'react';
import './DraggableVariable.css';
import { DataSetJsonItemClass } from '../../classes/DatasetJsonItemClass';

interface DraggableVariableProps {
  id: string;
  variable: DataSetJsonItemClass;
}

export const DraggableVariable = ({ id, variable }: DraggableVariableProps): JSX.Element => {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Drag start for ' + variable.name);
    setIsBeingDragged(true);
    e.dataTransfer.setData('application/datasetjsonitem', variable.toString);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log(e);
    console.log('Drag end for ' + variable.name);
    setIsBeingDragged(false);
  };

  return (
    <div
      id={id}
      className={`variable-holder ${isBeingDragged ? 'being-dragged' : ''}`}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {variable.name}
    </div>
  );
};
