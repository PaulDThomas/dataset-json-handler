import { useCallback, useContext, useEffect, useState } from 'react';
import { DSJContext, DSJContextProps } from '../../context/DSJContextProvider';
import { LOAD_DSJ } from '../../context/dsjReducer';
import { getDataFromUrl } from '../../functions/getDataFromUrl';
import { loadWrapper } from '../../functions/loadWrapper';
import { useDebounce } from '../../hooks/useDebounce';
import { RequestStatus } from '../../interfaces/RequestStatus';

export const HeaderTableUrl = () => {
  const { state, dispatch } = useContext<DSJContextProps>(DSJContext);
  const [rawUrl, setRawUrl] = useState<string>(state.rawUrl);
  const debouncedUrl = useDebounce<string>(rawUrl);
  const [loadStatus, setLoadStatus] = useState<RequestStatus<string>>({
    requesting: false,
    error: false,
  });

  const getData = useCallback(
    async (urlString: string) => {
      const response = await loadWrapper(getDataFromUrl, urlString, loadStatus, setLoadStatus);
      if (response && response.success && response?.datasetJson) {
        dispatch({ operation: LOAD_DSJ, datasetJson: response.datasetJson });
      }
    },
    [dispatch, loadStatus],
  );

  useEffect(() => {
    getData(debouncedUrl);
  }, [debouncedUrl, getData]);

  return (
    <tr>
      <td>Data url</td>
      <td colSpan={4}>
        <input
          type='text'
          style={{ width: 'calc(100% - 0.5rem)', border: '1px solid black' }}
          value={rawUrl}
          onChange={(e) => setRawUrl(e.currentTarget.value)}
        />
      </td>
    </tr>
  );
};
