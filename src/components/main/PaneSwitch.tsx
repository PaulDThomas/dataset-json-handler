import { Fragment, useContext } from 'react';
import { DSJContextProps, DSJContext } from '../../context/DSJContextProvider';
import { SET_PANE } from '../../context/dsjReducer';
import { panes } from '../../consts/panes';

export const PaneSwitch = () => {
  const { state, dispatch } = useContext<DSJContextProps>(DSJContext);

  return (
    <>
      Show
      {panes.map((k, i) => (
        <Fragment key={i}>
          <input
            type='radio'
            role='radio'
            checked={state.pane === k.value}
            onChange={() => dispatch({ operation: SET_PANE, pane: k.value })}
            id={`pane-switch-${k.value}`}
          />
          <label htmlFor={`pane-switch-${k.value}`}>{k.label}</label>
        </Fragment>
      ))}
    </>
  );
};
