import { DatasetJsonItemClass } from './DatasetJsonItemClass';
import { WhereClauseClass } from './WhereClauseClass';

export interface DataGroup {
  /** Unique id */
  id?: string;
  /** Group label */
  label?: string;
  /** DatasetJsonItemClass used for displaying values */
  valueItem?: DatasetJsonItemClass;
  /** Id of where clause used to creat the data group */
  whereClause?: string;
}

export class DataGroupClass extends WhereClauseClass {
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

  public constructor(newDataGroup?: DataGroup) {
    super(newDataGroup);
    this._label = newDataGroup?.label ?? 'New data group';
    this._valueItem = newDataGroup?.valueItem ?? null;
    this._whereClause = newDataGroup?.whereClause ?? null;
  }
}
