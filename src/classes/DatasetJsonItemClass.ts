/**
 * Item type
 */
export enum eItemType {
  string = "string",
  integer = "integer",
  float = "float",
  date = "Date",
  time = "Time",
  datetime = "DateTime",
}

/**
 * Item (variable) inside a DatasetJson object
 */
export interface DatasetJsonItem {
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

/** Data set JSON item class, individual item (variable) in the data set */
export class DatasetJsonItemClass {
  protected _OID = "";

  /**
   * Unique identifier
   */
  get OID() {
    return this._OID;
  }
  protected _name = "";
  /**
   * Item name
   */
  get name() {
    return this._name;
  }
  protected _label = "";
  /**
   * Item label
   */
  get label() {
    return this._label;
  }
  protected _type: eItemType = eItemType.string;
  /**
   * Item type
   */
  get type(): eItemType {
    return this._type;
  }
  protected _length: number | undefined = 8;
  /**
   * Assigned item length for strings
   */
  get length() {
    return this._length;
  }

  /**
   * Data stored in the class
   */
  get data(): DatasetJsonItem {
    return {
      OID: this._OID,
      name: this._name,
      label: this._label,
      type: this._type,
      length: this._length,
    };
  }

  /**
   * Stringified version of the class
   */
  get toString() {
    return JSON.stringify(this.data);
  }

  /**
   * Create new data item class
   * @param newItem New data item information
   */
  public constructor(newItem: DatasetJsonItem) {
    this._OID = newItem.OID;
    this._name = newItem.name;
    this._label = newItem.label;
    this._length = newItem.length;
  }
}
