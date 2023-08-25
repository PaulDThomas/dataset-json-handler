import { DragEvent, useContext, useState } from 'react';
import { DndData } from 'interfaces/DndData';
import './DropTarget.css';
import { SummaryTableContext } from '../../context/SummaryTableContext';
import { iDatasetJsonItem } from '../../classes/DatasetJsonItemClass';

interface DropTargetProps {
  id: string;
  dropAction?: (ret: DndData) => void;
  children?: null | string | JSX.Element | (string | JSX.Element)[];
  style?: React.CSSProperties;
  type?: 'top' | 'left' | 'bottom' | 'right' | 'center';
}

export const DropTarget = ({
  id,
  dropAction,
  children,
  style,
  type,
}: DropTargetProps): JSX.Element => {
  const [isOver, setIsOver] = useState<boolean>(false);
  const { state } = useContext(SummaryTableContext);

  const handleDrop = (e: DragEvent) => {
    setIsOver(false);
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer.types[0] === 'application/datasetjsonitem') {
      try {
        const data: iDatasetJsonItem = JSON.parse(
          e.dataTransfer.getData('application/datasetjsonitem'),
        );
        console.log('Data dropped');
        console.log(data);
        const ix = state.itemList.findIndex((v) => v.OID === data.OID);
        if (ix > -1) {
          const item = state.itemList[ix];
          dropAction && dropAction({ type: 'variable', data: item });
        }
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
        if (e.dataTransfer.types[0] === 'application/datasetjsonitem') {
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
      {children ?? <>&#8203;</>}
    </div>
  );
};
