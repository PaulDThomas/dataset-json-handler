import { DragEvent, useState } from 'react';
import { DndData } from '../../interfaces/summaryInterfaces';
import './DropTarget.css';

interface DropTargetProps {
  id: string;
  dropAction?: (ret: DndData) => void;
  children?: null | string | JSX.Element | (string | JSX.Element)[];
  style?: React.CSSProperties;
  type?: 'top' | 'left' | 'bottom' | 'right';
}

export const DropTarget = ({
  id,
  dropAction,
  children,
  style,
  type,
}: DropTargetProps): JSX.Element => {
  const [isOver, setIsOver] = useState<boolean>(false);

  const handleDrop = (e: DragEvent) => {
    console.log('Dropped: ' + e.dataTransfer);
    setIsOver(false);
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer.types[0] === 'application/json') {
      try {
        const data = JSON.parse(e.dataTransfer.getData('application/json'));
        console.log('Data dropped');
        console.log(data);
        dropAction && dropAction(data);
      } catch (error) {
        console.warn(`Something has gone wrong :( dropping on ${id}`);
        console.warn(error);
      }
    }
  };

  return (
    <div
      id={id}
      className={`drop-target ${isOver ? 'can-drop' : ''} ${type}`}
      onDragOver={(e) => {
        if (e.dataTransfer.types[0] === 'application/json') {
          setIsOver(true);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onDrop={handleDrop}
      onDragLeave={() => setIsOver(false)}
      style={{
        ...style,
      }}
    >
      {!children ? <>&#8203;</> : children}
    </div>
  );
};
