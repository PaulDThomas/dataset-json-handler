import { eStatistic } from 'enums/eStatistic';
import { createContext, useReducer } from 'react';
import { DatasetJsonClass } from '../classes/DatasetJsonClass';
import { DatasetJsonItemClass } from '../classes/DatasetJsonItemClass';
import { WhereClauseClass } from '../classes/WhereClauseClass';
import { ActionProps, reducer } from '../functions/reducer';

export interface SummaryTableSchema {
  rows: DatasetJsonItemClass[];
  columns: DatasetJsonItemClass[];
  target?: DatasetJsonItemClass;
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
  itemList: DatasetJsonItemClass[];
}

export const SummaryTableContext = createContext<SummaryTableContextProps>({
  state: initialState,
  dispatch: () => ({}),
  itemList: [],
});

interface SummaryTableContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
  dataset: DatasetJsonClass;
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
