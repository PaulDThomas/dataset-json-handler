import { eOperation } from '../enums/eOperation';
import { DatasetJsonItemClass, eItemType } from './DatasetJsonItemClass';

/**
 * Where clause definition
 */
export interface iWhereClause {
  /** Unique identifier */
  WID?: string;
  /** Item being checked */
  item: DatasetJsonItemClass | null;
  /** Operation to apply */
  whereOperation: eOperation | null;
  /** Value(s) in the where clause */
  filteredItemValues?: (string | number | Date)[];
}

/**
 * Typescript class for a SummaryTable where clause
 */
export class WhereClauseClass {
  private _WID = '';
  /**
   * Unique Id attribute
   */
  get WID() {
    return this._WID;
  }

  private _previousVersions: {
    timestamp: Date;
    _itemName: DatasetJsonItemClass;
    _whereOperation: eOperation;
    _filteredItemValues: (string | number | Date)[] | undefined;
  }[] = [];
  get previousVersions() {
    return this._previousVersions;
  }

  private _item: DatasetJsonItemClass | null = null;
  /**
   * Item to check
   */
  get item() {
    return this._item;
  }
  /**
   * Item to check
   */
  set item(newItem: DatasetJsonItemClass | null) {
    this._item = newItem;
  }

  private _whereOperation: eOperation | null = null;
  /**
   *  Operation
   */
  get whereOperation() {
    return this._whereOperation;
  }
  /**
   * Operation
   */
  set whereOperation(newOperation: eOperation | null) {
    this._whereOperation = newOperation;
  }

  private _filteredItemValues: (string | number | Date)[] | undefined = [];
  /**
   * Values for condition
   */
  get filteredItemValues() {
    return this._filteredItemValues;
  }
  /**
   * Values for condition
   */
  set filteredItemValues(newValues: (string | number | Date)[] | undefined) {
    if (newValues === undefined) this._filteredItemValues === newValues;
    else if (!this._item) throw new Error('WhereClause: Can not set values where there is no item');
    else if (this._item.type === eItemType.string && newValues.some((v) => typeof v !== 'string'))
      throw new Error('WhereClause: Can only set string values for a string item');
    else if (
      [eItemType.integer, eItemType.float].includes(this._item.type) &&
      newValues.some((v) => typeof v !== 'number')
    )
      throw new Error('WhereClause: Can only set number values for a integer or float items');
    else if (
      [eItemType.date, eItemType.datetime, eItemType.time].includes(this._item.type) &&
      newValues.some((v) => !(v instanceof Date))
    )
      throw new Error('WhereClause: Can only set date values for a date, datetime or time items');
    else this._filteredItemValues = newValues;
  }

  /**
   * Check if current where clause is valid
   */
  get isValid() {
    return (
      this._WID &&
      this._item &&
      this._whereOperation &&
      (([eOperation.miss, eOperation.not_miss].includes(this._whereOperation) &&
        this.filteredItemValues?.length === 0) ||
        ([eOperation.eq, eOperation.ge, eOperation.gt, eOperation.le, eOperation.lt].includes(
          this._whereOperation,
        ) &&
          this._filteredItemValues?.length === 1) ||
        ([eOperation.in, eOperation.not_in] && (this._filteredItemValues?.length ?? -1) > 0))
    );
  }

  /**
   * Create where clause
   * @param newWhereClause
   * Parameters:
   * {
   *  @WID unique id
   *  @item DatasetJsonItem
   *  @whereOperation Operation
   *  @filteredItemValues Values
   * }
   */
  public constructor(newWhereClause?: iWhereClause) {
    this._WID = newWhereClause?.WID ?? crypto.randomUUID();
    this._item = newWhereClause?.item ?? null;
    this._whereOperation = newWhereClause?.whereOperation ?? null;
    this._filteredItemValues = newWhereClause?.filteredItemValues ?? [];
  }

  /**
   * Update existing where clause, and save previous version if valid
   * @param itemName new name
   * @param whereOperation: new operation
   * @param filteredItemValues: new item values
   */
  public update(
    itemName: DatasetJsonItemClass,
    whereOperation: eOperation,
    filteredItemValues: (string | number | Date)[],
  ) {
    if (this._item && this._whereOperation && this.isValid) {
      const currentVersion = {
        timestamp: new Date(),
        _itemName: this._item,
        _whereOperation: this._whereOperation,
        _filteredItemValues: this._filteredItemValues,
      };
      this._previousVersions.push(currentVersion);
    }
    this._item = itemName;
    this._whereOperation = whereOperation;
    this._filteredItemValues = filteredItemValues;
  }
}
