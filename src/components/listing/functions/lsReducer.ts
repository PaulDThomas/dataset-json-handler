import _ from "lodash";
import { ListingData, ListingHeader, ListingSchema } from "../ListingContext";
import { DatasetJsonItemClass } from "../../../classes/DatasetJsonItemClass";

export const ADD_COLUMN = "ADD_COLUMN";
export const LOAD_LISTING = "LOAD_LISTING";
export const REMOVE_COLUMN = "REMOVE_COLUMN";
export const SET_ITEMS = "SET_ITEMS";
export const UPDATE_COLUMN = "UPDATE_COLUMN";
export const UPDATE_WIDTHS = "UPDATE_WIDTHS";

type LsOperation =
  | "ADD_COLUMN"
  | "LOAD_LISTING"
  | "SET_ITEMS"
  | "REMOVE_COLUMN"
  | "UPDATE_COLUMN"
  | "UPDATE_WIDTHS";

export interface LsActionProps {
  operation: LsOperation;
  items?: DatasetJsonItemClass[];
  incomingStatus?: ListingData;
  newColumn?: DatasetJsonItemClass;
  columnPosition?: number;
  columnUpdate?: ListingHeader;
  columnWidths?: (string | undefined)[];
}

export const lsReducer = (state: ListingSchema, action: LsActionProps): ListingSchema => {
  const newState = _.cloneDeep(state);
  switch (action.operation) {
    case ADD_COLUMN:
      if (
        action.columnPosition !== undefined &&
        action.newColumn &&
        action.columnPosition <= newState.listingHeaders.length
      ) {
        const newColumn: ListingHeader = {
          colno: action.columnPosition,
          item: action.newColumn.data,
          label: action.newColumn.label,
          width: "150px",
          md: `[${action.newColumn.name}]`,
        };
        newState.listingHeaders.splice(action.columnPosition, 0, newColumn);
      }
      break;
    case LOAD_LISTING:
      if (action.incomingStatus) {
        newState.itemList = action.incomingStatus.itemList.map((i) => new DatasetJsonItemClass(i));
        newState.listingHeaders = action.incomingStatus.listingHeaders;
      }
      break;
    case REMOVE_COLUMN:
      if (action.columnPosition !== undefined) {
        newState.listingHeaders.splice(action.columnPosition, 1);
      }
      break;
    case SET_ITEMS:
      if (action.items) {
        newState.itemList = action.items;
      }
      break;
    case UPDATE_COLUMN:
      if (action.columnUpdate) {
        newState.listingHeaders.splice(action.columnUpdate.colno, 1, action.columnUpdate);
      }
      break;
    case UPDATE_WIDTHS:
      if (action.columnWidths) {
        newState.listingHeaders = newState.listingHeaders.map((h, i) => ({
          ...h,
          width: (action.columnWidths as (string | undefined)[])[i],
        }));
      }
      break;
  }
  // Always reassess colno
  return {
    ...newState,
    listingHeaders: newState.listingHeaders.map((lh, colno) => ({ ...lh, colno })),
  };
};