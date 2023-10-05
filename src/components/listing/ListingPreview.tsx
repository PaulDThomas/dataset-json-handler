import { SimpleTable } from "@asup/simple-table";
import { useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";
import { ListingContext } from "./ListingContext";
import { RenderMarkDown } from "./RenderMarkDown";

export const ListingPreview = (): JSX.Element => {
  const { state: dsjState } = useContext(DSJContext);
  const { state: lsState } = useContext(ListingContext);

  return (
    <SimpleTable
      id="listing-preview-table"
      headerLabel="Preview"
      fields={lsState.listingHeaders
        .sort((a, b) => a.colno - b.colno)
        .map((lh) => ({
          name: lh.item.name,
          label: lh.label,
          width: "",
          renderFn: ({ rowData }) => RenderMarkDown(rowData, lh.md),
        }))}
      keyField={"ITEMGROUPDATASEQ"}
      data={dsjState.datasetJson?.dataRows ?? []}
    />
  );
};

ListingPreview.displayName = "ListingPreview";
