import { DndData, dndItem } from "interfaces/DndData";
import "./DropEdges.css";
import { DropTarget } from "./DropTarget";

interface DropEdgesProps {
  id: string;
  onDropTop?: (ret: DndData) => void;
  onDropLeft?: (ret: DndData) => void;
  onDropBottom?: (ret: DndData) => void;
  onDropRight?: (ret: DndData) => void;
  allowableTypes?: {
    top?: dndItem[];
    left?: dndItem[];
    bottom?: dndItem[];
    right?: dndItem[];
  };

  children?: JSX.Element;
}

export const DropEdges = ({
  id,
  onDropTop,
  onDropLeft,
  onDropBottom,
  onDropRight,
  children,
  allowableTypes,
}: DropEdgesProps): JSX.Element => {
  return (
    <>
      {onDropTop && (
        <DropTarget
          id={`${id}-drop-top`}
          type="top"
          dropAction={onDropTop}
          allowableTypes={allowableTypes?.top}
        />
      )}
      {onDropLeft && (
        <DropTarget
          id={`${id}-drop-left`}
          type="left"
          dropAction={onDropLeft}
          allowableTypes={allowableTypes?.left}
        />
      )}{" "}
      {onDropBottom && (
        <DropTarget
          id={`${id}-drop-bottom`}
          type="bottom"
          dropAction={onDropBottom}
          allowableTypes={allowableTypes?.bottom}
        />
      )}
      {onDropRight && (
        <DropTarget
          id={`${id}-drop-right`}
          type="right"
          dropAction={onDropRight}
          allowableTypes={allowableTypes?.right}
        />
      )}
      {children}
    </>
  );
};

DropEdges.displayName = "DropEdges";
