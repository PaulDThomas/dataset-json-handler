import { ContextWindowStack } from '@asup/context-menu';
import { DatasetJsonClass } from '../classes/DatasetJsonClass';
import { SummaryTableContextProvider } from '../context/SummaryTableContext';
import { SummaryTableWhere } from './where/SummaryTableWhere';
import { DropTable } from './drop-table/DropTable';
import { ItemList } from './lhs/ItemList';
import { ShowStateButton } from './ShowStateButton';

interface SummaryTableGeneratorProps {
  dataset: DatasetJsonClass;
}

export const SummaryTableGenerator = ({ dataset }: SummaryTableGeneratorProps): JSX.Element => {
  return (
    <ContextWindowStack>
      <SummaryTableContextProvider dataset={dataset}>
        <div className='summarytablegenerator'>
          <div className='simpletable-title-holder'>
            <h5 className='simpletable-title'>Summary table for: {dataset.name}</h5>
            <ShowStateButton />
          </div>
          <div
            className='summarytable-main-holder'
            style={{ display: 'flex', flexDirection: 'row', height: 'calc(100% - 46px)' }}
          >
            <div
              className='summarytable-lhs'
              style={{ width: '190px', height: '100%' }}
            >
              <ItemList id={'summarytable-items'} />
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
  );
};
