import { DndData, dndItem } from "interfaces/DndData";
import { DragEvent, useState } from "react";
import { DatasetJsonItemClass } from "../../classes/DatasetJsonItemClass";
import { eStatistic } from "../../enums/eStatistic";
import { AnalysisGroupClass, DataGroupClass } from "../../main";
import "./DropTarget.css";

interface DropTargetProps {
  id: string;
  dropAction?: (ret: DndData) => void;
  children?: null | string | JSX.Element | (string | JSX.Element)[];
  style?: React.CSSProperties;
  type?: "top" | "left" | "bottom" | "right" | "center";
  allowableTypes?: dndItem[];
}

export const DropTarget = ({
  id,
  dropAction,
  children,
  style,
  type,
  allowableTypes = ["datasetjsonitem"],
}: DropTargetProps): JSX.Element => {
  const [isOver, setIsOver] = useState<boolean>(false);

  const handleDrop = (e: DragEvent) => {
    setIsOver(false);
    e.stopPropagation();
    e.preventDefault();
    try {
      let data: AnalysisGroupClass | DataGroupClass | DatasetJsonItemClass | eStatistic | null =
        null;
      switch (e.dataTransfer.types[0]) {
        case "application/datasetjsonitem":
          data = new DatasetJsonItemClass(
            JSON.parse(e.dataTransfer.getData("application/datasetjsonitem")),
          );
          break;
        case "application/analysisgroup":
          data = new AnalysisGroupClass(
            JSON.parse(e.dataTransfer.getData("application/analysisgroup")),
          );
          break;
        case "application/datagroup":
          data = new AnalysisGroupClass(
            JSON.parse(e.dataTransfer.getData("application/datagroup")),
          );
          break;
        default:
      }
      dropAction && dropAction({ type: "datasetjsonitem", data });
    } catch (error) {
      console.warn(`Something has gone wrong :( dropping on ${id}`);
      console.warn(error);
    }
  };

  return (
    <div
      id={id}
      className={`drop-target ${isOver ? "can-drop" : ""} ${type}`}
      onDragOver={(e) => {
        if ([...allowableTypes.map((t) => `application/${t}`)].includes(e.dataTransfer.types[0])) {
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

DropTarget.displayName = "DropTarget";
