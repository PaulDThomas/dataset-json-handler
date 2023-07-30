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
