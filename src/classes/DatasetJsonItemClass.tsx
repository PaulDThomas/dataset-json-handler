import { iSimpleTableRow } from '@asup/simple-table';
import { JSX } from 'react';

export enum eItemType {
  string = 'string',
  integer = 'integer',
  float = 'float',
  date = 'Date',
  time = 'Time',
  datetime = 'DateTime',
}

/**
 * Item (variable) inside a DatasetJson object
 */
export interface iDatasetJsonItem extends iSimpleTableRow {
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
  type: eItemType;
  /**
   * Item length (for strings)
   */
  length?: number;
}

export class DataSetJsonItemClass {
  private _OID = '';

  /**
   * Unique identifier
   */
  get OID() {
    return this._OID;
  }
  private _name = '';
  /**
   * Item name
   */
  get name() {
    return this._name;
  }
  private _label = '';
  /**
   * Item label
   */
  get label() {
    return this._label;
  }
  private _type: eItemType = eItemType.string;
  /**
   * Item type
   */
  get type(): eItemType {
    return this._type;
  }
  private _length: number | undefined = 8;
  /**
   * Assigned item length for strings
   */
  get length() {
    return this._length;
  }

  get data(): iDatasetJsonItem {
    return {
      OID: this._OID,
      name: this._name,
      label: this._label,
      type: this._type,
      length: this._length,
    };
  }

  get toString() {
    return JSON.stringify(this.data);
  }

  public constructor(newItem: iDatasetJsonItem) {
    this._OID = newItem.OID;
    this._name = newItem.name;
    this._label = newItem.label;
    this._length = newItem.length;
  }

  get component(): JSX.Element {
    return <span className='datasetjson-item'>{this._name}</span>;
  }
}
