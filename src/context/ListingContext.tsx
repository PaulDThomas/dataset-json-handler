import { iSimpleTableRow } from "@asup/simple-table";
import { ReactNode, createContext, useEffect, useReducer } from "react";
import { DatasetJsonItem, DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { DatasetJsonClass } from "../main";
import { LsActionProps, SET_ITEMS, lsReducer } from "./lsReducer";

export interface ListingHeader extends iSimpleTableRow {
  colno: number;
  item: DatasetJsonItem;
  label: string;
  md: string;
}

export interface ListingData {
  itemList: DatasetJsonItem[];
  listingHeaders: ListingHeader[];
}

export interface ListingSchema {
  itemList: DatasetJsonItemClass[];
  listingHeaders: ListingHeader[];
}

const initialState: ListingSchema = {
  itemList: [],
  listingHeaders: [],
};

export interface ListingContextProps {
  state: ListingSchema;
  dispatch: React.Dispatch<LsActionProps>;
}

export const ListingContext = createContext<ListingContextProps>({
  state: initialState,
  dispatch: () => ({}),
});

interface ListingContextProviderProps {
  children: ReactNode;
  dataset: DatasetJsonClass;
}

export const ListingContextProvider = ({
  children,
  dataset,
}: ListingContextProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(lsReducer, initialState);

  useEffect(() => {
    dispatch({ operation: SET_ITEMS, items: dataset.items });
  }, [dataset.items]);

  return <ListingContext.Provider value={{ state, dispatch }}>{children}</ListingContext.Provider>;
};

ListingContextProvider.displayName = "ListingContextProvider";
