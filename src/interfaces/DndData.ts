import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { eStatistic } from "../enums/eStatistic";
import { AnalysisGroupClass, DataGroupClass } from "../main";

export type dndItem = "datasetjsonitem" | "analysisgroup" | "datagroup" | "statistic";

/**
 * Drag data contents
 */
export interface DndData {
  /**
   * Variable or statistic
   */
  type: dndItem;
  /**
   * Dragged item definition
   */
  data: AnalysisGroupClass | DataGroupClass | DatasetJsonItemClass | eStatistic | null;
}
