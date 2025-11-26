/**
 * Interface for data set row
 */
export interface DataRow extends Record<string, string | number | boolean | undefined> {
  /**
   * Number of the row in the data set
   */
  __rowNumber: number;
  /**
   * True if the row has been deleted
   */
  __isDeleted: boolean;
}
