import { SimpleTable } from "@asup/simple-table";
import { useCallback, useContext } from "react";
import { DSJContext } from "../../context/DSJContextProvider";
import { DatasetJsonItemClass } from "../../main";
import { DropTarget } from "../drop-targets/DropTarget";
import { ListingContext } from "./ListingContext";
import { ListingHeaderCell } from "./ListingHeaderCell";
import { RenderMarkDown } from "./RenderMarkDown";
import { ADD_COLUMN } from "./functions/lsReducer";

export const ListingPreview = (): JSX.Element => {
  const { state: dsjState } = useContext(DSJContext);
  const { state: lsState, dispatch } = useContext(ListingContext);

  const addCol = useCallback(
    (columnPosition: number, item: DatasetJsonItemClass) =>
      dispatch({ operation: ADD_COLUMN, newColumn: item, columnPosition }),
    [dispatch],
  );

  return (
    <>
      {lsState.listingHeaders.length === 0 ? (
        <>
          <div>
            <h5 className="simpletable-title">Preview</h5>
            <DropTarget
              id="firstId"
              style={{ position: "unset" }}
              allowableTypes={["datasetjsonitem"]}
              dropAction={(ret) => addCol(0, ret.data as DatasetJsonItemClass)}
            >
              Add first column
            </DropTarget>
          </div>
        </>
      ) : (
        <SimpleTable
          id="listing-preview-table"
          showHeader={false}
          showSearch={false}
          fields={lsState.listingHeaders
            .sort((a, b) => a.colno - b.colno)
            .map((lh) => ({
              name: lh.item.name,
              label: lh.label,
              width: "",
              renderFn: ({ rowData }) => RenderMarkDown(rowData, lh.md),
              headerRenderFn: ListingHeaderCell,
            }))}
          keyField={"ITEMGROUPDATASEQ"}
          data={dsjState.datasetJson?.dataRows ?? []}
        />
      )}
    </>
  );
};

ListingPreview.displayName = "ListingPreview";
