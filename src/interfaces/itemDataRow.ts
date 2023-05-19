import { iSimpleTableRow } from '@asup/simple-table';

/**
 * Interface for data set row
 */

export interface itemDataRow extends iSimpleTableRow {
  /**
   * Number of the row in the data set
   */
  __rowNumber: number;
  /**
   * True if the row has been deleted
   */
  __isDeleted: boolean;
}
