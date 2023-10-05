import { useCallback, useContext, useState } from "react";
import { ListingContext, ListingData } from "../listing/ListingContext";
import { LOAD_LISTING } from "../listing/lsReducer";

export const SaveListingButton = (): JSX.Element => {
  const { state, dispatch } = useContext(ListingContext);

  const DoSave = useCallback(() => {
    const toSave: ListingData = {
      itemList: state.itemList.map((i) => i.data),
      listingHeaders: state.listingHeaders,
    };
    window.localStorage.setItem("listing", JSON.stringify(toSave));
  }, [state]);
  const DoLoad = useCallback(() => {
    const newStatus = JSON.parse(window.localStorage.getItem("listing") ?? "{}");
    dispatch({ operation: LOAD_LISTING, incomingStatus: newStatus });
  }, [dispatch]);
  const [canLoad, setCanLoad] = useState<boolean>(window.localStorage.getItem("listing") === null);

  return (
    <div style={{ display: "inline-block" }}>
      <button
        disabled={canLoad}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          DoLoad();
        }}
      >
        Load
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          DoSave();
          setCanLoad(false);
        }}
      >
        Save
      </button>
    </div>
  );
};

SaveListingButton.displayName = "SaveSummaryTableButton";
