import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { eStatistic } from "../enums/eStatistic";

/**
 * Drag data contents
 */

export interface DndData {
  /**
   * Variable or statistic
   */
  type: "variable" | "statistic";
  /**
   * Dragged item definition
   */
  data: DatasetJsonItemClass | eStatistic;
}
