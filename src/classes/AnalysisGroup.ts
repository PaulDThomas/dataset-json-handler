import { DatasetJsonItemClass } from './DatasetJsonItemClass';
import { WhereClauseClass } from './WhereClauseClass';

/** Analysis group parameters */
export interface AnalysisGroup {
  /** Unique id */
  id?: string;
  /** Group label */
  label?: string;
  /** DatasetJsonItemClass used to order the group */
  orderItem?: DatasetJsonItemClass;
  /** DatasetJsonItemClass used for displaying values */
  valueItem?: DatasetJsonItemClass;
  /** Indicator if distinct subject count is required for this group */
  bigN?: boolean;
  /** Expected/available where clause ids of the levels in this group */
  levels?: string[] | null;
}

export class AnalysisGroupClass extends WhereClauseClass {
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
  public addLevel(newLevel: string) {
    if (!this.levels || this.levels.length === 0) this._levels = [newLevel];
    else (this._levels as string[]).push(newLevel);
  }
  public removeLevel(level: string) {
    if (this.levels) this._levels = [...this.levels.filter((l) => l !== level)];
  }

  /**
   * Analysis group
   * @param newAnalysisGroup Analysis group parameters
   */
  public constructor(newAnalysisGroup?: AnalysisGroup) {
    super(newAnalysisGroup);
    this._label = newAnalysisGroup?.label ?? 'New Analysis group';
    this._orderItem = newAnalysisGroup?.orderItem ?? null;
    this._valueItem = newAnalysisGroup?.valueItem ?? null;
    this._bigN = newAnalysisGroup?.bigN ?? false;
    this._levels = newAnalysisGroup?.levels ?? null;
  }
}
