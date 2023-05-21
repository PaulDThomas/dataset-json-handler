import { createContext, useState } from 'react';
import { eStatistic } from '../interfaces/summaryInterfaces';
import { DatasetJson } from '../classes/DatasetJsonClass';
import { SummaryVariable } from '../interfaces/DatasetJsonItem';

export interface SummaryTableSchema {
  columns: SummaryVariable[];
  rows: SummaryVariable[];
  target?: SummaryVariable;
  statistics: eStatistic[];
  statisticPosition: 'row' | 'column';
}

export interface SummaryTableContextProps extends SummaryTableSchema {
  variableList: SummaryVariable[];
  setRows: (ret: SummaryVariable[]) => void;
  setColumns: (ret: SummaryVariable[]) => void;
}

export const SummaryTableContext = createContext<SummaryTableContextProps>({
  variableList: [],
  rows: [],
  setRows: (ret) => console.log(ret.length),
  columns: [],
  setColumns: (ret) => console.log(ret.length),
  statistics: [],
  statisticPosition: 'row',
});

interface SummaryTableContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
  dataset: DatasetJson;
}

export const SummaryTableContextProvider = ({
  dataset,
  children,
}: SummaryTableContextProviderProps): JSX.Element => {
  const [rows, setRows] = useState<SummaryVariable[]>([]);
  const [columns, setColumns] = useState<SummaryVariable[]>([]);

  return (
    <SummaryTableContext.Provider
      value={{
        variableList: dataset.items,
        rows,
        columns,
        setRows,
        setColumns,
        statistics: [],
        statisticPosition: 'row',
      }}
    >
      {children}
    </SummaryTableContext.Provider>
  );
};
