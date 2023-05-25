import { SummaryVariable } from './DatasetJsonItem';
import { eStatistic } from '../enums/eStatistic';

/**
 * Table position
 */
export interface Position {
  /**
   * Row or column
   */
  location: 'row' | 'column';
  /**
   * Zero based index for position
   */
  index: number[];
}

/**
 * Drag data contents
 */
export interface DndData {
  /**
   * Variable or statistic
   */
  type: 'variable' | 'statistic';
  /**
   * Dragged item definition
   */
  data: SummaryVariable | eStatistic;
}

/**
 *  Summary group
 */
export interface SummaryGroup {
  /**
   * Variable will not be shown in report, used to order output if present
   */
  groupVariable: SummaryVariable;
  /**
   * Variable will be shown in report, and used for ordering if no order variable is present
   */
  groupVariableLabel?: SummaryVariable;
  /**
   * Groups defined by spanning more than one value, e.g. '1, 2, 3' or 'All'
   */
  pooledGroups: {
    /**
     * Array of values to be grouped, 'All' for every value including missing, 'AllExMissing' or every value exclusing missing
     */
    groupVariableValues: (string | number | Date)[] | 'All' | 'AllExMissing';
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
