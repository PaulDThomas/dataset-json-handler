import {
  SimpleTable,
  iSimpleTableField,
  iSimpleTableRow,
  iSimpleTableSort,
} from '@asup/simple-table';
import { useCallback, useEffect, useState } from 'react';
import { DatasetJson } from '../../src/classes/DatasetJsonClass';
import { getDataFromUrl } from './functions/getDataFromUrl';

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

  const [showItems, setShowItems] = useState<boolean>(false);

  return (
    <div className='app-holder'>
      <div className='app-border'>
        <div className='app-inner'>
          <div style={{ height: '140px' }}>
            <table
              id='header-table'
              style={{ borderCollapse: 'collapse', border: '1px dotted black' }}
            >
              <tbody>
                <tr>
                  <td>Data url</td>
                  <td colSpan={3}>
                    <input
                      type='text'
                      style={{ width: '800px' }}
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
                    <input
                      type='checkbox'
                      role='checkbox'
                      checked={showItems}
                      onClick={() => setShowItems(!showItems)}
                    />
                    Show items
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {datasetJson && (
            <div
              style={{
                background: 'white',
                height: 'calc(95vh - 140px - 0.5rem - 4px)',
              }}
            >
              {showItems && (
                <SimpleTable
                  id='items-table'
                  fields={fieldsForItems}
                  keyField={'OID'}
                  data={datasetJson ? datasetJson.items : []}
                  headerLabel='Items'
                  showSearch={true}
                  showFilter
                />
              )}
              {!showItems && (
                <SimpleTable
                  id='data-table'
                  fields={datasetJson.items.map(
                    (item) =>
                      ({
                        ...item,
                        sortFn: simpleTableSortFn,
                        searchFn:
                          item.type === 'string'
                            ? (row, text) =>
                                (row[item.name] as string)
                                  .toLocaleLowerCase()
                                  .includes(text.toLocaleLowerCase())
                            : undefined,
                      } as iSimpleTableField),
                  )}
                  keyField={'__rowNumber'}
                  data={datasetJson ? datasetJson.itemData : []}
                  headerLabel='Data'
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default App;
