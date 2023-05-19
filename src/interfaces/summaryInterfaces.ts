import { SummaryVariable } from './DatasetJsonItem';

export enum eStatistic {
  n = 'n',
  pct = '%',
  mean = 'n',
  sd = 'SD',
  p0 = 'Min',
  p25 = 'Q1',
  p50 = 'Median',
  p75 = 'Q3',
  p100 = 'Max',
}

export interface SummaryTableSchema {
  columns: SummaryVariable[];
  rows: SummaryVariable[];
  target?: SummaryVariable;
  statistics: eStatistic[];
  statisticPosition: 'row' | 'column';
}

export interface position {
  location: 'row' | 'column';
  index: number[];
}

export interface dndData {
  type: 'variable' | 'statistic';
  data: SummaryVariable | eStatistic;
}
