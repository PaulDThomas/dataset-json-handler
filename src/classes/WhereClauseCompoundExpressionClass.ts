export type Operator = 'and' | 'or' | 'not';
export const Operators = [
  { value: 'and', label: 'AND' },
  { value: 'or', label: 'OR' },
  { value: 'not', label: 'NOT' },
];

export interface WhereClauseCompoundExpression {
  id?: string;
  operator?: Operator;
  whereClauses?: string[];
}

export class WhereClauseCompoundExpressionClass {
  protected _id = '';
  /** Unique identifier */
  get id() {
    return this._id;
  }

  protected _operator: Operator | null = null;
  /** The boolean operator that is used to combine (AND, OR) or negate (NOT) the where claus(s) in the compound expression. */
  get operator() {
    return this._operator;
  }
  set operator(newOperator) {
    this._operator = newOperator;
  }

  protected _whereClauses: string[] = [];
  /** Unique ids for connected where clauses */
  get whereClauses() {
    return this._whereClauses;
  }
  set whereClauses(newWhereClauses) {
    this._whereClauses = newWhereClauses;
  }
  /**
   * Add new where clause to the expression
   * @param newWhereClause Where clause id to add
   */
  public addWhereClause(newWhereClause: string) {
    this._whereClauses.push(newWhereClause);
  }
  /** Remove a single where clause from the expression
   * @param whereClause Id ot where clause to remove
   */
  public removeWhereClause(whereClause: string) {
    this._whereClauses = [...this.whereClauses.filter((w) => w !== whereClause)];
  }

  public constructor(whereClauseCompoundExpression?: WhereClauseCompoundExpression) {
    this._id === whereClauseCompoundExpression?.id ?? crypto.randomUUID();
    this._operator = whereClauseCompoundExpression?.operator ?? null;
    this._whereClauses = whereClauseCompoundExpression?.whereClauses ?? [];
  }
}
