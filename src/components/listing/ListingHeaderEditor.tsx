import { SimpleTable, iSimpleTableField } from "@asup/simple-table";
import { useCallback, useContext, useMemo } from "react";
import { ListingContext, ListingHeader } from "./ListingContext";
import { ADD_COLUMN, REMOVE_COLUMN } from "./functions/lsReducer";
import { DatasetJsonItemClass } from "../../main";
import { DropEdges } from "../drop-targets/DropEdges";
import { DropTarget } from "../drop-targets/DropTarget";
import { LabelEdit } from "./LabelEdit";
import { MarkDownEdit } from "./MarkdownEdit";

export const ListingHeaderEditor = (): JSX.Element => {
  const { state, dispatch } = useContext(ListingContext);

  const addCol = useCallback(
    (columnPosition: number, item: DatasetJsonItemClass) =>
      dispatch({ operation: ADD_COLUMN, newColumn: item, columnPosition }),
    [dispatch],
  );

  const listingHeaderEditorFields: iSimpleTableField[] = useMemo(
    () => [
      {
        name: "colno",
        label: "Order",
        renderFn: (ret) => {
          return (
            <DropEdges
              id={`${(ret.rowData as ListingHeader).item.OID}-colno`}
              allowableTypes={{ top: ["datasetjsonitem"], bottom: ["datasetjsonitem"] }}
              onDropTop={
                ret.rowNumber === 0
                  ? (dndData) => addCol(ret.rowNumber, dndData.data as DatasetJsonItemClass)
                  : undefined
              }
              onDropBottom={(dndData) =>
                addCol(ret.rowNumber + 1, dndData.data as DatasetJsonItemClass)
              }
            >
              <>
                <span
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() =>
                    dispatch({
                      operation: REMOVE_COLUMN,
                      columnPosition: ret.rowData.colno as number,
                    })
                  }
                >
                  {"\u2296"}
                </span>
                {`${ret.rowData.colno}`}
              </>
            </DropEdges>
          );
        },
      },
      {
        name: "item",
        label: "Variable",
        renderFn: ({ rowData }) => <>{(rowData as ListingHeader).item.name}</>,
      },
      {
        name: "label",
        label: "Label",
        renderFn: (ret) => <LabelEdit rowData={ret.rowData as ListingHeader} />,
      },
      {
        name: "md",
        label: "Markdown",
        renderFn: (ret) => <MarkDownEdit rowData={ret.rowData as ListingHeader} />,
      },
    ],
    [addCol, dispatch],
  );

  return (
    <>
      {state.listingHeaders.length === 0 && (
        <DropTarget
          id="firstId"
          style={{ position: "unset" }}
          allowableTypes={["datasetjsonitem"]}
          dropAction={(ret) => addCol(0, ret.data as DatasetJsonItemClass)}
        >
          Add column
        </DropTarget>
      )}
      <SimpleTable
        id="listing-header-editor-table"
        headerLabel="Listing columns"
        fields={listingHeaderEditorFields}
        keyField={"colno"}
        data={state.listingHeaders}
      />
    </>
  );
};

ListingHeaderEditor.displayName = "ListingHeaderEditor";
