import React, { useState } from 'react';
import './VariableHolder.css';
import { DataSetJsonItemClass } from '../../classes/DatasetJsonItemClass';

interface VariableHolderProps {
  id: string;
  variable: DataSetJsonItemClass;
}

export const VariableHolder = ({ id, variable }: VariableHolderProps): JSX.Element => {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent) => {
    console.log('Drag start for ' + variable.name);
    setIsBeingDragged(true);
    e.dataTransfer.setData(
      'application/datasetjsonitem',
      JSON.stringify({ type: 'variable', data: variable.data }),
    );
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
