import { DatasetJsonItemClass, eItemType } from './DatasetJsonItemClass';

/**
 * Available operations
 */
export type Operation = 'eq' | 'lt' | 'le' | 'gt' | 'ge' | 'miss' | 'not_miss' | 'in' | 'not_in';
/**
 * Available operations list & descriptions
 */
export const Operations: { value: Operation; label: string }[] = [
  { value: 'eq', label: 'Equals' },
  { value: 'lt', label: 'Less than' },
  { value: 'le', label: 'Less than or equal to' },
  { value: 'gt', label: 'Greater than' },
  { value: 'ge', label: 'Greater than or equal to' },
  { value: 'miss', label: 'Missing' },
  { value: 'not_miss', label: 'Not missing' },
  { value: 'in', label: 'In' },
  { value: 'not_in', label: 'Not in' },
];

/**
 * Where clause definition
 */
export interface WhereClauseCondition {
  /** Unique identifier */
  id?: string;
  /** Item being checked */
  item?: DatasetJsonItemClass | null;
  /** Operation to apply */
  whereOperation?: Operation;
  /** Value(s) in the where clause */
  filteredItemValues?: (string | number | Date)[];
}

/**
 * Typescript class for a SummaryTable where clause
 */
export class WhereClauseConditionClass {
  private _id = '';
  /**
   * Unique Id attribute
   */
  get id() {
    return this._id;
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

  private _whereOperation: Operation = 'eq';
  /**
   *  Operation
   */
  get whereOperation() {
    return this._whereOperation;
  }
  /**
   * Operation
   */
  set whereOperation(newOperation) {
    if (['miss', 'not_miss'].includes(newOperation)) {
      this._filteredItemValues = [];
    } else if (['eq', 'lt', 'le', 'gt', 'ge'].includes(newOperation)) {
      if (this._filteredItemValues.length > 1)
        this._filteredItemValues = [this._filteredItemValues[0]];
    }
    this._whereOperation = newOperation;
  }

  private _filteredItemValues: (string | number | Date)[] = [];
  /**
   * Values for condition
   */
  get filteredItemValues() {
    return this._filteredItemValues;
  }
  /**
   * Values for condition
   */
  set filteredItemValues(newValues: (string | number | Date)[]) {
    if (newValues === undefined) this._filteredItemValues === newValues;
    else if (!this._item) throw new Error('WhereClause: Can not set values where there is no item');
    // Change strings to correct type here
    else if (
      (this._item.type === eItemType.date ||
        this._item.type === eItemType.datetime ||
        this._item.type === eItemType.time) &&
      newValues.every((v) => typeof v === 'string')
    ) {
      this._filteredItemValues = newValues
        .map((v) => new Date(v as string))
        .filter((v) => v !== undefined && !isNaN(v.getTime()));
    } else if (
      this._item.type === eItemType.float &&
      newValues.every((v) => typeof v === 'string')
    ) {
      this._filteredItemValues = newValues
        .map((v) => parseFloat(v as string))
        .filter((v) => v !== undefined && !isNaN(v));
    } else if (
      this._item.type === eItemType.integer &&
      newValues.every((v) => typeof v === 'string')
    ) {
      this._filteredItemValues = newValues
        .map((v) => parseInt(v as string))
        .filter((v) => v !== undefined && !isNaN(v));
    }
    // Standard set
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
      this._id &&
      this._item &&
      ((['miss', 'not_miss'].includes(this._whereOperation) &&
        this._filteredItemValues.length === 0) ||
        (['eq', 'lt', 'le', 'gt', 'ge'].includes(this._whereOperation) &&
          this._filteredItemValues.length === 1) ||
        ['in', 'not_in'].includes(this._whereOperation))
    );
  }

  /**
   * Create where clause
   * @param newWhereClauseCondition
   * Parameters:
   * {
   *  @id unique id
   *  @item DatasetJsonItem
   *  @whereOperation Operation
   *  @filteredItemValues Values
   * }
   */
  public constructor(newWhereClauseCondition?: WhereClauseCondition) {
    this._id = newWhereClauseCondition?.id ?? crypto.randomUUID();
    this._item = newWhereClauseCondition?.item ?? null;
    this._whereOperation = newWhereClauseCondition?.whereOperation ?? 'eq';
    this._filteredItemValues = newWhereClauseCondition?.filteredItemValues ?? [];
  }

  /**
   * Update existing where clause, and save previous version if valid
   * @param itemName new name
   * @param whereOperation: new operation
   * @param filteredItemValues: new item values
   */
  public update(
    itemName: DatasetJsonItemClass,
    whereOperation: Operation,
    filteredItemValues: (string | number | Date)[],
  ) {
    this._item = itemName;
    this._whereOperation = whereOperation;
    this._filteredItemValues = filteredItemValues;
  }
}
