import { CdiscDatasetJson, DatasetJson } from '../../../src/main';
import { Pane } from '../consts/panes';

export const LOAD_DSJ = 'LOAD_DSJ';
export const SET_PANE = 'SET_PANE';

type Operation = 'LOAD_DSJ' | 'SET_PANE';

export interface DsjActionProps {
  operation: Operation;
  pane?: Pane;
  datasetJson?: CdiscDatasetJson;
}

export interface dsjState {
  rawUrl: string;
  pane: Pane;
  datasetJson: DatasetJson | null;
}

export const dsjReducer = (state: dsjState, action: DsjActionProps): dsjState => {
  const newState = {
    ...state,
  };
  switch (action.operation) {
    case 'LOAD_DSJ':
      if (action.datasetJson) newState.datasetJson = new DatasetJson(action.datasetJson);
      break;
    case 'SET_PANE':
      if (action.pane) newState.pane = action.pane;
      break;
  }

  return newState;
};
