import { DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";

/**
 *  Summary group
 */

export interface SummaryGroup {
  /**
   * Variable will not be shown in report, used to order output if present
   */
  groupVariable: DatasetJsonItemClass;
  /**
   * Variable will be shown in report, and used for ordering if no order variable is present
   */
  groupVariableLabel?: DatasetJsonItemClass;
  /**
   * Groups defined by spanning more than one value, e.g. '1, 2, 3' or 'All'
   */
  pooledGroups: {
    /**
     * Array of values to be grouped, 'All' for every value including missing, 'AllExMissing' or every value exclusing missing
     */
    groupVariableValues: (string | number | Date)[] | "All" | "AllExMissing";
    /**
     * Pooled group order
     */
    groupOrder: string | number | Date;
    /**
     * Pooled group label
     */
    groupLabel: string;
  }[];
}
