import { createContext, useState } from 'react';
import { eStatistic } from 'enums/eStatistic';
import { DatasetJson } from '../classes/DatasetJsonClass';
import { WhereClauseClass } from '../classes/WhereClauseClass';
import { DataSetJsonItemClass } from '../classes/DatasetJsonItemClass';

export interface SummaryTableSchema {
  columns: DataSetJsonItemClass[];
  rows: DataSetJsonItemClass[];
  target?: DataSetJsonItemClass;
  statistics: eStatistic[];
  statisticPosition: 'row' | 'column';
  whereClauses: WhereClauseClass[];
}

export interface SummaryTableContextProps extends SummaryTableSchema {
  variableList: DataSetJsonItemClass[];
  setRows: (ret: DataSetJsonItemClass[]) => void;
  setColumns: (ret: DataSetJsonItemClass[]) => void;
  setWhereClauses: (ret: WhereClauseClass[]) => void;
}

export const SummaryTableContext = createContext<SummaryTableContextProps>({
  variableList: [],
  rows: [],
  setRows: (ret) => console.log(ret.length),
  columns: [],
  setColumns: (ret) => console.log(ret.length),
  statistics: [],
  statisticPosition: 'row',
  whereClauses: [],
  setWhereClauses: (ret) => console.log(ret.length),
});

interface SummaryTableContextProviderProps {
  children: string | JSX.Element | JSX.Element[];
  dataset: DatasetJson;
}

export const SummaryTableContextProvider = ({
  dataset,
  children,
}: SummaryTableContextProviderProps): JSX.Element => {
  const [rows, setRows] = useState<DataSetJsonItemClass[]>([]);
  const [columns, setColumns] = useState<DataSetJsonItemClass[]>([]);
  const [whereClauses, setWhereClauses] = useState<WhereClauseClass[]>([]);

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
        whereClauses,
        setWhereClauses,
      }}
    >
      {children}
    </SummaryTableContext.Provider>
  );
};
