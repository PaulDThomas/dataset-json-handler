import { createContext } from 'react';
import { SummaryTableSchema } from '../interfaces/summaryInterfaces';
import { DatasetJson } from '../classes/DatasetJsonClass';
import { SummaryVariable } from '../interfaces/DatasetJsonItem';

export interface SummaryTableContextProps extends SummaryTableSchema {
  variableList: SummaryVariable[];
  setDndTableSchema?: (ret: SummaryTableSchema) => void;
}

export const SummaryTableContext = createContext<SummaryTableContextProps>({
  variableList: [],
  rows: [],
  columns: [],
  statisticPosition: 'row',
  statistics: [],
});

interface SummaryTableContextProvideProps {
  children: string | JSX.Element | JSX.Element[];
  dataset: DatasetJson;
}

export const SummaryTableContextProvider = ({
  dataset,
  children,
}: SummaryTableContextProvideProps): JSX.Element => {
  return (
    <SummaryTableContext.Provider
      value={{
        variableList: dataset.items,
        rows: [],
        columns: [],
        statistics: [],
        statisticPosition: 'row',
      }}
    >
      {children}
    </SummaryTableContext.Provider>
  );
};
