import { DatasetJsonItemClass } from "../../main";
import { DropTarget } from "../drop-targets/DropTarget";
import { DraggableItem } from "../lhs/DraggableItem";

interface InGroupItemProps {
  id: string;
  groupId: string;
  item: DatasetJsonItemClass | null;
  dropAction: (ret: DatasetJsonItemClass) => void;
  removeAction: () => void;
}

export const InGroupItem = ({ id, groupId, item, dropAction, removeAction }: InGroupItemProps) => {
  return (
    <div
      className="itemholder-main"
      style={{
        position: "relative",
        width: "166px",
        height: "40px",
      }}
    >
      <DropTarget
        id={`groupitem-${id}-droptarget`}
        type="center"
        dropAction={(ret) =>
          ret.data instanceof DatasetJsonItemClass && dropAction(ret.data as DatasetJsonItemClass)
        }
        allowableTypes={["datasetjsonitem"]}
      >
        {item ? (
          <DraggableItem
            id={`groupitem-${groupId}-${id}`}
            oid={item.OID}
            otherActions={[{ label: "Remove", action: removeAction }]}
          />
        ) : (
          <div
            id={`groupitem-${groupId}-${id}`}
            className="item-holder"
          />
        )}
      </DropTarget>
    </div>
  );
};
