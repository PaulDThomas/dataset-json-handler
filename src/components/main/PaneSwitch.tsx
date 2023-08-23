import { Fragment, useContext, useEffect } from 'react';
import { DSJContextProps, DSJContext } from '../../context/DSJContextProvider';
import { SET_PANE } from '../../context/dsjReducer';
import { Pane, panes } from '../../consts/panes';

export const PaneSwitch = () => {
  const { state, dispatch } = useContext<DSJContextProps>(DSJContext);

  // Set initial page here after checking window location hash, not as a default
  useEffect(() => {
    if (state.pane === undefined) {
      if (window.location.hash !== '')
        dispatch({ operation: SET_PANE, pane: window.location.hash.slice(1) as Pane });
      else dispatch({ operation: SET_PANE, pane: 'items' });
    }
  }, [dispatch, state.pane]);

  return (
    <>
      Show
      {panes.map((k, i) => (
        <Fragment key={i}>
          <input
            type='radio'
            role='radio'
            checked={state.pane === k.value}
            onChange={(e) => {
              e.stopPropagation();
              window.location.hash = k.value;
              dispatch({ operation: SET_PANE, pane: k.value });
            }}
            id={`pane-switch-${k.value}`}
          />
          <label htmlFor={`pane-switch-${k.value}`}>{k.label}</label>
        </Fragment>
      ))}
    </>
  );
};
