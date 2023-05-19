import { iSimpleTableRow } from '@asup/simple-table';

/**
 * Item (variable) inside a DatasetJson object
 */
export interface DatasetJsonItem extends iSimpleTableRow {
  /**
   * Item unique identifier
   */
  OID: string;
  /**
   * Item name
   */
  name: string;
  /**
   * Item label
   */
  label: string;
  /**
   * Item type
   */
  type: 'string' | 'integer' | 'float' | 'Date';
  /**
   * Item length (for strings)
   */
  length?: number;
}
