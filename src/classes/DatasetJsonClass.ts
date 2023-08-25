import { iSimpleTableField, iSimpleTableRow, simpleTableSortFn } from "@asup/simple-table";
import { DataRow } from "../interfaces/DataRow";
import { CdiscDatasetJson } from "../interfaces/CdiscDatasetJson";
import { DatasetJsonItemClass, iDatasetJsonItem } from "./DatasetJsonItemClass";

/**
 * Typescript class for a CDISC data set JSON object
 */
export class DatasetJsonClass {
  protected _errorText = "";
  /**
   * Error text after internal error
   */
  get errorText() {
    return this._errorText;
  }

  protected _studyOID = "";
  /**
   * studyOID attibute
   */
  get studyOID() {
    return this._studyOID;
  }
  /**
   * Sets value of studyOID
   */
  set studyOID(newValue: string) {
    if (newValue !== "") {
      this._studyOID = newValue;
    }
  }
  protected _metaDataVersionOID = "CDISC.ADaM.2.1";
  get metaDataVersionOID() {
    return this._metaDataVersionOID;
  }

  protected _name = "";
  /**
   * Data set name
   */
  get name() {
    return this._name;
  }
  /**
   * Data set name
   */
  set name(newValue: string) {
    if (newValue !== "") {
      this._name = newValue;
    }
  }

  protected _label = "";
  /**
   * Data set label
   */
  get label() {
    return this._label;
  }
  /**
   * Data set label
   */
  set label(newValue: string) {
    if (newValue !== "") {
      this._label = newValue;
    }
  }

  /**
   * Number of records in the data set
   */
  get records() {
    return this.dataRows.length;
  }

  protected _items: DatasetJsonItemClass[] = [];
  /**
   * Items (variables) in the data set
   */
  get items(): DatasetJsonItemClass[] {
    return this._items;
  }
  /**
   * Items (variables) in the data set
   */
  set items(newItems: (iDatasetJsonItem | DatasetJsonItemClass)[]) {
    if (newItems.length > 0) {
      this._items = newItems.map((i) =>
        i instanceof DatasetJsonItemClass ? i : new DatasetJsonItemClass(i),
      );
    }
  }
  get simpleTableFields() {
    return this._items.map(
      (item) =>
        ({
          ...item.data,
          sortFn: simpleTableSortFn,
          searchFn:
            item.type === "string"
              ? (row, text) =>
                  (row[item.name] as string).toLocaleLowerCase().includes(text.toLocaleLowerCase())
              : undefined,
        } as iSimpleTableField),
    );
  }
  /**
   * Add new item (variable) to the data set
   * @param newItem Add data set item definition to the data set
   * @returns true is successful, false (& sets errorText) is there is an error
   */
  public addItem(newItem: DatasetJsonItemClass | iDatasetJsonItem): boolean {
    if (this.items.map((i) => i.name).includes(newItem.name)) {
      this._errorText = "Item name already exists";
      return false;
    }
    this._items.push(
      newItem instanceof DatasetJsonItemClass ? newItem : new DatasetJsonItemClass(newItem),
    );
    this._dataRows.forEach((row) => {
      row[newItem.name] = undefined;
    });
    return true;
  }
  /**
   * Removes an item (variable) from the data set and the associated data
   * @param oldItemName Name of the item to remove
   */
  public removeItem(oldItemName: string) {
    const ix = this._items.findIndex((i) => i.name === oldItemName);
    if (ix > -1) {
      this._items.splice(ix, 1);
      this._dataRows.forEach((row) => {
        if (Object.keys(row).includes(oldItemName)) {
          delete row.oldItemName;
        }
      });
    }
  }

  public _dataRows: DataRow[] = [];
  /**
   * Data stored in the data set
   */
  get dataRows() {
    return this._dataRows.filter((row) => !row.__isDeleted);
  }
  /**
   * Data stored in the data set
   */
  set dataRows(newItemDataRows: iSimpleTableRow[]) {
    this._dataRows = newItemDataRows.map((row, i) => ({
      ...new Map(this._items.map((item) => [item.name, row[item.name]])),
      __rowNumber: i + 1,
      __isDeleted: false,
    }));
  }

  /**
   * Add single row to the data
   * @param newDataRow New row data
   * @returns true is successful, false (& sets errorText) is there is an error
   */
  public addDataRow(newDataRow: iSimpleTableRow): boolean {
    const _newDataRow = Object.fromEntries(
      new Map(this._items.map((item) => [item.name, newDataRow[item.name]])),
    );
    this._dataRows.push({ ..._newDataRow, __rowNumber: this._dataRows.length, __isDeleted: false });
    return true;
  }

  /**
   * Remove a single row from the data
   * @param rowNumber Row number to remove
   * @returns true is successful, false (& sets errorText) is there is an error
   */
  public removeDataRow(rowNumber: number): boolean {
    const ix = this._dataRows.findIndex((row) => row.__rowNumber === rowNumber);
    if (ix > -1) {
      this._dataRows[ix].__isDeleted = true;
      return true;
    } else {
      this._errorText = "Row number not found";
      return false;
    }
  }

  /**
   * Create new DatasetJson class
   * @param newJson Raw dataset JSON
   */
  public constructor(newJson: CdiscDatasetJson) {
    this._studyOID = newJson.clinicalData.studyOID;
    this._metaDataVersionOID = newJson.clinicalData.metaDataVersionOID;
    const ds = Object.values(newJson.clinicalData.itemGroupData)[0];
    this._name = ds.name;
    this._label = ds.label;
    this.items = ds.items;
    this._dataRows = ds.itemData.map((arrayRow, ai) => {
      const newItem = Object.fromEntries(
        new Map(ds.items.map((item, i) => [item.name, arrayRow[i]])),
      );
      return { ...newItem, __rowNumber: ai + 1, __isDeleted: false };
    });
  }
}
