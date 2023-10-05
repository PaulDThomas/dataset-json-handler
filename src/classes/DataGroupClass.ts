import { DatasetJsonItem, DatasetJsonItemClass } from "./DatasetJsonItemClass";
import { WhereClauseClass } from "./WhereClauseClass";

export interface DataGroup {
  /** Unique id */
  id: string;
  /** Group label */
  label?: string;
  /** Group type */
  type?: "DataGroup";
  /** DatasetJsonItemClass used for displaying values */
  valueItem?: DatasetJsonItem | null;
  /** Id of where clause used to creat the data group */
  whereClause?: string | null;
}

/** Data group class, used in the summary table contents */
export class DataGroupClass extends WhereClauseClass {
  /** Group type */
  get type(): "DataGroup" {
    return "DataGroup";
  }

  protected _valueItem: DatasetJsonItemClass | null = null;
  /** DatasetJsonItem used to get data items in this group */
  get valueItem() {
    return this._valueItem;
  }
  set valueItem(newItem) {
    this._valueItem = newItem;
  }

  protected _whereClause: string | null = null;
  /** Unique id for a connected where clause */
  get whereClause() {
    return this._whereClause;
  }
  set whereClause(newWhereClauseId) {
    this._whereClause = newWhereClauseId;
  }

  /**
   * Data stored in the class
   */
  get data(): DataGroup {
    return {
      id: this._id,
      label: this._label,
      type: this.type,
      valueItem: this._valueItem?.data,
      whereClause: this._whereClause,
    };
  }

  /**
   * Stringified version of the class
   */
  get toString() {
    return JSON.stringify(this.data);
  }

  /**
   * Data group
   * @param newDataGroup Data group parameters
   */
  public constructor(newDataGroup?: DataGroup) {
    super(newDataGroup);
    this._label = newDataGroup?.label ?? "New data group";
    this._valueItem = newDataGroup?.valueItem
      ? new DatasetJsonItemClass(newDataGroup?.valueItem)
      : null;
    this._whereClause = newDataGroup?.whereClause ?? null;
  }
}
