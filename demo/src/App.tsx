import {
  SimpleTable,
  iSimpleTableField,
  iSimpleTableRow,
  iSimpleTableSort,
} from '@asup/simple-table';
import { useCallback, useEffect, useState } from 'react';
import { DatasetJson } from '../../src/classes/DatasetJsonClass';
import { getDataFromUrl } from './functions/getDataFromUrl';
import { SummaryTableGenerator } from '../../src/components/SummaryTable';

export const simpleTableSortFn = (
  a: iSimpleTableRow,
  b: iSimpleTableRow,
  sortBy: iSimpleTableSort,
) => {
  return typeof a[sortBy.name] === 'number' || typeof b[sortBy.name] === 'number'
    ? ((typeof a[sortBy.name] === 'number' ? a[sortBy.name] : -Infinity) as number) -
        ((typeof b[sortBy.name] === 'number' ? b[sortBy.name] : -Infinity) as number)
    : a[sortBy.name] instanceof Date || b[sortBy.name] instanceof Date
    ? ((a[sortBy.name] ?? new Date('0001-01-01')) as Date).getTime() -
      ((b[sortBy.name] ?? new Date('0001-01-01')) as Date).getTime()
    : ((a[sortBy.name] ?? '') as string).localeCompare((b[sortBy.name] ?? '') as string);
};

const fieldsForItems: iSimpleTableField[] = [
  {
    name: 'OID',
    label: 'OID',
    sortFn: simpleTableSortFn,
    searchFn: (row, text) =>
      (row.name as string).toLocaleLowerCase().includes(text.toLocaleLowerCase()),
  },
  { name: 'name', label: 'Name', sortFn: simpleTableSortFn },
  { name: 'label', label: 'Label', sortFn: simpleTableSortFn },
  { name: 'type', label: 'Type', sortFn: simpleTableSortFn, canColumnFilter: true },
  { name: 'length', label: 'Length', sortFn: simpleTableSortFn },
];

// Main application
const App = (): JSX.Element => {
  const [datasetJson, setDatasetJson] = useState<DatasetJson | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [rawUrl, setRawUrl] = useState<string>(
    'https://raw.githubusercontent.com/cdisc-org/DataExchange-DatasetJson/master/examples/adam/adae.json',
  );
  const getData = useCallback(async () => {
    try {
      setLoaded(false);
      setLoading(true);
      const response = await getDataFromUrl(rawUrl);
      setLoading(false);
      setDatasetJson(new DatasetJson(response));
      setLoaded(true);
    } catch {
      setError(true);
    }
  }, [rawUrl]);

  useEffect(() => {
    !loaded && !loading && !error && getData();
  }, [error, getData, loaded, loading]);

  const [showThing, setShowThing] = useState<'items' | 'data' | 'summary'>('summary');

  return (
    <div className='app-holder'>
      <div className='app-border'>
        <div className='app-inner'>
          <div style={{ height: '140px' }}>
            <table
              id='header-table'
              style={{ borderCollapse: 'collapse', border: '1px dotted black', width: '100%' }}
            >
              <tbody>
                <tr>
                  <td>Data url</td>
                  <td colSpan={3}>
                    <input
                      type='text'
                      style={{ width: 'calc(100% - 0.5rem)' }}
                      value={rawUrl}
                      onChange={(e) => setRawUrl(e.currentTarget.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td width={'200px'}>studyOID</td>
                  <td width={'250px'}>{datasetJson?.studyOID}</td>
                </tr>
                <tr>
                  <td>metaDataVersionOID</td>
                  <td>{datasetJson?.metaDataVersionOID}</td>
                </tr>
                <tr>
                  <td>name</td>
                  <td>{datasetJson?.name}</td>
                </tr>
                <tr>
                  <td>label</td>
                  <td>{datasetJson?.label}</td>
                  <td>
                    Show
                    <input
                      type='radio'
                      role='radio'
                      checked={showThing === 'items'}
                      onClick={() => setShowThing('items')}
                      id='show-items-radio'
                    />
                    <label htmlFor='show-items-radio'>Items</label>
                    <input
                      type='radio'
                      role='radio'
                      checked={showThing === 'data'}
                      onClick={() => setShowThing('data')}
                    />
                    <label htmlFor='show-data-radio'>Data</label>
                    <input
                      type='radio'
                      role='radio'
                      checked={showThing === 'summary'}
                      onClick={() => setShowThing('summary')}
                    />
                    <label htmlFor='show-summary-radio'>Table</label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {datasetJson && (
            <div
              className='tab-holder'
              style={{
                background: 'white',
                height: 'calc(95vh - 140px - 1rem)',
              }}
            >
              <div
                className='tab fader'
                style={{
                  opacity: showThing === 'items' ? 1 : 0,
                  zIndex: showThing === 'items' ? 1 : 0,
                }}
              >
                <div>
                  <SimpleTable
                    id='items-table'
                    fields={fieldsForItems}
                    keyField={'OID'}
                    data={datasetJson ? datasetJson.items : []}
                    headerLabel='Items'
                    showSearch={true}
                    showFilter
                  />
                </div>
              </div>
              <div
                className='tab fader'
                style={{
                  opacity: showThing === 'data' ? 1 : 0,
                  zIndex: showThing === 'data' ? 1 : 0,
                }}
              >
                <div>
                  <SimpleTable
                    id='data-table'
                    fields={datasetJson.simpleTableFields}
                    keyField={'__rowNumber'}
                    data={datasetJson ? datasetJson.itemData : []}
                    headerLabel='Data'
                  />
                </div>
              </div>
              <div
                className='tab fader'
                style={{
                  opacity: showThing === 'summary' ? 1 : 0,
                  zIndex: showThing === 'summary' ? 1 : 0,
                }}
              >
                <SummaryTableGenerator dataset={datasetJson} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
