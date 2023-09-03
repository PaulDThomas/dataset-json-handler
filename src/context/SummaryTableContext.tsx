import { eStatistic } from "enums/eStatistic";
import { createContext, useEffect, useReducer } from "react";
import { AnalysisGroup, AnalysisGroupClass } from "../classes/AnalysisGroup";
import { DataGroup, DataGroupClass } from "../classes/DataGroup";
import { DatasetJsonClass } from "../classes/DatasetJsonClass";
import { DatasetJsonItem, DatasetJsonItemClass } from "../classes/DatasetJsonItemClass";
import { WhereClause, WhereClauseClass } from "../classes/WhereClauseClass";
import {
  WhereClauseCondition,
  WhereClauseConditionClass,
} from "../classes/WhereClauseConditionClass";
import { ActionProps, SET_ITEMS, stReducer } from "./stReducer";

export interface SummaryTableData {
  page: string[];
  rows: DatasetJsonItem[];
  columnAnalysisGroup: AnalysisGroup | null;
  columns: string[];
  target?: DatasetJsonItem;
  statistics: eStatistic[];
  statisticPosition: "row" | "column";
  whereClauses: WhereClause[];
  whereClauseConditions: WhereClauseCondition[];
  groupList: (AnalysisGroup | DataGroup)[];
  itemList: DatasetJsonItem[];
}

export interface SummaryTableSchema {
  page: string[];
  rows: DatasetJsonItemClass[];
  columnAnalysisGroup: AnalysisGroupClass | null;
  columns: string[];
  target?: DatasetJsonItemClass;
  statistics: eStatistic[];
  statisticPosition: "row" | "column";
  whereClauses: WhereClauseClass[];
  whereClauseConditions: WhereClauseConditionClass[];
  groupList: (AnalysisGroupClass | DataGroupClass)[];
  itemList: DatasetJsonItemClass[];
}

const initialState: SummaryTableSchema = {
  page: [],
  rows: [],
  columnAnalysisGroup: null,
  columns: [],
  statistics: [],
  statisticPosition: "column",
  whereClauses: [],
  whereClauseConditions: [],
  groupList: [],
  itemList: [],
};

export interface SummaryTableContextProps {
  state: SummaryTableSchema;
  dispatch: React.Dispatch<ActionProps>;
}

export const SummaryTableContext = createContext<SummaryTableContextProps>({
  state: initialState,
  dispatch: () => ({}),
});

interface SummaryTableContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
  dataset: DatasetJsonClass;
}

export const SummaryTableContextProvider = ({
  dataset,
  children,
}: SummaryTableContextProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(stReducer, initialState);

  useEffect(() => {
    dispatch({ operation: SET_ITEMS, items: dataset.items });
  }, [dataset.items]);

  return (
    <SummaryTableContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SummaryTableContext.Provider>
  );
};

SummaryTableContextProvider.displayName = "SummaryTableContextProvider";
