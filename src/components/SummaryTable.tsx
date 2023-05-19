import { DatasetJson } from '../classes/DatasetJsonClass';
import { SummaryTableContextProvider } from '../context/SummaryTableContext';
import { VariableList } from './lhs/VariableList';

interface SummaryTableGeneratorProps {
  dataset: DatasetJson;
}

export const SummaryTableGenerator = ({ dataset }: SummaryTableGeneratorProps): JSX.Element => {
  return (
    <SummaryTableContextProvider dataset={dataset}>
      <div>
        <div className='simpletable-title-holder'>
          <h5 className='simpletable-title'>Summary table for: {dataset.name}</h5>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100% - 26px)' }}>
          <div
            className='summarytable-lhs'
            style={{ width: '200px' }}
          >
            <VariableList id={'summarytable-variables'} />
          </div>
          <div
            className='summarytable-rhs'
            style={{ width: 'calc(100% - 200px)' }}
          >
            <div>RHS</div>
          </div>
        </div>
      </div>
    </SummaryTableContextProvider>
  );
};
