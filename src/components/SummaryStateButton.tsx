import { ContextWindow } from '@asup/context-menu';
import { SummaryTableContext } from '../context/SummaryTableContext';
import { useContext, useState } from 'react';
import ReactJson from 'react-json-view';
import './SummaryStateButton.css';

export const SummaryStateButton = () => {
  const summaryTableContext = useContext(SummaryTableContext);
  const [showWindow, setShowWindow] = useState<boolean>(false);
  return (
    <>
      <button
        onClick={() => setShowWindow(!showWindow)}
        className='summary-table-context-state-button'
      >
        ⓘ
      </button>
      <ContextWindow
        id={'summary-table-context-state-window'}
        visible={showWindow}
        title={'Summary table context state'}
        onClose={() => setShowWindow(false)}
        style={{ maxHeight: '75vh', maxWidth: '50vw', width: '400px', height: '300px' }}
      >
        <ReactJson src={summaryTableContext.state} />
      </ContextWindow>
    </>
  );
};
