import { SummaryTableGenerator } from '../main';
import { PaneForData } from '../components/main/PaneForData';
import { PaneForItems } from '../components/main/PaneForItems';

export type Pane = 'items' | 'data' | 'summary';

export const panes: {
  value: Pane;
  label: string;
  element: () => JSX.Element;
}[] = [
  { value: 'items', label: 'Items', element: PaneForItems },
  { value: 'data', label: 'Data', element: PaneForData },
  { value: 'summary', label: 'Summary table', element: SummaryTableGenerator },
];
