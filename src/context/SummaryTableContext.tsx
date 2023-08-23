import { eStatistic } from 'enums/eStatistic';
import { createContext, useEffect, useReducer } from 'react';
import { DatasetJsonClass } from '../classes/DatasetJsonClass';
import { DatasetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { AnalysisGroupClass } from '../classes/AnalysisGroup';
import { WhereClauseConditionClass } from '../classes/WhereClauseConditionClass';
import { ActionProps, SET_ITEMS, stReducer } from './stReducer';

export interface SummaryTableSchema {
  rows: DatasetJsonItemClass[];
  columns: DatasetJsonItemClass[];
  target?: DatasetJsonItemClass;
  statistics: eStatistic[];
  statisticPosition: 'row' | 'column';
  whereClauseConditions: WhereClauseConditionClass[];
  groupList: AnalysisGroupClass[];
  itemList: DatasetJsonItemClass[];
}

const initialState: SummaryTableSchema = {
  rows: [],
  columns: [],
  statistics: [],
  statisticPosition: 'column',
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

SummaryTableContextProvider.displayName = 'SummaryTableContextProvider';
