import { eOperation } from '../enums/eOperation';
import { DataSetJsonItemClass, eVariableType } from './DatasetJsonItemClass';
import { randomUUID } from 'crypto';

/**
 * Where clause definition
 */
export interface iWhereClause {
  /** Unique identifier */
  WID?: string;
  /** Variable being checked */
  variable: DataSetJsonItemClass;
  /** Operation to apply */
  whereOperation: eOperation | null;
  /** Value(s) in the where clause */
  filteredVariableValues?: (string | number | Date)[];
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
    _variableName: DataSetJsonItemClass;
    _whereOperation: eOperation;
    _filteredVariableValues: (string | number | Date)[] | undefined;
  }[] = [];
  get previousVersions() {
    return this._previousVersions;
  }

  private _variable: DataSetJsonItemClass | null = null;
  /**
   * Variable to check
   */
  get variable() {
    return this._variable;
  }
  /**
   * Variable to check
   */
  set variable(newVariable: DataSetJsonItemClass | null) {
    this._variable = newVariable;
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

  private _filteredVariableValues: (string | number | Date)[] | undefined = [];
  /**
   * Values for condition
   */
  get filteredVariableValues() {
    return this._filteredVariableValues;
  }
  /**
   * Values for condition
   */
  set filteredVariableValues(newValues: (string | number | Date)[] | undefined) {
    if (newValues === undefined) this._filteredVariableValues === newValues;
    else if (!this._variable)
      throw new Error('WhereClause: Can not set values where there is no variable');
    else if (
      this._variable.type === eVariableType.string &&
      newValues.some((v) => typeof v !== 'string')
    )
      throw new Error('WhereClause: Can only set string values for a string variable');
    else if (
      [eVariableType.integer, eVariableType.float].includes(this._variable.type) &&
      newValues.some((v) => typeof v !== 'number')
    )
      throw new Error('WhereClause: Can only set number values for a integer or float variable');
    else if (
      [eVariableType.date, eVariableType.datetime, eVariableType.time].includes(
        this._variable.type,
      ) &&
      newValues.some((v) => !(v instanceof Date))
    )
      throw new Error(
        'WhereClause: Can only set date values for a date, datetime or time variable',
      );
    else this._filteredVariableValues = newValues;
  }

  /**
   * Check if current where clause is valid
   */
  get isValid() {
    return (
      this._WID &&
      this._variable &&
      this._whereOperation &&
      (([eOperation.miss, eOperation.not_miss].includes(this._whereOperation) &&
        this.filteredVariableValues?.length === 0) ||
        ([eOperation.eq, eOperation.ge, eOperation.gt, eOperation.le, eOperation.lt].includes(
          this._whereOperation,
        ) &&
          this._filteredVariableValues?.length === 1) ||
        ([eOperation.in, eOperation.not_in] && (this._filteredVariableValues?.length ?? -1) > 0))
    );
  }

  /**
   * Create where clause
   * @param newWhereClause
   * Parameters:
   * {
   *  @WID unique id
   *  @variable DatasetJsonItem
   *  @whereOperation Operation
   *  @filteredVariableValues Values
   * }
   */
  public constructor(newWhereClause: iWhereClause) {
    this._WID = newWhereClause.WID ?? randomUUID();
    this._variable = newWhereClause.variable;
    this._whereOperation = newWhereClause.whereOperation;
    this._filteredVariableValues = newWhereClause.filteredVariableValues;
  }

  /**
   * Update existing where clause, and save previous version if valid
   * @param variableName U
   * @param whereOperation
   * @param filteredVariableValues
   */
  public update(
    variableName: DataSetJsonItemClass,
    whereOperation: eOperation,
    filteredVariableValues: (string | number | Date)[],
  ) {
    if (this._variable && this._whereOperation && this.isValid) {
      const currentVersion = {
        timestamp: new Date(),
        _variableName: this._variable,
        _whereOperation: this._whereOperation,
        _filteredVariableValues: this._filteredVariableValues,
      };
      this._previousVersions.push(currentVersion);
    }
    this._variable = variableName;
    this._whereOperation = whereOperation;
    this._filteredVariableValues = filteredVariableValues;
  }
}
