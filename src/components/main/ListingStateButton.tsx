import { useContext } from "react";
import { ListingContext } from "../../context/ListingContext";
import { JsonWindowButton } from "../utility/JsonWindowButton";
import { SaveListingButton } from "./SaveListingButton";

export const ListingStateButton = () => {
  const { state: lsState } = useContext(ListingContext);
  return (
    <>
      <SaveListingButton />
      <JsonWindowButton
        id="list-state-button"
        title="Listing context state"
        object={lsState}
      />
    </>
  );
};

ListingStateButton.displayName = "ListingStateButton";
