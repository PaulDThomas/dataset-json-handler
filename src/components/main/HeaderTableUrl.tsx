import { useCallback, useContext, useEffect, useState } from "react";
import { DSJContext, DSJContextProps } from "../../context/DSJContextProvider";
import { LOAD_DSJ } from "../../context/dsjReducer";
import { getDataFromUrl } from "../../functions/getDataFromUrl";
import { loadWrapper } from "../../functions/loadWrapper";
import { useDebounce } from "../../hooks/useDebounce";
import { RequestStatus } from "../../interfaces/RequestStatus";

export const HeaderTableUrl = () => {
  const { state, dispatch } = useContext<DSJContextProps>(DSJContext);
  const [rawUrl, setRawUrl] = useState<string>(state.rawUrl);
  const debouncedUrl = useDebounce<string>(rawUrl, 2000);
  const [loadStatus, setLoadStatus] = useState<RequestStatus<string>>({
    requesting: false,
    error: false,
  });

  const getData = useCallback(
    async (urlString: string) => {
      const response = await loadWrapper(
        getDataFromUrl,
        urlString,
        { ...loadStatus, error: false },
        setLoadStatus,
      );
      if (response && response.success && response?.datasetJson) {
        dispatch({ operation: LOAD_DSJ, datasetJson: response.datasetJson });
      }
    },
    [dispatch, loadStatus],
  );

  useEffect(() => {
    if (debouncedUrl !== loadStatus.requestedId && debouncedUrl !== loadStatus.requestingId)
      getData(debouncedUrl);
  }, [debouncedUrl, getData, loadStatus.requestedId, loadStatus.requestingId]);

  return (
    <tr>
      <td>Data url</td>
      <td colSpan={4}>
        <div style={{ position: "relative" }}>
          {loadStatus.requesting && (
            <div
              style={{
                position: "absolute",
                opacity: 0.85,
                zIndex: 1,
                backgroundColor: "orange",
                width: "100%",
                textAlign: "center",
              }}
            >
              Loading
            </div>
          )}
          <input
            type="text"
            style={{
              width: "calc(100% - 0.5rem)",
              border: "1px solid black",
              backgroundColor: loadStatus.error ? "red" : "white",
            }}
            value={rawUrl}
            onChange={(e) => {
              setLoadStatus({ ...loadStatus, error: false });
              setRawUrl(e.currentTarget.value);
            }}
          />
        </div>
      </td>
    </tr>
  );
};

HeaderTableUrl.displayName = "HeaderTableUrl";
