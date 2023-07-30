import { Dispatch, ReactNode, createContext, useReducer } from 'react';
import { DsjActionProps, dsjReducer, dsjState } from './dsjReducer';

export interface DSJContextProps {
  state: dsjState;
  dispatch: Dispatch<DsjActionProps>;
}

const defaultContext: dsjState = {
  rawUrl:
    'https://raw.githubusercontent.com/cdisc-org/DataExchange-DatasetJson/master/examples/adam/adae.json',
  datasetJson: null,
  pane: 'items',
};

export const DSJContext = createContext<DSJContextProps>({
  state: defaultContext,
  dispatch: () => undefined,
});

interface DsjContextProviderProps {
  children: ReactNode;
}

export const DsjContextProvider = ({ children }: DsjContextProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(dsjReducer, defaultContext);

  return (
    <DSJContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </DSJContext.Provider>
  );
};

export default DsjContextProvider;
