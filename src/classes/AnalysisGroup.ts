import { DatasetJsonItem, DatasetJsonItemClass } from "./DatasetJsonItemClass";
import { WhereClauseClass } from "./WhereClauseClass";

/** Analysis group parameters */
export interface AnalysisGroup {
  /** Unique id */
  id: string;
  /** Group label */
  label?: string;
  /** Group type */
  type?: string;
  /** DatasetJsonItemClass used to order the group */
  orderItem?: DatasetJsonItem | null;
  /** DatasetJsonItemClass used for displaying values */
  valueItem?: DatasetJsonItem | null;
  /** Indicator if distinct subject count is required for this group */
  bigN?: boolean;
  /** Expected/available where clause ids of the levels in this group */
  levels?: string[] | null;
}

/** Analysis group class, used around the summary table contents */
export class AnalysisGroupClass extends WhereClauseClass {
  /** Group type */
  get type() {
    return "AnalysisGroup";
  }

  protected _orderItem: DatasetJsonItemClass | null = null;
  /** DatasetJsonItem used to order this group */
  get orderItem() {
    return this._orderItem;
  }
  set orderItem(newItem) {
    this._orderItem = newItem;
  }

  protected _valueItem: DatasetJsonItemClass | null = null;
  /** DatasetJsonItem used to display values in this group */
  get valueItem() {
    return this._valueItem;
  }
  set valueItem(newItem) {
    this._valueItem = newItem;
  }

  protected _bigN = false;
  /** Indicator to calculate the big N for this group */
  get bigN() {
    return this._bigN;
  }
  set bigN(newValue: boolean) {
    this._bigN = newValue;
  }

  protected _levels: string[] | null = null;
  /** Unique id for a connected where clause */
  get levels() {
    return this._levels;
  }
  set levels(newLevels) {
    this._levels = newLevels;
  }
  /**
   * Add level to group
   * @param newLevel New level to add
   */
  public addLevel(newLevel: string) {
    if (!this.levels || this.levels.length === 0) this._levels = [newLevel];
    else (this._levels as string[]).push(newLevel);
  }
  /**
   * Remove level from group
   * @param level Existing level to remove
   */
  public removeLevel(level: string) {
    if (this.levels) this._levels = [...this.levels.filter((l) => l !== level)];
  }

  /**
   * Data stored in the class
   */
  get data(): AnalysisGroup {
    return {
      id: this._id,
      label: this._label,
      type: this.type,
      orderItem: this._orderItem?.data,
      valueItem: this._valueItem?.data,
      bigN: this._bigN,
      levels: this._levels,
    };
  }

  /**
   * Stringified version of the class
   */
  get toString() {
    return JSON.stringify(this.data);
  }

  /**
   * Analysis group
   * @param newAnalysisGroup Analysis group parameters
   */
  public constructor(newAnalysisGroup?: AnalysisGroup) {
    super(newAnalysisGroup);
    this._label = newAnalysisGroup?.label ?? "New Analysis group";
    this._orderItem = newAnalysisGroup?.orderItem
      ? new DatasetJsonItemClass(newAnalysisGroup.orderItem)
      : null;
    this._valueItem = newAnalysisGroup?.valueItem
      ? new DatasetJsonItemClass(newAnalysisGroup.valueItem)
      : null;
    this._bigN = newAnalysisGroup?.bigN ?? false;
    this._levels = newAnalysisGroup?.levels ?? null;
  }
}
