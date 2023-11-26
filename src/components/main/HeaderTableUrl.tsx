import { useCallback, useContext, useEffect, useState } from "react";
import { DSJContext, DSJContextProps } from "../../context/DSJContextProvider";
import { LOAD_DSJ, SET_PANE } from "../../context/dsjReducer";
import { getDataFromUrl } from "../../functions/getDataFromUrl";
import { loadWrapper } from "../../functions/loadWrapper";
import { useDebounce } from "../../hooks/useDebounce";
import { RequestStatus } from "../../interfaces/RequestStatus";

export const HeaderTableUrl = () => {
  const { state, dispatch } = useContext<DSJContextProps>(DSJContext);
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
        dispatch({ operation: SET_PANE, pane: "items" });
        dispatch({ operation: LOAD_DSJ, datasetJson: response.datasetJson });
      }
    },
    [dispatch, loadStatus],
  );

  const [loadedUrl, setLoadedUrl] = useState<string>(state.rawUrl);
  const { currentValue, setCurrentValue } = useDebounce(
    loadedUrl,
    (value) => {
      setLoadedUrl(value);
    },
    2000,
  );
  useEffect(() => {
    getData(loadedUrl);
  }, [getData, loadedUrl]);

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
            value={currentValue}
            onChange={(e) => {
              e.preventDefault();
              setLoadStatus({ ...loadStatus, error: false });
              setCurrentValue(e.currentTarget.value);
            }}
            onBlur={(e) => {
              e.preventDefault();
              setLoadStatus({ ...loadStatus, error: false });
            }}
          />
        </div>
      </td>
    </tr>
  );
};

HeaderTableUrl.displayName = "HeaderTableUrl";
