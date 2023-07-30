import { ContextWindowStack } from '@asup/context-menu';
import { useContext } from 'react';
import { DSJContext } from '../../context/DSJContextProvider';
import { SummaryTableContextProvider } from '../../context/SummaryTableContext';
import { DropTable } from '../drop-table/DropTable';
import { ItemList } from '../lhs/ItemList';
import { SummaryTableWhere } from '../where/SummaryTableWhere';
import { SummaryStateButton } from './SummaryStateButton';

export const SummaryTableGenerator = (): JSX.Element => {
  const { state } = useContext(DSJContext);
  return (
    <>
      {!state.datasetJson ? (
        <></>
      ) : (
        <ContextWindowStack>
          <SummaryTableContextProvider dataset={state.datasetJson}>
            <div className='summarytablegenerator'>
              <div className='simpletable-title-holder'>
                <h5 className='simpletable-title'>Summary table for: {state.datasetJson.name}</h5>
                <SummaryStateButton />
              </div>
              <div
                className='summarytable-main-holder'
                style={{ display: 'flex', flexDirection: 'row', height: 'calc(100% - 46px)' }}
              >
                <div
                  className='summarytable-lhs'
                  style={{ width: '190px', height: '100%' }}
                >
                  <ItemList id={'summarytable-item-list'} />
                </div>
                <div
                  className='summarytable-rhs'
                  style={{
                    width: 'calc(100% - 190px)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <SummaryTableWhere />
                  <DropTable id={'summarytable'} />
                </div>
              </div>
            </div>
          </SummaryTableContextProvider>
        </ContextWindowStack>
      )}
    </>
  );
};
