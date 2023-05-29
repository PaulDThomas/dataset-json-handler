import { eStatistic } from 'enums/eStatistic';
import { createContext, useReducer } from 'react';
import { DatasetJson } from '../classes/DatasetJsonClass';
import { DataSetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { WhereClauseClass } from '../classes/WhereClauseClass';
import { ActionProps, reducer } from '../functions/reducer';

export interface SummaryTableSchema {
  rows: DataSetJsonItemClass[];
  columns: DataSetJsonItemClass[];
  target?: DataSetJsonItemClass;
  statistics: eStatistic[];
  statisticPosition: 'row' | 'column';
  whereClauses: WhereClauseClass[];
}

const initialState: SummaryTableSchema = {
  rows: [],
  columns: [],
  statistics: [],
  statisticPosition: 'column',
  whereClauses: [],
};

export interface SummaryTableContextProps {
  state: SummaryTableSchema;
  dispatch: React.Dispatch<ActionProps>;
  itemList: DataSetJsonItemClass[];
}

export const SummaryTableContext = createContext<SummaryTableContextProps>({
  state: initialState,
  dispatch: () => ({}),
  itemList: [],
});

interface SummaryTableContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
  dataset: DatasetJson;
}

export const SummaryTableContextProvider = ({
  dataset,
  children,
}: SummaryTableContextProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SummaryTableContext.Provider
      value={{
        state,
        dispatch,
        itemList: dataset.items,
      }}
    >
      {children}
    </SummaryTableContext.Provider>
  );
};
