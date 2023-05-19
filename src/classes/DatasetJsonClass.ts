import { iSimpleTableField, iSimpleTableRow, simpleTableSortFn } from '@asup/simple-table';
import { DatasetJsonItem } from '../interfaces/DatasetJsonItem';
import { itemDataRow } from '../interfaces/itemDataRow';
import { cdiscDatasetJson } from '../interfaces/cdiscDatasetJson';

/**
 * Typescript class for a CDISC data set JSON object
 */
export class DatasetJson {
  private _errorText = '';
  /**
   * Error text after internal error
   */
  get errorText() {
    return this._errorText;
  }

  private _studyOID = '';
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
    if (newValue !== '') {
      this._studyOID = newValue;
    }
  }
  private _metaDataVersionOID = 'CDISC.ADaM.2.1';
  get metaDataVersionOID() {
    return this._metaDataVersionOID;
  }

  private _name = '';
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
    if (newValue !== '') {
      this._name = newValue;
    }
  }

  private _label = '';
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
    if (newValue !== '') {
      this._label = newValue;
    }
  }

  /**
   * Number of records in the data set
   */
  get records() {
    return this.itemData.length;
  }

  private _items: DatasetJsonItem[] = [];
  /**
   * Items (variables) in the data set
   */
  get items() {
    return this._items;
  }
  /**
   * Items (variables) in the data set
   */
  set items(newItems: DatasetJsonItem[]) {
    if (newItems.length > 0) {
      this._items = newItems;
    }
  }
  get simpleTableFields() {
    return this._items.map(
      (item) =>
        ({
          ...item,
          sortFn: simpleTableSortFn,
          searchFn:
            item.type === 'string'
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
  public addItem(newItem: DatasetJsonItem): boolean {
    if (this.items.map((i) => i.name).includes(newItem.name)) {
      this._errorText = 'Item name already exists';
      return false;
    }
    this._items.push(newItem);
    this._itemData.forEach((row) => {
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
      this._itemData.forEach((row) => {
        if (Object.keys(row).includes(oldItemName)) {
          delete row.oldItemName;
        }
      });
    }
  }

  public _itemData: itemDataRow[] = [];
  /**
   * Data stored in the data set
   */
  get itemData() {
    return this._itemData.filter((row) => !row.__isDeleted);
  }
  /**
   * Data stored in the data set
   */
  set itemData(newItemDataRows: iSimpleTableRow[]) {
    this._itemData = newItemDataRows.map((row, i) => ({
      ...new Map(this._items.map((item) => [item.name, row[item.name]])),
      __rowNumber: i + 1,
      __isDeleted: false,
    }));
  }

  /**
   * Add single row to the data
   * @param newItemDataRow New row data
   * @returns true is successful, false (& sets errorText) is there is an error
   */
  public addItemData(newItemDataRow: iSimpleTableRow): boolean {
    const newItem = Object.fromEntries(
      new Map(this._items.map((item) => [item.name, newItemDataRow[item.name]])),
    );
    this._itemData.push({ ...newItem, __rowNumber: this._itemData.length, __isDeleted: false });
    return true;
  }

  /**
   * Remove a single row from the data
   * @param rowNumber Row number to remove
   * @returns true is successful, false (& sets errorText) is there is an error
   */
  public removeItemData(rowNumber: number): boolean {
    const ix = this._itemData.findIndex((row) => row.__rowNumber === rowNumber);
    if (ix > -1) {
      this._itemData[ix].__isDeleted = true;
      return true;
    } else {
      this._errorText = 'Row number not found';
      return false;
    }
  }

  public constructor(newJson: cdiscDatasetJson) {
    this._studyOID = newJson.clinicalData.studyOID;
    this._metaDataVersionOID = newJson.clinicalData.metaDataVersionOID;
    const ds = Object.values(newJson.clinicalData.itemGroupData)[0];
    this._name = ds.name;
    this._label = ds.label;
    this._items = ds.items;
    this._itemData = ds.itemData.map((arrayRow, ai) => {
      const newItem = Object.fromEntries(
        new Map(ds.items.map((item, i) => [item.name, arrayRow[i]])),
      );
      return { ...newItem, __rowNumber: ai + 1, __isDeleted: false };
    });
  }
}
