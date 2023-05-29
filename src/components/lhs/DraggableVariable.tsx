import React, { useState } from 'react';
import './DraggableVariable.css';
import { DataSetJsonItemClass } from '../../classes/DatasetJsonItemClass';
import { ContextMenuHandler, ContextWindow } from '@asup/context-menu';
import { ItemProperties } from '../utility/ItemProperties';

interface DraggableVariableProps {
  id: string;
  item: DataSetJsonItemClass | null;
}

export const DraggableVariable = ({ id, item }: DraggableVariableProps): JSX.Element => {
  const [isBeingDragged, setIsBeingDragged] = useState<boolean>(false);
  const [showProperties, setShowProperties] = useState<boolean>(false);

  const handleDragStart = (e: React.DragEvent) => {
    if (item) {
      console.log('Drag start for ' + item.name);
      setIsBeingDragged(true);
      e.dataTransfer.setData('application/datasetjsonitem', item.toString);
    }
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (item) {
      console.log(e);
      console.log('Drag end for ' + item.name);
      setIsBeingDragged(false);
    }
  };

  return (
    <>
      <ContextMenuHandler
        menuItems={item ? [{ label: 'Properties', action: () => setShowProperties(true) }] : []}
      >
        <div
          id={id}
          className={`variable-holder ${isBeingDragged ? 'being-dragged' : ''}`}
          draggable
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {item?.name}
        </div>
      </ContextMenuHandler>
      {item && (
        <ContextWindow
          id={'item-properties-window'}
          visible={showProperties}
          title={`${item?.label} properties`}
          onClose={() => setShowProperties(false)}
        >
          <ItemProperties item={item} />
        </ContextWindow>
      )}
    </>
  );
};
