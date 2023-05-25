import { iSimpleTableRow } from '@asup/simple-table';

/**
 * Skeleton values
 */
export interface SkeletonValueProps {
  /**
   * String version of the value
   */
  value: string;
  /**
   * Value frequency
   */
  valueType: 'always' | 'when-present';
}

/**
 * DatasetJsonItem extended for summary table
 */
export interface SummaryVariable extends DatasetJsonItem {
  /**
   * Dummy data values
   */
  skeletonValues?: SkeletonValueProps[];
  /**
   * Decimal places in the table
   */
  decimalPlaces?: number;
  /**
   * Format for date times
   */
  dateFormat?: 'date' | 'time' | 'datetime';
}
