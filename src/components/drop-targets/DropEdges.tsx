import { DndData } from "interfaces/DndData";
import "./DropEdges.css";
import { DropTarget } from "./DropTarget";

interface DropEdgesProps {
  id: string;
  onDropTop?: (ret: DndData) => void;
  onDropLeft?: (ret: DndData) => void;
  onDropBottom?: (ret: DndData) => void;
  onDropRight?: (ret: DndData) => void;
  children?: JSX.Element;
}

export const DropEdges = ({
  id,
  onDropTop,
  onDropLeft,
  onDropBottom,
  onDropRight,
  children,
}: DropEdgesProps): JSX.Element => {
  return (
    <>
      {onDropTop && (
        <DropTarget
          id={`${id}-drop-top`}
          type="top"
          dropAction={onDropTop}
        />
      )}
      {onDropLeft && (
        <DropTarget
          id={`${id}-drop-left`}
          type="left"
          dropAction={onDropLeft}
        />
      )}{" "}
      {onDropBottom && (
        <DropTarget
          id={`${id}-drop-bottom`}
          type="bottom"
          dropAction={onDropBottom}
        />
      )}
      {onDropRight && (
        <DropTarget
          id={`${id}-drop-right`}
          type="right"
          dropAction={onDropRight}
        />
      )}
      {children}
    </>
  );
};
