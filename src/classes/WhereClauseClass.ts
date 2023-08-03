export interface WhereClause {
  id?: string;
  label?: string;
  level?: number;
  order?: number;
  conditionId?: string;
  compoundExpressionId?: string;
}

export class WhereClauseClass {
  private _id = '';
  /** Unique identifier */
  get id() {
    return this._id;
  }

  private _label = '0';
  /** A short informative description that may be used for display. */
  get label() {
    return this._label;
  }
  set label(newLabel) {
    this._label = newLabel;
  }

  private _level = 0;
  /** The level of the entry within a hierarchical structure. */
  get level() {
    return this._level;
  }
  set level(newLevel) {
    this._level = newLevel;
  }

  private _order = 0;
  /** The ordinal of the instance with respect to other instances. */
  get order() {
    return this._order;
  }
  set order(newOrder) {
    this._order = newOrder;
  }

  private _condition: string | null = null;
  /** Unique id for a connected where clause condition */
  get condition() {
    return this._condition;
  }
  set condition(newConditionId) {
    this._condition = newConditionId;
  }

  private _compoundExpression: string | null = null;
  /** Unique id for a connected where clause compound expression */
  get compoundExpression() {
    return this._compoundExpression;
  }
  set compoundExpression(newExpressionId) {
    this._compoundExpression = newExpressionId;
  }

  public constructor(newWhereClause?: WhereClause) {
    this._id = newWhereClause?.id ?? crypto.randomUUID();
    this._level = newWhereClause?.level ?? 1;
    this._order = newWhereClause?.order ?? 1;
    if (newWhereClause?.conditionId && newWhereClause.compoundExpressionId) {
      throw 'Where clause can only have one condition or compound expression';
    }
    this._condition = newWhereClause?.conditionId ?? null;
    this._compoundExpression = newWhereClause?.compoundExpressionId ?? null;
  }
}
