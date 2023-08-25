import { DatasetJsonItemClass } from '../../main';
import { DropTarget } from '../drop-targets/DropTarget';
import { DraggableItem } from '../lhs/DraggableItem';

interface InGroupItemProps {
  id: string;
  groupId: string;
  item: DatasetJsonItemClass | null;
  dropAction: (ret: DatasetJsonItemClass) => void;
}

export const InGroupItem = ({ id, groupId, item, dropAction }: InGroupItemProps) => {
  return (
    <div
      className='itemholder-main'
      style={{
        position: 'relative',
        width: '166px',
        height: '40px',
      }}
    >
      <DropTarget
        id={`groupitem-${id}-droptarget`}
        type='center'
        dropAction={(ret) =>
          ret.data instanceof DatasetJsonItemClass && dropAction(ret.data as DatasetJsonItemClass)
        }
      >
        {item ? (
          <DraggableItem
            id={`groupitem-${groupId}-${id}`}
            oid={item.OID}
          />
        ) : (
          <div
            id={`groupitem-${groupId}-${id}`}
            className='item-holder'
          />
        )}
      </DropTarget>
    </div>
  );
};
